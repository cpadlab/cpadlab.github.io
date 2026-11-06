export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    date: string;
    description: string;
    category: string;
    cover: string;
    tags: string[];
    content: string;
}

export type BlogPostPreview = Omit<BlogPost, "content">;