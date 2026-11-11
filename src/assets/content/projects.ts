import type { Locale } from "next-intl";
import type { ProjectList } from "@/types/project";

export const en_projects: ProjectList = [
    {
        name: "Pattern Discovery Engine",
        description: "A laboratory-grade Python library for pattern discovery and statistical anomaly detection.",
        year: 2026,
        url: "https://github.com/cpadlab/pde",
        code: "https://github.com/cpadlab/pde",
        /* article: "https://medium.com/@cpadlab/how-to-crack-the-fnmt-certificate-7baac8bdf07a?sharedUserId=cpadlab" */
    }
];

export const es_projects: ProjectList = [
    {
        name: "Pattern Discovery Engine",
        description: "Librería en Python de nivel de laboratorio para el descubrimiento de patrones y detección estadística de anomalías.",
        year: 2026,
        url: "https://github.com/cpadlab/pde",
        code: "https://github.com/cpadlab/pde",
    }
];

export const projects: Record<Locale, ProjectList> = {
    en: en_projects,
    es: es_projects,
};
