import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { PostHeader } from "./header";
import { PostCover } from "./cover";
import { Markdown } from "./markdown";
import { PostRelated } from "./related";

interface PostViewProps {
    post: BlogPost;
    relatedPosts: Omit<BlogPost, "content">[];
}

export function PostView({ post, relatedPosts }: PostViewProps) {
    return (
        <div className="max-w-4xl mx-auto px-8 lg:px-12 pt-32 pb-24 w-full">
            <div className="mb-12">
                <Link
                    href="/blog"
                    className="inline-block border border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-white px-5 py-2.5 text-xs font-mondwest transition-all duration-300 cursor-none"
                    style={{ borderRadius: 0 }}
                >
                    ← BACK TO BLOG
                </Link>
            </div>

            <article className="w-full">
                <PostHeader
                    category={post.category}
                    date={post.date}
                    title={post.title}
                    description={post.description}
                />

                <PostCover cover={post.cover} title={post.title} />

                <div className="max-w-3xl mx-auto">
                    <Markdown content={post.content} />
                </div>
            </article>

            <PostRelated relatedPosts={relatedPosts} />
        </div>
    );
}
