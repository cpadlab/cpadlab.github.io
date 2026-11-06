import { ScrollArea } from "@/components/ui/scroll-area";
import HomeAboutSection from "@/view/home/about";
import HomeBlogSection from "@/view/home/blog";
import { HomeExperienceSection } from "@/view/home/experience";
import HomeHeroSection from "@/view/home/hero";
import { HomeProjectsSection } from "@/view/home/projects";

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
