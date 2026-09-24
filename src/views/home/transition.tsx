"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export const HomeTransitionSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateMedia = () => setIsMobile(window.innerWidth < 768);
        updateMedia();
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, []);

    const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 0.94 : 0.85, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : 4, 0]);

    return (
        <motion.section style={{ scale, rotate }} className="relative h-dvh w-full z-10 origin-center transform-gpu will-change-transform">
            <Image src="/images/banner.webp" className="object-cover w-full h-full" alt="" fill priority />
        </motion.section>
    );
};
