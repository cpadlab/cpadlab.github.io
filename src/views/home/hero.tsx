"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export const HomeHeroSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

    return (
        <motion.section style={{ scale, rotate }} className="sticky top-0 h-dvh w-full flex justify-center items-center overflow-hidden z-0 origin-center bg-black select-none">
            <div className="relative w-full h-full flex flex-col justify-center items-center">

                <video autoPlay playsInline loop muted className="absolute -z-[1] inset-0 h-full w-full object-cover mask-180">
                    <source src="/videos/fire.webm" type="video/webm" />
                    <source src="/videos/fire.mp4" type="video/mp4" />
                </video>

                <h1 className="lg:px-12 px-8 mix-blend-lighten h-dvh justify-center items-center w-full bg-white flex leading-[1.1] flex-col text-center uppercase font-editorial md:text-[75px] sm:text-[50px] text-[30px] text-black">
                    <div>
                        <span><i className="font-greatvibes md:text-[85px] sm:text-[55px] text-[35px] mr-1.5 sm:mr-2 md:mr-3">c</i>arlos </span>
                        <span><i className="font-greatvibes md:text-[85px] sm:text-[55px] text-[35px] mr-1.5 sm:mr-2 md:mr-3">p</i>adilla </span>
                    </div>
                    <div>
                        <span>Currently </span>
                        <span>Building </span>
                    </div>
                    <div>
                        <span className="font-mondwest leading-0 md:text-[90px] sm:text-[60px] text-[37px] font-medium">☼SOAR </span>
                        <span>at </span>
                        <span>@TRC</span>
                    </div>
                    <div>
                        <span>Folio<span className="font-mondwest leading-0 md:text-[90px] sm:text-[60px] text-[37px] font-medium">@</span>2026<span className="font-mondwest leading-0 md:text-[90px] sm:text-[60px] text-[37px] font-medium">☾</span></span>
                    </div>
                </h1>

            </div>
        </motion.section>
    );
};
