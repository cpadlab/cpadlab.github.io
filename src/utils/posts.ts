import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "./blog";

const BLOG_CONTENT_ROOT = path.join(process.cwd(), "src", "assets", "blog");
const SAFE_SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;

export interface PostContentData {
    content: string;
    readingTimeMinutes: number;
}

function resolvePostFilePath(locale: Locale, slug: string): string | null {
    
    if (!SAFE_SLUG_PATTERN.test(slug)) {
        return null;
    }

    const localeDir = path.join(BLOG_CONTENT_ROOT, locale);
    const candidates = [slug, `${slug}.md`, `${slug}.mdx`];

    for (const filename of candidates) {
        const candidatePath = path.join(localeDir, filename);
        if (fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile()) {
            return candidatePath;
        }
    }

    return null;
}

function stripLeadingHeading(markdown: string): string {
    return markdown.replace(/^\uFEFF?#\s+[^\r\n]+(?:\r?\n)+/, "").trimStart();
}

function estimateReadingTimeMinutes(text: string): number {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

export function getPostContent(locale: Locale, slug: string): PostContentData | null {

    const filePath = resolvePostFilePath(locale, slug);
    if (!filePath) {
        return null;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const content = stripLeadingHeading(raw);

    return {
        content,
        readingTimeMinutes: estimateReadingTimeMinutes(raw),
    };
}

export function hasPostContent(locale: Locale, slug: string): boolean {
    return resolvePostFilePath(locale, slug) !== null;
}

export function getAllStaticPostParams(): Array<{ locale: Locale; slug: string }> {

    const params: Array<{ locale: Locale; slug: string }> = [];

    for (const locale of routing.locales) {
        for (const post of getAllPosts(locale)) {
            if (hasPostContent(locale, post.id)) {
                params.push({ locale, slug: post.id });
            }
        }
    }

    return params;
}
