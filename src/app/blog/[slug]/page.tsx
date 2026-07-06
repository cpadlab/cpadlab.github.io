import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { PostView } from "@/views/post/view";
import { StickyFooter } from "@/views/sticky-footer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return {
            title: "Post Not Found — Carlos Padilla",
        };
    }

    return {
        title: `${post.title} — Carlos Padilla`,
        description: post.description,
        keywords: post.tags,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": post.cover || "https://cpadlab.github.io/images/banner.webp",
        "datePublished": post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        "dateModified": post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        "author": {
            "@type": "Person",
            "name": "Carlos Padilla",
            "url": "https://cpadlab.github.io"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Carlos Padilla",
            "logo": {
                "@type": "ImageObject",
                "url": "https://cpadlab.github.io/favicon.ico"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://cpadlab.github.io/blog/${slug}`
        }
    };

    return (
        <main className="bg-black text-white min-h-dvh flex flex-col justify-between">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="flex-grow">
                <PostView post={post} relatedPosts={relatedPosts} />
            </div>
            <StickyFooter />
        </main>
    );
}
