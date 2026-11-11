import { getLocale, getTranslations } from "next-intl/server";
import type { BlogPostPreview } from "@/types/blog";
import { formatDate } from "@/utils/dates";

interface BlogSectionProps {
    title: string;
    description: string;
    needCategory: boolean;
    posts: BlogPostPreview[];
    emptyMessage?: string;
}

export async function BlogSection({ title, description, posts, needCategory, emptyMessage }: BlogSectionProps) {
    
    const locale = await getLocale();
    const t = await getTranslations("pages.blog");

    return (
        <section aria-labelledby={`blog-${title.toLowerCase().replace(/\s+/g, "-")}`}>

            <div className="mb-4">
                <div className="flex justify-between gap-4">
                    <h2 id={`blog-${title.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm uppercase text-muted-foreground font-bold">{title}</h2>
                    <span className="text-xs text-muted-foreground">{t("posts_count", { count: posts.length.toString().padStart(2, "0") })}</span>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {posts.length > 0 ? (
                <div className="border-t border-border">
                    {posts.map((post) => {

                        const hasUrl = Boolean(post.url && post.url.trim() !== "");

                        return (
                            <article key={post.id} className="group">
                                <a href={hasUrl ? post.url : undefined} target={hasUrl ? "_blank" : undefined} rel={hasUrl ? "noopener noreferrer" : undefined} className={`grid gap-2 py-6 transition-colors sm:grid-cols-[120px_1fr] sm:gap-8 ${hasUrl ? "cursor-pointer" : "cursor-default"}`}>

                                    <div className="flex flex-col gap-2">
                                        <time dateTime={post.date} className="text-xs text-muted-foreground">{formatDate(post.date, locale)}</time>
                                        {needCategory && <span className="w-fit text-xs uppercase text-muted-foreground">{post.category}</span>}
                                    </div>

                                    <div>

                                        <h3 className={`mb-2 font-bold transition-colors ${hasUrl ? "group-hover:text-primary" : ""}`}>{post.title}</h3>
                                        <p className="line-clamp-2 text-muted-foreground">{post.description}</p>

                                        {post.tags?.length > 0 && (
                                            <ul className="mt-4 flex flex-wrap gap-2">
                                                {post.tags.map((tag) => (
                                                    <li key={tag} className="text-xs text-muted-foreground">#{tag}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                </a>
                            </article>
                        );
                        
                    })}
                </div>
            ) : (
                <div className="border-t border-border py-4">
                    <p className="text-sm text-muted-foreground">{emptyMessage ?? t("sections.articles.empty_message")}</p>
                </div>
            )}

        </section>
    );
}
