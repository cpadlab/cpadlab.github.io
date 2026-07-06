import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface PostRelatedProps {
    relatedPosts: Omit<BlogPost, "content">[];
}

export function PostRelated({ relatedPosts }: PostRelatedProps) {
    if (relatedPosts.length === 0) return null;

    return (
        <div className="mt-24 pt-12 border-t border-neutral-800">
            <h3 className="text-2xl font-editorial text-white mb-8">
                Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-neutral-800">
                {relatedPosts.map((related) => (
                    <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group flex flex-col justify-between border-r border-b border-neutral-800 p-6 hover:bg-neutral-950/40 transition-all duration-300 min-h-[220px] cursor-none"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-mondwest text-neutral-500 mb-2">
                                <span>{related.category?.toUpperCase()}</span>
                                <span className="w-1 h-1 bg-neutral-800" />
                                <span>{related.date}</span>
                            </div>
                            <h4 className="text-lg font-editorial font-medium text-white group-hover:text-neutral-300 transition-colors leading-snug line-clamp-3">
                                {related.title}
                            </h4>
                        </div>
                        <p className="text-neutral-500 text-xs font-mondwest mt-4">
                            READ ARTICLE →
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
