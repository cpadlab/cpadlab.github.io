import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPostById } from "@/utils/blog";
import { getAllStaticPostParams, getPostContent, hasPostContent } from "@/utils/posts";
import { formatDate } from "@/utils/dates";
import { MarkdownRenderer } from "@/view/blog/markdown";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://cpadlab.github.io").replace(/\/+$/, "");

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllStaticPostParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale, slug } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const post = getPostById(locale, slug);
    if (!post || !hasPostContent(locale, slug)) {
        notFound();
    }

    const href = `/posts/${slug}`;
    const pathname = getPathname({ locale, href });
    const languages = Object.fromEntries(
        routing.locales
            .filter((targetLocale) => getPostById(targetLocale, slug) && hasPostContent(targetLocale, slug))
            .map((targetLocale) => [targetLocale, getPathname({ locale: targetLocale, href })]),
    );

    const publishedTime = Date.parse(post.date)
        ? new Date(post.date).toISOString()
        : undefined;

    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: pathname,
            languages,
        },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.description,
            url: pathname,
            ...(publishedTime && { publishedTime }),
            ...(post.cover && { images: [{ url: post.cover }] }),
        },
    };
}

export default async function PostPage({ params }: Props) {

    const { locale, slug } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const post = getPostById(locale, slug);
    const postContent = getPostContent(locale, slug);

    if (!post || !postContent) {
        notFound();
    }

    const t = await getTranslations("pages.post");
    const pathname = getPathname({ locale, href: `/posts/${slug}` });
    const publishedTime = Date.parse(post.date)
        ? new Date(post.date).toISOString()
        : post.date;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: publishedTime,
        url: `${siteUrl}${pathname}`,
        author: {
            "@type": "Person",
            name: "Carlos Padilla",
            url: siteUrl,
        },
        ...(post.cover && { image: `${siteUrl}${post.cover}` }),
        ...(post.tags?.length > 0 && { keywords: post.tags.join(", ") }),
    };

    return (
        <main className="mx-auto w-full max-w-xl px-8 md:max-w-4xl">
            
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <article className="pb-12 pt-2">

                <header className="mb-8 space-y-2 border-b border-border pb-8">
                    
                    <h1 className="text-2xl font-bold">{post.title}</h1>

                    <p className="text-muted-foreground">{post.description}</p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs uppercase text-muted-foreground">
                        <time dateTime={publishedTime}>{formatDate(post.date, locale)}</time>
                        <span aria-hidden="true">/</span>
                        <span>{post.category}</span>
                        <span aria-hidden="true">/</span>
                        <span>{t("reading_time", { minutes: postContent.readingTimeMinutes })}</span>
                    </div>

                    {post.tags?.length > 0 && (
                        <ul className="flex flex-wrap gap-2 pt-1">
                            {post.tags.map((tag) => (
                                <li key={tag} className="text-xs text-muted-foreground">
                                    #{tag}
                                </li>
                            ))}
                        </ul>
                    )}

                </header>

                <MarkdownRenderer content={postContent.content} />

                <div className="mt-12 border-t border-border pt-8">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm uppercase text-muted-foreground transition-colors hover:text-primary">
                        <svg aria-hidden="true" className="size-3.5 min-h-3.5 min-w-3.5 -rotate-135" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M12 4h8v2h-8zM16 6h4v2h-4zM14 8h2v2h-2zM18 8h2v4h-2zM12 10h2v2h-2zM10 12h2v2h-2zM8 14h2v2h-2zM6 16h2v2h-2zM4 18h2v2h-2z" />
                        </svg>
                        <b>{t("back_to_blog")}</b>
                    </Link>
                </div>

            </article>
        </main>
    );
}
