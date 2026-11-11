import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://cpadlab.github.io").replace(/\/+$/, "");

const routes = [
    { href: "/", changeFrequency: "weekly", priority: 1.0 },
    { href: "/blog", changeFrequency: "daily", priority: 0.8 },
] as const;

function buildUrl(href: string, locale: (typeof routing.locales)[number]): string {
    const pathname = getPathname({ locale, href });
    return pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
    
    const lastModified = new Date();

    return routes.flatMap((route) => {
        const languages = Object.fromEntries(
            routing.locales.map((locale) => [locale, buildUrl(route.href, locale)]),
        );

        return routing.locales.map((locale) => ({
            url: buildUrl(route.href, locale),
            lastModified,
            changeFrequency: route.changeFrequency,
            priority: route.priority,
            alternates: {
                languages,
            },
        }));
    });

}
