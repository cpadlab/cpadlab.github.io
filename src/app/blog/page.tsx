import { getAllPosts } from "@/lib/blog";
import { BlogListView } from "@/views/blog/list-view";
import { StickyFooter } from "@/views/sticky-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog — Carlos Padilla",
    description: "Walkthroughs, articles, and tutorials about cybersecurity, full-stack web development, incident response, and automation by Carlos Padilla.",
    keywords: [
        "Carlos Padilla blog", "cybersecurity writeups", "tryhackme walkthroughs", 
        "SOAR automation", "creative development", "ethical hacking", "pentesting writeups"
    ],
};

export default function BlogPage() {
    const posts = getAllPosts();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Blog — Carlos Padilla",
        "description": "Walkthroughs, articles, and tutorials about cybersecurity, full-stack web development, incident response, and automation by Carlos Padilla.",
        "url": "https://cpadlab.github.io/blog",
        "publisher": {
            "@type": "Person",
            "name": "Carlos Padilla",
            "url": "https://cpadlab.github.io"
        }
    };

    return (
        <main className="bg-black text-white min-h-dvh flex flex-col justify-between">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="flex-grow">
                <BlogListView posts={posts} />
            </div>
            <StickyFooter />
        </main>
    );
}
