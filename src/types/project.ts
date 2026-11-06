
export interface Project {
    name: string;
    description: string;
    year: number;
    url: string;
    article?: string;
}

export type ProjectList = Project[];