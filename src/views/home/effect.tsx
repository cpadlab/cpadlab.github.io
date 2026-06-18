"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import { HomeHeroSection } from "./hero";
import { HomeTransitionSection } from "./transition";

export function HomeEffectView() {
    
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main ref={containerRef} className="relative h-[200vh] bg-black">
            <HomeHeroSection scrollYProgress={scrollYProgress} />
            <HomeTransitionSection scrollYProgress={scrollYProgress} />
        </main>
    );
}
