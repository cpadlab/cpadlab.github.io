import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "cn";

import enMessages from "@/assets/locales/en.json";
import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";
import { ScrollArea } from "@/components/ui/scroll-area";

import "./[locale]/globals.css";

const anonymous_pro = Anonymous_Pro({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-monospace",
});

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
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
                <NextIntlClientProvider locale="en" messages={enMessages} formats={{}} now={new Date(0)} timeZone="Europe/Madrid">
                    <ScrollArea scrollFade className="h-dvh max-h-dvh min-h-dvh overflow-hidden">
                        <Header />
                        <main className="md:max-w-4xl max-w-xl space-y-2 mx-auto px-8 w-full">

                            <h1 className="capitalize text-2xl font-bold">404: Lost in the code.</h1>

                            <ul className="text-sm text-muted-foreground">
                                <li>{">"} Searching for requested resource...</li>
                                <li>{">"} Resource not found.</li>
                                <li>{">"} Status: 404</li>
                            </ul>

                            <p className="capitalize text-muted-foreground">It looks like you&apos;ve reached a dead end. But don&apos;t worry—there&apos;s still plenty of code to explore.</p>

                            <Link href="/" className="text-sm uppercase hover:text-primary transition-colors text-muted-foreground flex items-center gap-2">
                                <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 -rotate-135" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 4h8v2h-8zM16 6h4v2h-4zM14 8h2v2h-2zM18 8h2v4h-2zM12 10h2v2h-2zM10 12h2v2h-2zM8 14h2v2h-2zM6 16h2v2h-2zM4 18h2v2h-2z" />
                                </svg>
                                <b>Let&apos;s keep exploring</b>
                            </Link>

                        </main>
                        <Footer />
                    </ScrollArea>
                </NextIntlClientProvider>
            </body>

        </html>
    );
}
