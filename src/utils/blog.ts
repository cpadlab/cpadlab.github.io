import type { Locale } from "next-intl";
import { blogPosts } from "@/assets/content/blog";
import { routing } from "@/i18n/routing";
import type { BlogPost, BlogPostPreview } from "@/types/blog";

function getPostsForLocale(locale: Locale): BlogPostPreview[] {
    return blogPosts[locale] ?? blogPosts[routing.defaultLocale];
}

export function getAllPosts(locale: Locale): BlogPostPreview[] {
    return [...getPostsForLocale(locale)].sort((a, b) => {
        const aTime = Date.parse(a.date) || 0;
        const bTime = Date.parse(b.date) || 0;
        return bTime - aTime;
    });
}

export function getRecentPosts(locale: Locale, limit = 5): BlogPostPreview[] {
    return getAllPosts(locale).slice(0, limit);
}

export function getPostById(locale: Locale, id: string): BlogPost | null {
    return getPostsForLocale(locale).find((post) => post.id === id) || null;
}

function normalizeCategory(category: string): string {
    return category.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

export function getPostsByCategory(locale: Locale, category: string): BlogPostPreview[] {
    const normalizedCategory = normalizeCategory(category);
    return getAllPosts(locale).filter(
        (post) => normalizeCategory(post.category) === normalizedCategory,
    );
}

export function isExternalUrl(url: string): boolean {
    return /^https?:\/\//i.test(url.trim());
}

export function getInternalPostHref(url: string): string {
    const trimmed = url.trim();
    return trimmed.replace(/^\/(en|es)(?=\/)/, "") || "/";
}
