import type { ProjectList } from "./project";

export interface WorkExperience {
    company: string;
    url: string;
    job: string;
    location: string;
    dates: string;
    projects?: ProjectList;
}

export type ExperienceList = WorkExperience[];