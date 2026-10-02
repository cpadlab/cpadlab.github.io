import { HomeAboutSection } from "@/views/home/about";
import HomeDotsSection from "@/views/home/dots";
import HomeExperienceSection from "@/views/home/experience";
import { HomeViewEffect } from "@/views/home/view";
import { StickyFooter } from "@/views/sticky-footer";

export default function Page() {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Carlos Padilla",
        "url": "https://cpadlab.github.io",
        "sameAs": [
            "https://es.linkedin.com/in/cpadilla10",
            "https://github.com/cpadlab"
        ],
        "jobTitle": "SOAR Developer & Security Engineer",
        "worksFor": {
            "@type": "Organization",
            "name": "Grupo TRC"
        },
        "description": "Software developer focused on full-stack development, cybersecurity and automation. Explore my engineering blog, technical projects and professional experience.",
        "image": "https://cpadlab.github.io/images/banner.webp"
    };

    return (
        <main className="bg-black text-white min-h-dvh">

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <HomeViewEffect />
            <HomeAboutSection />
            <HomeExperienceSection />
            <HomeDotsSection />
            <StickyFooter />
            
        </main>
    );
}
