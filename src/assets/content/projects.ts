import type { Locale } from "next-intl";
import type { ProjectList } from "@/types/project";

export const en_projects: ProjectList = [
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
