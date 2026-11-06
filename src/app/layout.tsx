
import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import { cn } from "cn";

import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";

import "./globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import Script from "next/script";

const anonymous_pro = Anonymous_Pro({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-monospace",
});

export const metadata: Metadata = {
    title: "Carlos Padilla | SOAR Developer",
    description: "Portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={cn("h-full antialiased font-monospace", anonymous_pro.variable)}>
            
            <Script id="theme-init" strategy="beforeInteractive">
                {`
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
                `}
            </Script>

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
