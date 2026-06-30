import { HomeAboutSection } from "@/views/home/about";
import { HomeViewEffect } from "@/views/home/view";
import { StickyFooter } from "@/views/sticky-footer";
import { getAllPosts } from "@/lib/blog";

export default function Page() {
    
    return (
        <main className="bg-black text-white min-h-dvh">
            <HomeViewEffect />
            <HomeAboutSection />
            <StickyFooter />
        </main>
    );
}
