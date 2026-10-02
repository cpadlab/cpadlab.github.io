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

    const url = `https://cpadlab.github.io/blog/${slug}/`;
    const coverImage = post.cover || "https://cpadlab.github.io/images/banner.webp";
    const publishedTime = post.date ? new Date(post.date).toISOString() : undefined;

    return {
        title: `${post.title} — Carlos Padilla`,
        description: post.description,
        keywords: post.tags,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url,
            type: "article",
            publishedTime,
            modifiedTime: publishedTime,
            authors: ["Carlos Padilla"],
            tags: post.tags,
            images: [
                {
                    url: coverImage,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [coverImage],
            creator: "@cpadlab",
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post, 3);

    const formattedDate = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
    const coverImage = post.cover || "https://cpadlab.github.io/images/banner.webp";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": [
            coverImage
        ],
        "datePublished": formattedDate,
        "dateModified": formattedDate,
        "author": [
            {
                "@type": "Person",
                "name": "Carlos Padilla",
                "url": "https://cpadlab.github.io",
                "jobTitle": "SOAR Developer & Security Engineer",
                "sameAs": [
                    "https://es.linkedin.com/in/cpadilla10",
                    "https://github.com/cpadlab"
                ]
            }
        ],
        "publisher": {
            "@type": "Organization",
            "name": "Carlos Padilla",
            "url": "https://cpadlab.github.io",
            "logo": {
                "@type": "ImageObject",
                "url": "https://cpadlab.github.io/favicon.ico"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://cpadlab.github.io/blog/${slug}`
        },
        "articleSection": post.category || "Technology",
        "keywords": post.tags?.join(", ")
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
