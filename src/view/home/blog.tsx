import { getLocale, getTranslations } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import { getInternalPostHref, getRecentPosts, isExternalUrl } from "@/utils/blog";

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
        itemListElement: posts.map((post, index) => {
            const hasUrl = Boolean(post.url && post.url.trim() !== "");
            const postUrl = hasUrl
                ? isExternalUrl(post.url)
                    ? post.url
                    : `${siteUrl}${getPathname({ locale, href: getInternalPostHref(post.url) })}`
                : `${siteUrl}${blogPath}`;

            return {
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "BlogPosting",
                    headline: post.title,
                    description: post.description,
                    datePublished: post.date,
                    url: postUrl,
                },
            };
        }),
    };

    return (
        <section id="blog" aria-labelledby="blog-heading" className="space-y-2 py-8">
            
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2 id="blog-heading" className="text-sm font-bold uppercase text-muted-foreground">{t("title")}</h2>

            <ol>
                {posts.map((post) => {

                    const hasUrl = Boolean(post.url && post.url.trim() !== "");
                    const external = hasUrl && isExternalUrl(post.url);
                    const linkClassName = `transition-colors ${
                        hasUrl ? "hover:text-primary cursor-pointer" : "cursor-default"
                    }`;

                    return (
                        <li key={post.id}>
                            <article itemScope itemType="https://schema.org/BlogPosting">

                                <header className="text-lg">
                                    {post.date && (
                                        <>
                                            <time className="inline text-muted-foreground" dateTime={post.date} itemProp="datePublished">{post.date}</time>{" "}
                                        </>
                                    )}
                                    <h3 className="inline" itemProp="headline">
                                        {hasUrl && !external ? (
                                            <Link className={linkClassName} href={getInternalPostHref(post.url)} itemProp="url">
                                                <b className="uppercase">{post.title}</b>
                                            </Link>
                                        ) : (
                                            <a className={linkClassName} href={hasUrl ? post.url : undefined} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} itemProp="url">
                                                <b className="uppercase">{post.title}</b>
                                            </a>
                                        )}
                                    </h3>
                                </header>

                                {post.description && (
                                    <p className="line-clamp-2 text-muted-foreground" itemProp="description">
                                        {post.description}
                                    </p>
                                )}

                            </article>
                        </li>
                    );

                })}
            </ol>

            <nav aria-label={t("view_all")}>
                <Link href="/blog" className="flex items-center gap-2 text-sm uppercase text-muted-foreground transition-colors hover:text-primary">
                    <b>{t("view_all")}</b>
                    <svg aria-hidden="true" className="size-3.5 min-h-3.5 min-w-3.5 rotate-45" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4h8v2h-8zM16 6h4v2h-4zM14 8h2v2h-2zM18 8h2v4h-2zM12 10h2v2h-2zM10 12h2v2h-2zM8 14h2v2h-2zM6 16h2v2h-2zM4 18h2v2h-2z" />
                    </svg>
                </Link>
            </nav>
            
        </section>
    );
};

export default HomeBlogSection;
