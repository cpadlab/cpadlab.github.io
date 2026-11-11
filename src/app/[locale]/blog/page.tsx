import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getAlternateLanguages, getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { BlogSection } from "@/view/blog/section";
import { getPostsByCategory } from "@/utils/blog";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "pages.blog.metadata" });
    const pathname = getPathname({ locale, href: "/blog" });

    return {
        title: {
            absolute: t("title"),
        },
        description: t("description"),
        alternates: {
            canonical: pathname,
            languages: getAlternateLanguages("/blog"),
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: pathname,
            type: "website",
        },
    };
}

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations("pages.blog");
    const articles = getPostsByCategory(locale, "Article");

    return (
        <main className="md:max-w-4xl max-w-xl mx-auto px-8 w-full">

            <section className="pb-8 space-y-2 pt-2">
                <h1 className="capitalize text-2xl font-bold">{t("title")}</h1>
                <p className="capitalize text-muted-foreground">{t("description")}</p>
            </section>

            <div className="space-y-16 py-8">
                <BlogSection needCategory={false} title={t("sections.articles.title")} description={t("sections.articles.description")} posts={articles} emptyMessage={t("sections.articles.empty_message")} />
            </div>

        </main>
    );
}
