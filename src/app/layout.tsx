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
    title: "Carlos Padilla | Creative Portfolio & Blog",                                                                                             
    description: "Portfolio and blog by Carlos Padilla. Showcasing full-stack development, automation, cybersecurity, pentesting, writeups, and high-performance web applications.",
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
