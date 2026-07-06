import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://cpadlab.github.io";
    const posts = getAllPosts();

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString().split("T")[0],
            changeFrequency: "weekly" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString().split("T")[0],
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
    ];

    return [...routes, ...blogPosts];
}
