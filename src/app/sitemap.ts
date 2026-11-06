import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/blog";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://cpadlab.github.io").replace(/\/+$/, "");

function parseDate(dateStr?: string): Date {
    if (!dateStr) return new Date();
    const timestamp = Date.parse(dateStr);
    return isNaN(timestamp) ? new Date() : new Date(timestamp);
}

export default function sitemap(): MetadataRoute.Sitemap {
    
    const posts = getAllPosts();

    const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: parseDate(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        ...blogPostEntries,
    ];
    
}
