import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { cn } from "cn";

import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import "./globals.css";

const anonymous_pro = Anonymous_Pro({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-monospace",
});

const siteUrl = "https://cpadlab.github.io";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {

    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "metadata" });
    const pathname = getPathname({ locale, href: "/" });

    return {
        metadataBase: new URL(siteUrl),

        title: {
            default: t("title.default"),
            template: t("title.template"),
        },
        description: t("description"),
        applicationName: t("application_name"),
        authors: [
            {
                name: "Carlos Padilla",
                url: siteUrl,
            },
        ],

        creator: "Carlos Padilla",

        alternates: {
            canonical: pathname,
        },

        robots: {
            index: true,
            follow: true,
        },

        openGraph: {
            type: "website",
            locale: t("open_graph.locale"),
            url: pathname === "/" ? siteUrl : `${siteUrl}${pathname}`,
            siteName: t("open_graph.site_name"),
            title: t("open_graph.title"),
            description: t("open_graph.description"),
        },
    };
    
}

type Props = Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: Props) {
    
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} className={cn("h-full antialiased font-monospace", anonymous_pro.variable)} suppressHydrationWarning>

            <head>
                <script
                    id="theme-init"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (() => {
                                try {
                                    const theme = localStorage.getItem("theme");
                                    if (theme === "dark" || theme === "light") {
                                        document.documentElement.classList.toggle(
                                            "dark",
                                            theme === "dark"
                                        );
                                    }
                                } catch {}
                            })();
                        `,
                    }}
                />
            </head>

            <body className="min-h-full flex flex-col">
                <NextIntlClientProvider messages={messages}>
                    <ScrollArea scrollFade className="h-dvh max-h-dvh min-h-dvh overflow-hidden">
                        <div className="min-h-screen">
                            <Header />
                            {children}
                        </div>
                        <Footer />
                    </ScrollArea>
                </NextIntlClientProvider>
            </body>

        </html>
    );
}
