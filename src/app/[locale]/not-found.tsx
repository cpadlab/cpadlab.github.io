import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("pages.not_found.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function NotFound() {
    const t = await getTranslations("pages.not_found");

    return (
        <main className="md:max-w-4xl max-w-xl space-y-2 mx-auto px-8 w-full">

            <h1 className="capitalize text-2xl font-bold">{t("title")}</h1>

            <ul className="text-sm text-muted-foreground">
                <li>{">"} {t("terminal.searching")}</li>
                <li>{">"} {t("terminal.not_found")}</li>
                <li>{">"} {t("terminal.status")}</li>
            </ul>

            <p className="capitalize text-muted-foreground">{t("description")}</p>

            <Link href="/" className="text-sm uppercase hover:text-primary transition-colors text-muted-foreground flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 -rotate-135" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4h8v2h-8zM16 6h4v2h-4zM14 8h2v2h-2zM18 8h2v4h-2zM12 10h2v2h-2zM10 12h2v2h-2zM8 14h2v2h-2zM6 16h2v2h-2zM4 18h2v2h-2z" />
                </svg>
                <b>{t("cta")}</b>
            </Link>

        </main>
    );
}
