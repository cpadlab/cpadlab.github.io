import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getAlternateLanguages, getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ManageCookiesButton } from "@/view/cookies/manage-button";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "pages.cookies.metadata" });
    const pathname = getPathname({ locale, href: "/cookies" });

    return {
        title: {
            absolute: t("title"),
        },
        description: t("description"),
        alternates: {
            canonical: pathname,
            languages: getAlternateLanguages("/cookies"),
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: pathname,
            type: "website",
        },
    };
}

export default async function CookiesPage({ params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations("pages.cookies");

    return (
        <main className="md:max-w-4xl max-w-xl mx-auto px-8 w-full py-2">
            
            <section className="pb-8 space-y-2">
                <h1 className="capitalize text-2xl font-bold">{t("title")}</h1>
                <p className="text-muted-foreground text-sm">{t("last_updated")}</p>
            </section>

            <article className="space-y-8 text-sm leading-relaxed text-muted-foreground border-t border-border pt-6">
                
                <section className="space-y-2">
                    <h2 className="text-base font-bold uppercase text-foreground">{t("sections.what_are_cookies.title")}</h2>
                    <p>{t("sections.what_are_cookies.content")}</p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-base font-bold uppercase text-foreground">{t("sections.used_cookies.title")}</h2>
                    <p>{t("sections.used_cookies.intro")}</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">{t("sections.used_cookies.essential_label")}</strong>{" "}
                            {t("sections.used_cookies.essential_description")}
                        </li>
                        <li>
                            <strong className="text-foreground">{t("sections.used_cookies.analytics_label")}</strong>{" "}
                            {t("sections.used_cookies.analytics_description")}
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-base font-bold uppercase text-foreground">{t("sections.analytics_details.title")}</h2>
                    <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-muted/50 border-b border-border text-foreground uppercase font-mono">
                                <tr>
                                    <th className="p-3">{t("sections.analytics_details.table.identifier")}</th>
                                    <th className="p-3">{t("sections.analytics_details.table.provider")}</th>
                                    <th className="p-3">{t("sections.analytics_details.table.purpose")}</th>
                                    <th className="p-3">{t("sections.analytics_details.table.duration")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="p-3 font-mono">{t("sections.analytics_details.rows.ga.identifier")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.ga.provider")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.ga.purpose")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.ga.duration")}</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">{t("sections.analytics_details.rows.consent.identifier")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.consent.provider")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.consent.purpose")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.consent.duration")}</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">{t("sections.analytics_details.rows.theme.identifier")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.theme.provider")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.theme.purpose")}</td>
                                    <td className="p-3">{t("sections.analytics_details.rows.theme.duration")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-base font-bold uppercase text-foreground">{t("sections.manage_consent.title")}</h2>
                    <p>{t("sections.manage_consent.description")}</p>
                    <div className="pt-1">
                        <ManageCookiesButton />
                    </div>
                </section>

                <section className="space-y-2">
                    <h2 className="text-base font-bold uppercase text-foreground">{t("sections.browser_control.title")}</h2>
                    <p>{t("sections.browser_control.description")}</p>
                </section>

            </article>
            
        </main>
    );
}
