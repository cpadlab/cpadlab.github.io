import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
    post: Omit<BlogPost, "content">;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between border-r border-b border-neutral-800 p-6 md:p-8 hover:bg-neutral-950/40 transition-all duration-300 min-h-[380px] cursor-none"
        >
            <div>
                <div className="flex items-center gap-3 text-xs font-mondwest text-neutral-500 mb-4">
                    <span>{post.category?.toUpperCase()}</span>
                    <span className="w-1.5 h-1.5 bg-neutral-700" />
                    <span>{post.date}</span>
                </div>

                {post.cover && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 border border-neutral-800 bg-neutral-950">
                        <img
                            src={post.cover}
                            alt={post.title}
                            className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500 ease-in-out"
                        />
                    </div>
                )}

                <h2 className="text-2xl font-editorial font-medium text-white group-hover:text-neutral-300 transition-colors leading-snug line-clamp-3">
                    {post.title}
                </h2>

                <p className="text-neutral-400 text-sm mt-3 line-clamp-3 font-sans leading-relaxed">
                    {post.description}
                </p>
            </div>

            {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-4 border-t border-neutral-900/60 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] font-mondwest text-neutral-500 uppercase border border-neutral-900 px-1.5 py-0.5"
                        >
                            #{tag}
                        </span>
                    ))}
                    {post.tags.length > 3 && (
                        <span className="text-[10px] font-mondwest text-neutral-600">
                            +{post.tags.length - 3} MORE
                        </span>
                    )}
                </div>
            )}
        </Link>
    );
}
