import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Cursor } from "@/components/cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";
import Header from "@/components/header";

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
    metadataBase: new URL("https://cpadlab.github.io"),
    title: {
        default: "Carlos Padilla | Software Developer, Cybersecurity & Engineering Blog",
        template: "%s | Carlos Padilla"
    },
    description: "Software developer focused on full-stack development, cybersecurity and automation. Explore my engineering blog, technical projects and professional experience.",
    keywords: [ 
        "Carlos Padilla", "cpadlab", "portfolio", "personal website", "full stack developer", "frontend developer", 
        "security engineer", "web designer", "creative portfolio", "Almería", "Spain", "cybersecurity", "pentesting", 
        "ethical hacking", "tryhackme", "thm", "ctf", "thm writeups", "thm rooms", "writeups", "soar", "incident response", 
        "security engineering", "automated soar playbooks", "keylogger development", "php web shell", "fnmt certificate crack", 
        "eJPT", "OSCP", "nextjs", "react", "tailwind", "tailwindcss", "typescript", "javascript", "python", "docker", "gsap", 
        "scrolltrigger", "framer motion", "lenis scroll", "smooth scrolling", "static export", "adventjs", "midudev", 
        "adventjs solutions"
    ],
    authors: [{ name: "Carlos Padilla" }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "/",
        types: {
            "application/rss+xml": "https://cpadlab.github.io/rss.xml",
        },
    },
    openGraph: {
        title: "Carlos Padilla | Software Developer, Cybersecurity & Engineering Blog",
        description: "Software developer focused on full-stack development, cybersecurity and automation. Explore my engineering blog, technical projects and professional experience.",
        url: "https://cpadlab.github.io",
        siteName: "Carlos Padilla",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/images/banner.webp",
                width: 1200,
                height: 630,
                alt: "Carlos Padilla Portfolio",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Carlos Padilla | Software Developer, Cybersecurity & Engineering Blog",
        description: "Software developer focused on full-stack development, cybersecurity and automation. Explore my engineering blog, technical projects and professional experience.",
        images: ["/images/banner.webp"],
        creator: "@cpadlab",
    }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={`${EditorialFont.variable} ${GreatVibesFont.variable} ${MondwestFont.variable} ${interFont.variable}`}>
            <body className="flex flex-col font-sans antialiased">
                <Header />
                <SmoothScroll />
                <Cursor />
                {children}
            </body>
        </html>
    );
}
