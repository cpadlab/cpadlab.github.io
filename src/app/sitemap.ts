import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPostById } from "@/utils/blog";
import { getAllStaticPostParams } from "@/utils/posts";

export const dynamic = "force-static";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://cpadlab.github.io").replace(/\/+$/, "");

const routes = [
    { href: "/", changeFrequency: "weekly", priority: 1.0 },
    { href: "/blog", changeFrequency: "daily", priority: 0.8 },
    { href: "/cookies", changeFrequency: "monthly", priority: 0.3 },
] as const;

function buildUrl(href: string, locale: (typeof routing.locales)[number]): string {
    const pathname = getPathname({ locale, href });
    return pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticEntries = routes.flatMap((route) => {
        const languages = Object.fromEntries(
            routing.locales.map((locale) => [locale, buildUrl(route.href, locale)]),
        );

        return routing.locales.map((locale) => ({
            url: buildUrl(route.href, locale),
            lastModified: now,
            changeFrequency: route.changeFrequency,
            priority: route.priority,
            alternates: {
                languages,
            },
        }));
    });

    const postParams = getAllStaticPostParams();
    const localesBySlug = new Map<string, Array<(typeof routing.locales)[number]>>();
    for (const { locale, slug } of postParams) {
        const existing = localesBySlug.get(slug) ?? [];
        existing.push(locale);
        localesBySlug.set(slug, existing);
    }

    const postEntries = postParams.map(({ locale, slug }) => {
        const post = getPostById(locale, slug);
        const href = `/posts/${slug}`;
        const availableLocales = localesBySlug.get(slug) ?? [locale];
        const languages = Object.fromEntries(
            availableLocales.map((targetLocale) => [targetLocale, buildUrl(href, targetLocale)]),
        );

        const parsedDate = post?.date ? Date.parse(post.date) : Number.NaN;
        const lastModified = Number.isNaN(parsedDate) ? now : new Date(parsedDate);

        return {
            url: buildUrl(href, locale),
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.7,
            ...(post?.cover && { images: [`${siteUrl}${post.cover}`] }),
            alternates: {
                languages,
            },
        };
    });

    return [...staticEntries, ...postEntries];
}
