import { blogPosts } from "@/assets/content/blog";
import type { BlogPost, BlogPostPreview } from "@/types/blog";

export function getAllPosts(): BlogPostPreview[] {
    return [...blogPosts].sort((a, b) => {
        const aTime = Date.parse(a.date) || 0;
        const bTime = Date.parse(b.date) || 0;
        return bTime - aTime;
    });
}

export function getRecentPosts(limit = 5): BlogPostPreview[] {
    return getAllPosts().slice(0, limit);
}

export function getPostById(id: string): BlogPost | null {
    return blogPosts.find((post) => post.id === id) || null;
}

function normalizeCategory(category: string): string {
    return category.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

export function getPostsByCategory(category: string): BlogPostPreview[] {
    const normalizedCategory = normalizeCategory(category);
    return getAllPosts().filter(
        (post) => normalizeCategory(post.category) === normalizedCategory,
    );
}
