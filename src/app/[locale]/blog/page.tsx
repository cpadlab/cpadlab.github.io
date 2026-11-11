import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { BlogSection } from "@/view/blog/section";
import { getPostsByCategory } from "@/utils/blog";

export async function generateMetadata(): Promise<Metadata> {
    
    const locale = await getLocale();
    const t = await getTranslations("pages.blog.metadata");
    const pathname = getPathname({ locale, href: "/blog" });

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: pathname,
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: pathname,
            type: "website",
        },
    };
}

export default async function BlogPage() {

    const locale = await getLocale();
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
