import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
    post: Omit<BlogPost, "content">;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="h-full">
            <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
            >
                <div>
                    {post.cover && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-neutral-800/60 mb-5">
                            <img src={post.cover} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-3 text-xs font-mondwest mb-3">
                        <span className="px-2.5 py-0.5 uppercase tracking-wider text-neutral-300 bg-neutral-900 border border-neutral-800/90">
                            {post.category}
                        </span>
                        <span className="text-neutral-500 font-mono text-[11px]">{post.date}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-editorial font-medium text-white group-hover:text-neutral-200 transition-colors leading-snug line-clamp-2 mt-2">
                        {post.title}
                    </h3>

                    <p className="text-neutral-400 text-sm font-sans leading-relaxed mt-3 line-clamp-3">
                        {post.description}
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900/90 flex items-center justify-between gap-2">
                    {post.tags && post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 overflow-hidden">
                            {post.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="text-[10px] font-mondwest text-neutral-500 uppercase bg-neutral-900/60 px-2 py-0.5 border-neutral-800/60">
                                    #{tag}
                                </span>
                            ))}
                            {post.tags.length > 2 && (
                                <span className="text-[10px] font-mondwest text-neutral-600 self-center">
                                    +{post.tags.length - 2}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div />
                    )}

                    <span className="text-xs font-mondwest text-neutral-400 group-hover:text-white tracking-wider flex items-center gap-1.5 ml-auto font-medium">
                        READ
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                            →
                        </span>
                    </span>
                </div>
            </Link>
        </article>
    );
}
