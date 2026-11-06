
import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import { cn } from "cn";

import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";

import "./globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";

const anonymous_pro = Anonymous_Pro({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-monospace",
});

const siteUrl = "https://cpadlab.github.io";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: "Carlos Padilla | Frontend Developer",
        template: "%s | Carlos Padilla",
    },
    description: "Portfolio of Carlos Padilla, a full-stack SOAR developer specializing in Python, React, Next.js, TypeScript, and Angular.",
    applicationName: "Carlos Padilla Portfolio",
    authors: [
        {
            name: "Carlos Padilla",
            url: siteUrl,
        },
    ],

    creator: "Carlos Padilla",

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        type: "website",
        locale: "es_ES",
        url: siteUrl,
        siteName: "Carlos Padilla Portfolio",
        title: "Carlos Padilla | SOAR Developer",
        description: "Portfolio of Carlos Padilla, a full-stack SOAR developer specializing in Python, React, Next.js, TypeScript, and Angular",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={cn("h-full antialiased font-monospace", anonymous_pro.variable)} suppressHydrationWarning>
            
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
                <ScrollArea className="h-dvh max-h-dvh min-h-dvh overflow-hidden">
                    <Header />
                    {children}
                    <Footer />
                </ScrollArea>
            </body>

        </html>
    );
}


