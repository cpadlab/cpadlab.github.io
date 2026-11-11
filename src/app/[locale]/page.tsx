import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getAlternateLanguages, getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import HomeAboutSection from "@/view/home/about";
import HomeBlogSection from "@/view/home/blog";
import { HomeExperienceSection } from "@/view/home/experience";
import HomeHeroSection from "@/view/home/hero";
import { HomeProjectsSection } from "@/view/home/projects";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "pages.home.metadata" });
    const pathname = getPathname({ locale, href: "/" });

    return {
        title: {
            absolute: t("title"),
        },
        description: t("description"),
        alternates: {
            canonical: pathname,
            languages: getAlternateLanguages("/"),
        },
    };
}

export default async function Home({ params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <main className="md:max-w-4xl max-w-xl mx-auto px-8 w-full">
            <HomeHeroSection />
            <HomeAboutSection />
            <HomeExperienceSection />
            <HomeProjectsSection />
            <HomeBlogSection />
        </main>
    );
}
