"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

import Image from "next/image";

export const HomeTransitionSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {

    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [4, 0]);

    return (
        <motion.section style={{ scale, rotate }} className="relative h-dvh w-full z-10 origin-center">
            <Image src="/images/banner.webp" className="object-cover w-full h-full" alt="" fill priority />
        </motion.section>
    );
};
