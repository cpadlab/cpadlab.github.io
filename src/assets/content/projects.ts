import type { Locale } from "next-intl";
import type { ProjectList } from "@/types/project";

export const en_projects: ProjectList = [
    {
        name: "Fine Tuning Pipeline",
        description: "End-to-end Python CLI for training SLMs: from PDF documents to synthetic dataset generation, fine-tuning with QLoRA, and export ready for Ollama.",
        year: 2026,
        url: "https://github.com/cpadlab/ft-pipeline",
    },
    {
        name: "Pattern Discovery Engine",
        description: "A laboratory-grade Python library for pattern discovery and statistical anomaly detection.",
        year: 2026,
        url: "https://github.com/cpadlab/pde",
        code: "https://github.com/cpadlab/pde",
        article: "/posts/pattern-discovery-engine"
    }
];

export const es_projects: ProjectList = [
    {
        name: "Fine Tuning Pipeline",
        description: "CLI en Python para el entrenamiento de SLMs: desde documentos PDF hasta la generación de conjuntos de datasets, fine-tuning con QLoRA y la exportación lista para Ollama.",
        year: 2026,
        url: "https://github.com/cpadlab/ft-pipeline",
    },
    {
        name: "Pattern Discovery Engine",
        description: "Librería en Python de nivel de laboratorio para el descubrimiento de patrones y detección estadística de anomalías.",
        year: 2026,
        url: "https://github.com/cpadlab/pde",
        code: "https://github.com/cpadlab/pde",
        article: "/es/posts/pattern-discovery-engine"
    }
];

export const projects: Record<Locale, ProjectList> = {
    en: en_projects,
    es: es_projects,
};
