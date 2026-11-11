import { getLocale, getTranslations } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import { getRecentPosts } from "@/utils/blog";

export const HomeBlogSection = async () => {
    const locale = await getLocale();
    const t = await getTranslations("pages.home.blog");
    const posts = getRecentPosts(locale, 5);

    if (posts.length === 0) {
        return null;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cpadlab.github.io";
    const blogPath = getPathname({ locale, href: "/blog" });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                url: post.url || `${siteUrl}${blogPath}`,
            },
        })),
    };

    return (
        <section id="blog" aria-labelledby="blog-heading" className="py-8 space-y-2">

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2 id="blog-heading" className="text-sm uppercase text-muted-foreground font-bold">{t("title")}</h2>

            <ol>
                {posts.map((post, index) => {
                    const hasUrl = Boolean(post.url && post.url.trim() !== "");

                    return (
                        <li key={index}>
                            <article itemScope itemType="https://schema.org/BlogPosting">

                                <header className="text-lg">
                                    {post.date && (
                                        <>
                                            <time className="text-muted-foreground inline" dateTime={post.date} itemProp="datePublished">{post.date}</time>{" "}
                                        </>
                                    )}
                                    <h3 className="inline" itemProp="headline">
                                        <a className={`transition-colors ${hasUrl ? "hover:text-primary cursor-pointer" : "cursor-default"}`} href={hasUrl ? post.url : undefined} target={hasUrl ? "_blank" : undefined} rel={hasUrl ? "noopener noreferrer" : undefined} itemProp="url">
                                            <b className="uppercase">{post.title}</b>
                                        </a>
                                    </h3>
                                </header>

                                {post.description && (
                                    <p className="text-muted-foreground line-clamp-2" itemProp="description">{post.description}</p>
                                )}

                            </article>
                        </li>
                    );
                })}
            </ol>

            <nav aria-label={t("view_all")}>
                <Link href="/blog" className="text-sm uppercase hover:text-primary transition-colors text-muted-foreground flex items-center gap-2">
                    <b>{t("view_all")}</b>
                    <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 rotate-45" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4h8v2h-8zM16 6h4v2h-4zM14 8h2v2h-2zM18 8h2v4h-2zM12 10h2v2h-2zM10 12h2v2h-2zM8 14h2v2h-2zM6 16h2v2h-2zM4 18h2v2h-2z" />
                    </svg>
                </Link>
            </nav>

        </section>
    );
};

export default HomeBlogSection;
