
export interface Project {
    name: string;
    description: string;
    year: number;
    url?: string;
    code?: string;
    article?: string;
}

export type ProjectList = Project[];