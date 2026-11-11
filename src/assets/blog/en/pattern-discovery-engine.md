# From Machine Learning Experiments to a Python Pattern Discovery Library

This article chronicles a personal Python laboratory I built to learn the foundations of **classical Machine Learning** without relying on LLMs or treating algorithms as black boxes.

The goal wasn't to train a quick model to chase a pretty accuracy score, but to progress through small versions while asking uncomfortable questions: *why does a clustering algorithm fail when detecting noise? Why do two detectors produce scores that can't simply be averaged? How does a model know when it lacks enough evidence and should abstain?*

It all started as a standalone clustering script and ended up packaged into a [`pip`](https://pypi.org/project/cp-pde/) package. These are the notes of what I tested, what broke, and what I had to fix along the way.

---

## The laboratory rules

Before writing the first line of code, I set three methodological constraints so I wouldn't fool myself with the results:

1. **Controlled seeds:** every experiment is repeated across multiple seeds (first 3, then 5: `42, 7, 123, 2026, 99`) to measure variance, not just the best case.
2. **Strict partition separation:** normal data is split into `train`, `calibration`, `validation`, and `test`. Both the scaler and the models only ever see `train`.
3. **No tuning parameters against `test`:** if an adjustment improves `test` performance but cannot be decided without real labels, it is documented as a diagnostic finding, never as an operational rule.

---

## 1. First test: Clustering is not anomaly detection

**What I tested:** I started with the most intuitive approach for discovering structure without labels: generating a synthetic dataset with 3 normal groups (300 records across three activity features: `sessions`, `duration`, `actions`) and injecting 30 random points as noise. Then I applied `StandardScaler`, `HDBSCAN`, and a 2D `PCA` projection to see what it found.

**What happened:** On the structure side, the result was clean: `HDBSCAN` recovered the exact 3 original clusters (`ARI = 1.00`, `Silhouette = 0.8428`, and `97.85%` variance explained in PCA).

However, when inspecting the injected noise, the first surprise hit: **it only labeled 14 out of the 30 anomalous points as noise** (`Precision = 1.00`, but `Recall = 46.7%`). The other 16 were absorbed into neighboring clusters.

![PCA projection comparing ground-truth structure against HDBSCAN output](/images/blog/pattern-discovery-engine/01-clustering-pca-hdbscan-en.png)

**What I learned:** Grouping similar data and detecting atypical behavior are related, yet **they are not the same problem**. A point can lie close enough to a cluster to be absorbed by density and still be anomalous. Dedicated detectors were needed.

---

## 2. Geometry rules: four detectors against five scenarios

**What I tested:** Instead of sticking to a single algorithm, I pitted four classic anomaly detection families against each other:

- **HDBSCAN** (based on density and cluster membership).
- **Isolation Forest** (based on how many random splits are needed to isolate a point).
- **LOF — Local Outlier Factor** (compares a point's local density against that of its neighbors).
- **One-Class SVM (OCSVM)** (learns a support boundary around the normal region).

In an initial simple baseline, LOF won with `F1 = 0.9667`, followed by Isolation Forest (`0.9333`). To avoid jumping to conclusions, I built synthetic scenarios with distinct geometries: **global** anomalies (extreme values), **local** anomalies (clinging to a cluster's edge), **contextual** anomalies (incoherent combinations across features), **grouped** anomalies (a small cluster in a low-density region), and **overlapping** anomalies (mixed with normal data). Later, I also added **collective** anomalies (batches).

![Comparison of mean ROC-AUC across the four detectors in all six scenarios](/images/blog/pattern-discovery-engine/02-detectors-by-scenario-en.png)

**What happened:**
- **There is no universal detector:** each geometry favors a different approach. In `local`, LOF (`0.954`) and HDBSCAN (`0.947`) clearly outperformed OCSVM (`0.819`).
- **OCSVM's failure in `grouped`:** with its default configuration (`RBF`, `nu=0.05`, `gamma=scale`), OCSVM didn't just perform poorly on a compact anomalous cluster—**it inverted the ranking**, dropping to `ROC-AUC = 0.03`. A sensitivity grid (`300` configurations) revealed settings capable of reaching `1.0`, but depending so heavily on `gamma` without validation labels in production makes it far too brittle.
- **The overlapping wall:** when anomalies blend into the normal cloud (`overlapping`), all four detectors drop below `0.50` (worse than flipping a coin).
- **A naive ensemble can make things worse:** when combining detectors and assigning weights via bootstrap "threshold stability" (`V0.2.4`), all weights came out nearly uniform (~22%–28%). Just because a threshold varies little doesn't mean a detector is more accurate; in `grouped`, the ensemble collapsed because of the worst detector.

---

## 3. Moving from arbitrary scores to statistical evidence

This was the longest and most transformative part of the lab. While trying to combine detectors, I uncovered a serious methodological flaw in version `0.2.7`: **you cannot directly mix raw scores from different algorithms**. LOF's distance ratio has nothing to do with Isolation Forest's tree depth or an SVM's `decision_function`.

### Conformal prediction and three-state decisions

The solution was to translate each detector's raw score `s(x)` into an **empirical conformal p-value** by comparing it against an independent partition of normal data (`calibration`):

```text
p(x) = (1 + #{ s_cal >= s(x) }) / (n_cal + 1)
```

A low p-value indicates how many normal reference records were at least as unusual as `x`. Once every detector is on the same `(0, 1]` statistical scale, they can be combined conservatively using the **Bonferroni correction**:

```text
p_ensemble = min(1, k * min(p_1, p_2, ..., p_k))
```

And instead of forcing the model to always answer `normal` or `anomaly`, I introduced a **three-state selective decision framework**:
- **`anomaly` (`p <= 0.05`):** strong statistical evidence to raise an alert.
- **`review` (`0.05 < p < 0.20`):** intermediate zone; the model abstains and requests human review.
- **`no_alert` (`p >= 0.20`):** consistent with normal behavior.

### The hidden resolution limit

When testing with `n_cal = 120` calibration records, I noticed the Bonferroni ensemble almost never triggered automatic alerts even for clear anomalies. The reason was pure arithmetic: with 120 samples, the smallest possible individual p-value is `1/121 = 0.0083`, which multiplied by 4 detectors jumps to `0.0331`. The very next step is `0.0661`, already above the `0.05` threshold.

Testing increasing sample sizes (`120, 300, 600, 1000`) confirmed that expanding calibration to **1000 samples** sharpens the ensemble resolution to `0.0040`, while keeping the mean validation false-positive rate controlled (`2.73%` for Bonferroni versus the `5%` nominal limit).

![Minimum conformal p-value resolution and three-state selective decision diagram](/images/blog/pattern-discovery-engine/03-conformal-resolution-decision-en.png)

### Collective anomalies and an independence bug

One glaring blind spot remained in the earlier chart: the `collective` scenario. Here, every individual observation belongs to a valid normal group, yet **the entire batch of 45 records concentrates into a single profile** instead of spreading across all three. Because each point on its own looks normal, all pointwise detectors scored `ROC-AUC ≈ 0.50` (pure chance).

To solve this, I added a group composition detector in versions `V0.2.11–V0.2.12`: fit a 3-cluster `KMeans` strictly on `train`, measure each batch's proportions, and compare them against calibrated normal batches using **Chi-squared**, **Jensen-Shannon divergence**, and **Total Variation (TV) distance**.

To verify I wasn't measuring "disguised individual rarity," I set up three controls:
1. **Negative control (`normal_validation`):** independent normal batches.
2. **Positive control (`collective_only`):** normal individuals concentrated in a single component.
3. **Discriminant control (`pointwise_only_composition_matched`):** points shifted `2.5` standard units away from their normal center, while strictly matching normal cluster proportions.

![Validation controls for collective anomalies versus individual rarity](/images/blog/pattern-discovery-engine/04-collective-anomaly-controls-en.png)

The results cleanly separated both phenomena: `100%` detection on `collective_only` (with a normal nearest-neighbor distance of `0.069`), `~4%` alerts on normal batches, and **`0%` false group alerts** on the `pointwise_only` control despite heavily shifted points (`2.216` distance).

**The audit lesson (`V0.2.12.1`):** right before closing that phase, I spotted that the first version of this module generated all normal batches by calling `make_blobs` once and slicing the resulting array. That violated strict independence between calibration and validation batches (they shared finite-population global quotas). I had to rewrite the generator (`V0.2.12.1`) with independent multinomial sampling per batch and separate random streams via `SeedSequence` so the results would be methodologically sound.

---

## 4. When features interact: rules, graphs, and hybrids

**What I tested:** The earlier detectors inspect distances or densities in numeric space, yet when a **contextual** anomaly appears (for instance, very few sessions paired with huge duration and action counts), you often want to know not just *that* it is unusual, but *which rule it broke*.

In `V0.3`, I discretized each feature into bands (`Low`, `Medium`, `High`) using strictly `train` quantiles, mined frequent rules with **Apriori** (filtering by support, confidence, and *lift*), and built:
1. A **symbolic detector** that scores how many high-confidence rules each record violates.
2. A **symbolic-numeric hybrid detector**, combining the conformal p-values of `LOF` and rule violations via Bonferroni.
3. A **directed co-occurrence graph** in `NetworkX` using *lift* as edge weights.

![Performance of the symbolic-numeric hybrid detector and dependency graph](/images/blog/pattern-discovery-engine/05-rules-and-hybrid-en.png)

**What happened:**
- The **rules-only** detector reached `ROC-AUC = 0.967` on contextual anomalies (and pinpoints the exact logical implication violated), but failed on global anomalies (`0.437`), because an extreme value still lands in the `High` bin without breaking coherence rules among high bands.
- Combining them into the **symbolic-numeric hybrid** covered both geometric anomalies (`global = 1.00`, `grouped = 1.00`, `local = 0.933`) and relational ones (`contextual = 1.00`).
- The graph confirmed the normal system's structure at a glance: three completely disconnected cliques (`Low`, `Medium`, and `High`), with no cross-level transitions.

---

## 5. The rest of the road and the leap to `pip`

Once geometry, conformal calibration, and rules were solid, the lab expanded along three fronts to move beyond purely numeric tables:

- **Heterogeneous data:** when mixing continuous variables, counts, and nominal categories, Euclidean distance stops making sense. I implemented leakage-free **Gower distance** and multi-start **`k-Medoids++`** clustering, resolving a real local-optima failure that appeared on seed `99` and adding automatic `k` selection via elbow detection (`k = 3` recovered across all 5 seeds with `ARI` between `0.869` and `0.936`).
- **Temporal sequences:** I upgraded from simple Markov chains (`AUC = 0.563`) to a **Semi-Markov** model (`AUC = 0.999`, `F1 = 0.974`) that jointly evaluates state transition probabilities (with Laplace smoothing) and log-normal inter-event timing distributions, catching both illegal jumps and ultra-fast bots.
- **Autonomy and *Distribution Drift*:** I added an automatic dataset profiler and a continuous monitor for distribution shifts.

### The trick to watching drift without labels

A remarkably useful mathematical property of conformal p-values is that, as long as incoming data continues to come from the same distribution as calibration, **the p-values are uniformly distributed on `[0, 1]`**.

I leveraged that property to run a **Kolmogorov-Smirnov (KS) test** on incoming windows without needing a single label. As soon as the distribution shifts and p-values stop being uniform (`p_KS < 0.01`), the engine triggers automatic recalibration.

![Impact of drift on false alarm rate and recovery after KS recalibration](/images/blog/pattern-discovery-engine/06-drift-and-recalibration-en.png)

Without adaptation, distribution shift spiked false alarms from **`3.4%`** to **`33.0%`**. After detecting drift (across 100% of seeds) and recalibrating the reference set, the rate dropped back to **`6.0%`** while maintaining `AUC = 1.00` on anomalies from the new regime.

### From scattered scripts to `pip install cp-pde` (`V0.7` → `1.0.0`)

In `V0.7`, I consolidated every battle-tested experiment into a single class (`PatternDiscoveryEngine`) with a unified interface (`.fit()`, `.predict()`, `.monitor_drift()`, `.save()`, `.load()`) and verified JSON serialization to guarantee identical inference after reloading from disk. That clean, modular codebase was published as the [`cp-pde`](https://pypi.org/project/cp-pde/) library:

```python
from pde import PatternDiscoveryEngine

engine = PatternDiscoveryEngine(alpha=0.05, review_boundary=0.20)
engine.fit(train_data, cal_data)
result = engine.predict(new_data)
```

Every package in `cp-pde` maps directly to a stage of the lab: `pde.geometry` (`V0.2`), `pde.association` (`V0.3`), `pde.clustering` (`V0.4`), `pde.sequential` (`V0.5`), `pde.calibration` (`V0.2.6–V0.2.8`), `pde.drift` (`V0.6`), and `pde.persistence` (`V0.7`).

---

## Takeaways from this lab

- **Geometry picks the algorithm:** benchmarking detectors before choosing is mandatory; no single method dominates every scenario.
- **An uncalibrated score is hard to operate:** turning incompatible scores into conformal p-values controls false alarms, enables scale-free ensembles, and detects drift without labels.
- **Knowing when to say "review" beats forcing a binary call:** reserving an intermediate band (`review`) reduces the risk of automating ambiguous decisions.
- **Negative controls save you from self-deception:** both the unstable ensemble and the `make_blobs` independence bug in `V0.2.12` only surfaced by auditing assumptions that seemed obvious.
- **The lab's boundary:** all these metrics come from controlled synthetic generators; they validate statistical properties and catch design flaws, not as an automatic guarantee on real production data.
