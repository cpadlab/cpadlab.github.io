import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Cursor } from "@/components/cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const interFont = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const EditorialFont = localFont({
    src: "../assets/fonts/editorial-new.otf",
    variable: "--font-editorial",
    display: "swap",
});

const GreatVibesFont = localFont({
    src: "../assets/fonts/great-vibes.ttf",
    variable: "--font-great-vibes",
    display: "swap",
});

const MondwestFont = localFont({
    src: "../assets/fonts/mondwest-regular.otf",
    variable: "--font-mondwest",
    display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
    title: "Creative Portfolio | Full Stack Developer",
    description: "Premium digital portfolio showcasing full-stack projects, responsive design, and high-performance applications.",
    keywords: ["portfolio", "developer", "nextjs", "react", "tailwind", "web designer", "static export"],
    authors: [{ name: "Developer" }],
    robots: "index, follow",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={`${EditorialFont.variable} ${GreatVibesFont.variable} ${MondwestFont.variable} ${interFont.variable} scroll-smooth`}>
            <body className="flex flex-col font-sans antialiased">
                <SmoothScroll />
                <Cursor />
                {children}
            </body>
        </html>
    );
}
