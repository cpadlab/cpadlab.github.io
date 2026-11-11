# De experimentos de Machine Learning a una biblioteca de detección de patrones en Python

Este artículo recoge el recorrido de un laboratorio personal que monté en Python para aprender las bases del **Machine Learning clásico** sin depender de LLMs ni tratar los algoritmos como cajas negras.

La idea no era entrenar un modelo rápido para sacar un porcentaje bonito, sino avanzar por versiones pequeñas haciéndome preguntas incómodas: *¿por qué un algoritmo de clustering falla al detectar ruido? ¿Por qué dos detectores dan puntuaciones que no se pueden promediar? ¿Cómo sabe un modelo cuándo no tiene evidencia suficiente y debería abstenerse?*

Todo empezó con un script suelto de clustering y terminó empaquetado en un paquete [`pip`](https://pypi.org/project/cp-pde/). Estas son las notas de lo que probé, lo que falló y lo que tuve que corregir por el camino.

---

## Las reglas del laboratorio

Antes de escribir la primera línea de código fijé tres restricciones metodológicas para no engañarme con los resultados:

1. **Semillas controladas:** todo experimento se repite en varias semillas (primero 3, luego 5: `42, 7, 123, 2026, 99`) para medir dispersión, no solo el mejor caso.
2. **Separación estricta de particiones:** los datos normales se dividen en `train`, `calibration`, `validation` y `test`. El escalador y los modelos solo ven `train`.
3. **Prohibido ajustar parámetros mirando el `test`:** si un ajuste mejora el `test` pero no se puede decidir sin etiquetas reales, se documenta como diagnóstico, nunca como regla operativa.

---

## 1. Primera prueba: Clustering no es detección de anomalías

**Qué probé:** Empecé por lo más intuitivo para descubrir estructura sin etiquetas: generar un dataset sintético con 3 grupos normales (300 registros con tres variables de actividad: `sessions`, `duration`, `actions`) e inyectar 30 puntos aleatorios como ruido. Después apliqué `StandardScaler`, `HDBSCAN` y una proyección `PCA` a 2 dimensiones para ver qué encontraba.

**Qué ocurrió:** En la parte de estructura, el resultado fue limpio: `HDBSCAN` recuperó exactamente los 3 grupos originales (`ARI = 1.00`, `Silhouette = 0.8428` y un `97.85%` de varianza explicada en PCA).

Pero al mirar el ruido inyectado, saltó la primera sorpresa: **solo etiquetó como ruido 14 de los 30 puntos anómalos** (`Precision = 1.00`, pero `Recall = 46.7%`). Los otros 16 quedaron absorbidos dentro de los clusters vecinos.

![Proyección PCA comparando la estructura real frente al resultado de HDBSCAN](/images/blog/pattern-discovery-engine/01-clustering-pca-hdbscan-es.png)

**Qué aprendí:** Agrupar datos similares y detectar comportamientos atípicos están relacionados, pero **no son el mismo problema**. Un punto puede estar lo bastante cerca de un cluster como para ser absorbido por densidad, y aun así ser anómalo. Hacían falta detectores específicos.

---

## 2. La geometría manda: cuatro detectores frente a cinco escenarios

**Qué probé:** En lugar de quedarme con un único algoritmo, enfrenté cuatro familias clásicas de detección de anomalías:

- **HDBSCAN** (basado en densidad y pertenencia a clusters).
- **Isolation Forest** (basado en cuántas particiones aleatorias hacen falta para aislar un punto).
- **LOF — Local Outlier Factor** (compara la densidad local de un punto con la de sus vecinos).
- **One-Class SVM (OCSVM)** (aprende una frontera de soporte alrededor de la región normal).

En un primer baseline sencillo, LOF ganó con `F1 = 0.9667` seguido de Isolation Forest (`0.9333`). Para no sacar conclusiones precipitadas, monté escenarios sintéticos con geometrías distintas: anomalías **globales** (valores extremos), **locales** (pegadas al borde de un cluster), **contextuales** (combinaciones incoherentes entre atributos), **agrupadas** (un pequeño cluster en zona de baja densidad) y **solapadas** (*overlapping*, mezcladas con datos normales). Más adelante añadí también anomalías **colectivas** (lotes).

![Comparativa de ROC-AUC medio de los cuatro detectores en los seis escenarios](/images/blog/pattern-discovery-engine/02-detectors-by-scenario-es.png)

**Qué ocurrió:**
- **No existe un detector universal:** cada geometría favorece a un enfoque distinto. En `local`, LOF (`0.954`) y HDBSCAN (`0.947`) superaron claramente a OCSVM (`0.819`).
- **El fallo de OCSVM en `grouped`:** con su configuración estándar (`RBF`, `nu=0.05`, `gamma=scale`), OCSVM no solo rindió mal ante un cluster anómalo compacto: **invirtió el ranking** hasta caer a un `ROC-AUC = 0.03`. Una cuadrícula de sensibilidad (`300` ajustes) mostró configuraciones capaces de llegar a `1.0`, pero depender tanto de `gamma` sin etiquetas de validación en producción lo vuelve muy frágil.
- **El muro del solapamiento:** cuando las anomalías se mezclan con la nube normal (`overlapping`), los cuatro detectores caen por debajo de `0.50` (peor que lanzar una moneda).
- **Un *ensemble* ingenuo puede empeorar:** al combinar detectores y asignar pesos por "estabilidad de umbral" con *bootstrap* (`V0.2.4`), todos salieron casi uniformes (~22%–28%). Que un umbral varíe poco no significa que el detector acierte más; en `grouped`, el conjunto llegó a colapsar por culpa del peor detector.

---

## 3. Pasar de scores arbitrarios a evidencia estadística

Esta fue la parte más larga y transformadora del laboratorio. Al intentar combinar los detectores descubrí un error metodológico grave en la versión `0.2.7`: **no se pueden mezclar directamente los scores brutos de algoritmos distintos**. La escala de la distancia en LOF no tiene nada que ver con la profundidad de árbol de Isolation Forest ni con `decision_function` de un SVM.

### Predicción conformal y decisión en tres estados

La solución fue traducir el score bruto `s(x)` de cada detector a un **p-valor conformal empírico** comparándolo contra una partición independiente de datos normales (`calibration`):

```text
p(x) = (1 + #{ s_cal >= s(x) }) / (n_cal + 1)
```

Un p-valor bajo indica cuántos registros normales de referencia fueron al menos igual de raros que `x`. Al estar todos los detectores en la misma escala estadística `(0, 1]`, ya se pueden combinar de forma conservadora mediante la **corrección de Bonferroni**:

```text
p_ensemble = min(1, k * min(p_1, p_2, ..., p_k))
```

Y en lugar de obligar al modelo a contestar siempre `normal` o `anomalía`, introduje un **marco de decisión selectiva tripartito**:
- **`anomaly` (`p <= 0.05`):** evidencia estadística fuerte para alertar.
- **`review` (`0.05 < p < 0.20`):** zona intermedia; el modelo se abstiene y pide revisión.
- **`no_alert` (`p >= 0.20`):** compatible con el comportamiento normal.

### El límite oculto de la resolución

Al probar con `n_cal = 120` registros de calibración, noté que el *ensemble* Bonferroni casi no disparaba alertas automáticas aunque las anomalías fueran claras. La razón era puramente aritmética: con 120 muestras, el p-valor individual más pequeño posible es `1/121 = 0.0083`, que al multiplicarse por 4 detectores sube a `0.0331`. El siguiente escalón ya es `0.0661`, por encima del umbral `0.05`.

Probando tamaños crecientes (`120, 300, 600, 1000`) confirmé que ampliar la calibración a **1000 muestras** lleva la resolución del *ensemble* a `0.0040`, manteniendo además la tasa media de falsos positivos en validación controlada (`2.73%` para Bonferroni frente al límite nominal del `5%`).

![Resolución mínima del p-valor conformal y diagrama de decisión selectiva en tres estados](/images/blog/pattern-discovery-engine/03-conformal-resolution-decision-es.png)

### Anomalías colectivas y un fallo de independencia

Quedaba un punto ciego evidente en el gráfico anterior: el escenario `collective`. En él, cada observación individual pertenece a un grupo normal válido, pero **todo el lote de 45 registros se concentra en un único perfil** en lugar de repartirse entre los tres. Como cada punto por separado es normal, todos los detectores punto a punto dieron `ROC-AUC ≈ 0.50` (puro azar).

Para resolverlo añadí un detector de composición grupal en las versiones `V0.2.11–V0.2.12`: ajustar un `KMeans` de 3 clusters solo sobre `train`, medir las proporciones de cada lote y compararlas contra grupos normales calibrados usando **Chi-cuadrado**, **divergencia Jensen-Shannon** y **Distancia de Variación Total (TV)**.

Para comprobar que no estaba midiendo "rareza disfrazada", monté tres controles:
1. **Control negativo (`normal_validation`):** grupos normales independientes.
2. **Control positivo (`collective_only`):** individuos normales concentrados en un solo componente.
3. **Control discriminante (`pointwise_only_composition_matched`):** puntos desplazados `2.5` unidades estándar fuera de su centro normal, pero respetando exactamente las cuotas de clusters normales.

![Controles de validación para anomalías colectivas frente a rareza individual](/images/blog/pattern-discovery-engine/04-collective-anomaly-controls-es.png)

Los resultados separaron ambos fenómenos sin ambigüedad: `100%` de detección en `collective_only` (con distancia normal al vecino más cercano de `0.069`), `~4%` de alertas en grupos normales y **`0%` de falsas alertas grupales** en el control `pointwise_only` a pesar de tener puntos muy desplazados (distancia `2.216`).

**La lección de auditoría (`V0.2.12.1`):** justo antes de dar la fase por cerrada, detecté que la primera versión de este módulo generaba todos los grupos normales llamando una sola vez a `make_blobs` y partiendo el bloque resultante. Eso violaba la independencia estricta entre grupos de calibración y validación (compartían cuotas globales de la población finita). Tuve que reescribir el generador (`V0.2.12.1`) con muestreo multinomial independiente por grupo y flujos aleatorios separados con `SeedSequence` para que los resultados fueran metodológicamente válidos.

---

## 4. Cuando las variables se relacionan: reglas, grafos e híbrido

**Qué probé:** Los detectores anteriores miran distancias o densidades en el espacio numérico, pero cuando aparece una anomalía **contextual** (por ejemplo, pocas sesiones combinadas con muchísima duración y acciones) a veces interesa saber no solo *que* es rara, sino *qué regla rompió*.

En `V0.3` discreticé cada variable en rangos (`Low`, `Medium`, `High`) usando exclusivamente cuantiles de `train`, extraje reglas frecuentes con **Apriori** (filtrando por soporte, confianza y *lift*) y construí:
1. Un **detector simbólico** que puntúa cuántas reglas de alta confianza infringe cada registro.
2. Un **detector híbrido simbólico-numérico**, combinando los p-valores conformales de `LOF` y de la violación de reglas mediante Bonferroni.
3. Un **grafo dirigido de coocurrencia** en `NetworkX` usando el *lift* como peso de las aristas.

![Rendimiento del detector híbrido simbólico-numérico y grafo de dependencias](/images/blog/pattern-discovery-engine/05-rules-and-hybrid-es.png)

**Qué ocurrió:**
- El detector basado **solo en reglas** alcanzó `ROC-AUC = 0.967` en anomalías contextuales (y permite señalar exactamente qué implicación lógica se incumplió), pero fracasó en anomalías globales (`0.437`), porque un valor extremo sigue cayendo en el bin `High` sin romper reglas de coherencia entre rangos altos.
- Al unirlo en el **híbrido simbólico-numérico**, el modelo cubrió a la vez anomalías geométricas (`global = 1.00`, `grouped = 1.00`, `local = 0.933`) y relacionales (`contextual = 1.00`).
- El grafo confirmó de un vistazo la estructura del sistema normal: tres cliques completamente desconectados (`Bajo`, `Medio` y `Alto`), sin transiciones cruzadas entre niveles.

---

## 5. El resto del camino y el paso a `pip`

Una vez asentadas la geometría, la calibración conformal y las reglas, el laboratorio continuó en tres frentes para salir de las tablas puramente numéricas:

- **Datos heterogéneos:** cuando se mezclan variables continuas, conteos y categorías nominales, la distancia euclídea deja de tener sentido. Implementé la **distancia de Gower** sin fuga de datos y clustering con **`k-Medoids++` multi-inicio**, resolviendo un problema real de óptimos locales que aparecía en la semilla `99` y añadiendo detección automática del número de grupos `k` por punto de codo (`k = 3` recuperado en las 5 semillas con `ARI` entre `0.869` y `0.936`).
- **Secuencias temporales:** pasé de cadenas de Markov simples (`AUC = 0.563`) a un modelo **Semi-Markoviano** (`AUC = 0.999`, `F1 = 0.974`) que evalúa conjuntamente la probabilidad de transición entre estados (con suavizado de Laplace) y la distribución log-normal de los tiempos entre eventos, cazando tanto saltos ilegales como bots ultrarrápidos.
- **Autonomía y *Distribution Drift*:** añadí un perfilador automático del tipo de dataset y un vigilante continuo de cambios de distribución.

### El truco de vigilar el *drift* sin etiquetas

Una propiedad matemática muy útil de los p-valores conformales es que, si los datos nuevos siguen saliendo de la misma distribución que la calibración, **los p-valores se distribuyen de forma uniforme en `[0, 1]`**.

Aproveché esa propiedad para aplicar un **test de Kolmogorov-Smirnov (KS)** sobre ventanas entrantes sin necesitar ni una sola etiqueta. En cuanto la distribución cambia y los p-valores dejan de ser uniformes (`p_KS < 0.01`), el motor dispara una recalibración automática.

![Impacto del drift en la tasa de falsas alarmas y recuperación tras la recalibración KS](/images/blog/pattern-discovery-engine/06-drift-and-recalibration-es.png)

Sin adaptación, el desplazamiento de distribución disparó las falsas alarmas del **`3.4%`** al **`33.0%`**. Tras detectar el *drift* (en el 100% de las semillas) y recalibrar el conjunto de referencia, la tasa volvió al **`6.0%`** manteniendo `AUC = 1.00` sobre las anomalías del nuevo régimen.

### De scripts dispersos a `pip install cp-pde` (`V0.7` → `1.0.0`)

En `V0.7` consolidé todos los experimentos que habían demostrado solidez en una única clase (`PatternDiscoveryEngine`) con una interfaz uniforme (`.fit()`, `.predict()`, `.monitor_drift()`, `.save()`, `.load()`) y serialización JSON verificada para garantizar inferencia idéntica tras recargar de disco. Ese código limpio y modular terminó publicado como la librería [`cp-pde`](https://pypi.org/project/cp-pde/):

```python
from pde import PatternDiscoveryEngine

engine = PatternDiscoveryEngine(alpha=0.05, review_boundary=0.20)
engine.fit(train_data, cal_data)
result = engine.predict(new_data)
```

Cada paquete de `cp-pde` hereda directamente una etapa del laboratorio: `pde.geometry` (`V0.2`), `pde.association` (`V0.3`), `pde.clustering` (`V0.4`), `pde.sequential` (`V0.5`), `pde.calibration` (`V0.2.6–V0.2.8`), `pde.drift` (`V0.6`) y `pde.persistence` (`V0.7`).

---

## Qué me llevo de este laboratorio

- **La geometría decide el algoritmo:** comparar detectores antes de elegir es obligatorio; ninguno domina en todos los escenarios.
- **Un score sin calibrar es difícil de operar:** convertir puntuaciones incompatibles en p-valores conformales permite controlar falsas alarmas, combinar métodos sin trampas de escala y detectar *drift* sin etiquetas.
- **Saber decir «revisión» vale más que forzar un binario:** reservar una banda intermedia (`review`) reduce el riesgo de automatizar decisiones ambiguas.
- **Los controles negativos salvan de autoengaños:** tanto el caso del *ensemble* inestable como el bug de independencia de `make_blobs` en `V0.2.12` solo salieron a la luz por auditar supuestos que parecían obvios.
- **El límite del laboratorio:** todas estas métricas vienen de generadores sintéticos controlados; sirven para validar propiedades estadísticas y detectar fallos de diseño, no como garantía automática en datos reales de producción.
