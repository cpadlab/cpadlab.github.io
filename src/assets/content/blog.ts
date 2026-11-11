import type { Locale } from "next-intl";
import type { BlogPostList } from "@/types/blog";

export const blogPosts: Record<Locale, BlogPostList> = {
    en: [
        {
            id: "pattern-discovery-engine",
            title: "From Machine Learning Experiments to a Python Pattern Discovery Library",
            date: "Nov 11, 2026",
            description:
                "The development of Pattern Discovery Engine: clustering, anomaly detection, conformal calibration, and pattern learning.",
            category: "Article",
            cover: "/images/blog/pattern-discovery-engine/01-clustering-pca-hdbscan-en.png",
            tags: [
                "Python",
                "Machine Learning",
                "Anomaly Detection",
                "Clustering",
                "Conformal Prediction",
            ],
            url: "/posts/pattern-discovery-engine",
        },
    ],
    es: [
        {
            id: "pattern-discovery-engine",
            title: "De experimentos de Machine Learning a una biblioteca de detección de patrones en Python",
            date: "Nov 11, 2026",
            description:
                "El desarrollo de Pattern Discovery Engine: clustering, detección de anomalías, calibración conformal y aprendizaje de patrones.",
            category: "Article",
            cover: "/images/blog/pattern-discovery-engine/01-clustering-pca-hdbscan-es.png",
            tags: [
                "Python",
                "Machine Learning",
                "Detección de Anomalías",
                "Clustering",
                "Predicción Conformal",
            ],
            url: "/posts/pattern-discovery-engine",
        },
    ],
};
