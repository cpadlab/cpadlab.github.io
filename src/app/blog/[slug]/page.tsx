import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getAllPosts, getPostBySlug } from "@/utils/blog";
import { formatDate } from "@/utils/dates";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {

    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post not found | Carlos Padilla",
        };
    }

    const postUrl = `/blog/${post.slug}`;

    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: postUrl,
            type: "article",
            publishedTime: post.date,
            tags: post.tags,
            images: post.cover
                ? [
                      {
                          url: post.cover,
                          alt: post.title,
                      },
                  ]
                : undefined,
        },
    };

}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="md:max-w-4xl max-w-xl mx-auto px-8 w-full">
            <article>

                <header className="pb-8 space-y-2 pt-2">
                    
                    <h1 className="capitalize text-2xl font-bold">{post.title}</h1>
                    <p className="capitalize text-muted-foreground">{post.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span aria-hidden="true">/</span>
                        <span className="uppercase">{post.category}</span>
                    </div>

                    {post.tags?.length > 0 && (
                        <ul className="flex flex-wrap gap-2 gap-y-0">
                            {post.tags.map((tag) => (
                                <li key={tag} className="text-xs text-muted-foreground">
                                    #{tag}
                                </li>
                            ))}
                        </ul>
                    )}

                </header>

                {post.cover && (
                    <div className="mb-8 overflow-hidden bg-muted rounded-lg">
                        <img src={post.cover} alt={post.title} className="h-auto w-full object-cover" />
                    </div>
                )}

                <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:text-foreground prose-img:border prose-img:border-border">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </div>

            </article>

            <footer>
                <Link href="/blog" className="text-sm uppercase hover:text-primary transition-colors text-muted-foreground flex items-center gap-2">
                    <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 -rotate-135" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4h8v2h-8zM16 6h4v2h-4zM14 8h2v2h-2zM18 8h2v4h-2zM12 10h2v2h-2zM10 12h2v2h-2zM8 14h2v2h-2zM6 16h2v2h-2zM4 18h2v2h-2z" />
                    </svg>
                    <b>Back to all articles</b>
                </Link>
            </footer>

        </main>
    );
}