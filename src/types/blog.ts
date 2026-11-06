export interface BlogPost {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    cover?: string;
    tags: string[];
    url: string;
}

export type BlogPostList = BlogPost[];
export type BlogPostPreview = BlogPost;
