"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { HomeHeroSection } from "./hero";
import { HomeTransitionSection } from "./transition";

export function HomeViewEffect() {
    
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-black">
            <HomeHeroSection scrollYProgress={scrollYProgress} />
            <HomeTransitionSection scrollYProgress={scrollYProgress} />
        </div>
    );
}
