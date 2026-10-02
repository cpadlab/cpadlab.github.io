"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
    
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        if (!isDesktop) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenis.on("scroll", ScrollTrigger.update);

        const updateTicker = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(updateTicker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateTicker);
            lenis.destroy();
        };
    }, []);

    return null;
    
}
