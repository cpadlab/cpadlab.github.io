import type { Locale } from "next-intl";
import type { WorkExperience } from "@/types/experience";

export const en_experiences: WorkExperience[] = [
    {
        company: "Grupo TRC",
        url: "https://trc.es/",
        job: "SOAR Cybersecurity Analyst",
        location: "Almería, Spain",
        dates: "Oct. 2025 - Present",
        projects: [
         /* {
                name: "SOC Sentinel",
                description: "A Hyperautomation and Agent-Based Cybersecurity Operations Platform",
                year: 2026
            }, */
            {
                name: "WebCSX",
                description: "A multi-tenant cybersecurity operations platform featuring automated incident email generation, normalized security data, dynamic graph generation, and fine-grained ABAC access control.",
                year: 2026
            },
            {
                name: "PyTRC",
                description: "An internal Python library that provides unified integrations with cybersecurity platforms such as CrowdStrike Falcon, Cortex XDR, and Wiz, as well as data transformation and standardized graphing tools.",
                year: 2026
            }
        ]
    },
    {
        company: "Lealtadis Abogados S.L.P.",
        url: "https://www.lealtadis.es/",
        job: "Head of Technology",
        location: "Almería, Spain",
        dates: "Jul. 2025 - Dec. 2025"
    },
    {
        company: "Mantero Sistemi SRL",
        url: "https://www.manterosistemi.it/",
        job: "IT Systems Technician",
        location: "Genoa, Italy",
        dates: "Mar. 2023 - Jun. 2023"
    }
];

export const es_experiences: WorkExperience[] = [
    {
        company: "Grupo TRC",
        url: "https://trc.es/",
        job: "Analista de Ciberseguridad SOAR",
        location: "Almería, España",
        dates: "Oct. 2025 - Presente",
        projects: [
            {
                name: "WebCSX",
                description: "Plataforma multi-tenant de operaciones de ciberseguridad con generación automatizada de correos de incidentes, datos de seguridad normalizados, generación dinámica de grafos y control de acceso ABAC granular.",
                year: 2026
            },
            {
                name: "PyTRC",
                description: "Librería interna en Python que ofrece integraciones unificadas con plataformas de ciberseguridad como CrowdStrike Falcon, Cortex XDR y Wiz, además de herramientas de transformación de datos y grafos estandarizados.",
                year: 2026
            }
        ]
    },
    {
        company: "Lealtadis Abogados S.L.P.",
        url: "https://www.lealtadis.es/",
        job: "Responsable de Tecnológico",
        location: "Almería, España",
        dates: "Jul. 2025 - Dic. 2025"
    },
    {
        company: "Mantero Sistemi SRL",
        url: "https://www.manterosistemi.it/",
        job: "Técnico de Sistemas IT",
        location: "Génova, Italia",
        dates: "Mar. 2023 - Jun. 2023"
    }
];

export const experiences: Record<Locale, WorkExperience[]> = {
    en: en_experiences,
    es: es_experiences,
};
