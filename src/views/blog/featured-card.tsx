import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface FeaturedCardProps {
    post: Omit<BlogPost, "content">;
}

export function FeaturedBlogCard({ post }: FeaturedCardProps) {
    return (
        <article className="mb-14 sm:mb-18">
            
            <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1  text-xs font-mondwest tracking-wider bg-white/10 text-neutral-200 border border-white/15">
                    <span className="w-1.5 h-1.5  bg-emerald-400 animate-pulse" />
                    LATEST ARTICLE
                </span>
                <span className="text-xs font-mondwest text-neutral-500 uppercase">
                    FEATURED STORY
                </span>
            </div>

            <Link href={`/blog/${post.slug}`} className="group block relative overflow-hiddentransition-all duration-300 shadow-2xl ">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {post.cover && (
                        <div className="lg:col-span-7 overflow-hidden border border-neutral-800/70 bg-neutral-900 aspect-[16/10] sm:aspect-[16/9] w-full relative">
                            <img src={post.cover} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                <span className="px-3 py-1 text-xs font-mondwest uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/20">
                                    {post.category}
                                </span>
                                <span className="text-xs font-mondwest text-neutral-300 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10">
                                    {post.date}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className={post.cover ? "lg:col-span-5 flex flex-col justify-between h-full" : "lg:col-span-12"}>
                        <div>
                            <div className="hidden lg:flex items-center gap-3 text-xs font-mondwest text-neutral-400 mb-4">
                                <span className="px-2.5 py-1 uppercase bg-neutral-900 border border-neutral-800 text-neutral-300">
                                    {post.category}
                                </span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-editorial font-medium text-white group-hover:text-neutral-200 transition-colors leading-[1.2] tracking-tight">
                                {post.title}
                            </h2>

                            <p className="text-neutral-300 text-base sm:text-lg font-sans leading-relaxed mt-4 sm:mt-5 line-clamp-3 sm:line-clamp-4 font-normal">
                                {post.description}
                            </p>
                        </div>

                        <div className="mt-6 sm:mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[11px] font-mondwest text-neutral-400 uppercase bg-neutral-900/90 px-2.5 py-1 border border-neutral-800/80">
                                            #{tag}
                                        </span>
                                    ))}
                                    {post.tags.length > 3 && (
                                        <span className="text-[11px] font-mondwest text-neutral-500 self-center">
                                            +{post.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}

                            <span className="inline-flex mt-1 items-center gap-2 text-sm font-mondwest text-white group-hover:text-neutral-200 tracking-wider font-medium ml-auto">
                                READ POST
                                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                                    →
                                </span>
                            </span>
                        </div>

                    </div>

                </div>

            </Link>
        </article>
    );
}
