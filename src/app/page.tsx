import HomeAboutSection from "@/view/home/about";
import HomeBlogSection from "@/view/home/blog";
import { HomeExperienceSection } from "@/view/home/experience";
import HomeHeroSection from "@/view/home/hero";
import { HomeProjectsSection } from "@/view/home/projects";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: {
        absolute: "Carlos Padilla | SOAR Developer",
    },
    description: "SOAR Developer specializing in cybersecurity automation, software development and security engineering. Explore my projects and technical articles.",
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
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
