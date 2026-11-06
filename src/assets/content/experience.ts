import { WorkExperience } from "@/types/experience";

export const experiences: WorkExperience[] = [
    {
        company: "Grupo TRC",
        url: "https://trc.es/",
        job: "SOAR Cybersecurity Analyst",
        location: "Almería, Spain",
        dates: "Oct. 2025 - Present",
        projects: [
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