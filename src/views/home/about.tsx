"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WordItem {
    text: string;
    bold?: boolean;
    italic?: boolean;
}

export const HomeAboutSection = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(max-width: 767px)", () => {
                gsap.to(".about-char", {
                    scrollTrigger: {
                        trigger: textRef.current,
                        scrub: 0.5,
                        start: "top 80%",
                        end: "bottom 60%",
                    },
                    opacity: 1,
                    ease: "none",
                    stagger: {
                        amount: 0.8,
                    },
                });
            });

            mm.add("(min-width: 768px)", () => {
                gsap.to(".about-char", {
                    scrollTrigger: {
                        trigger: textRef.current,
                        scrub: 0.5,
                        start: "top 75%",
                        end: "bottom 65%",
                    },
                    opacity: 1,
                    ease: "none",
                    stagger: {
                        amount: 1,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const wordsList: WordItem[] = [
        { text: "I" },
        { text: "am" },
        { text: "Carlos", bold: true },
        { text: "Padilla,", bold: true },
        { text: "a" },
        { text: "developer" },
        { text: "passionate" },
        { text: "about" },
        { text: "creating" },
        { text: "end-to-end", bold: true },
        { text: "solutions,", bold: true },
        { text: "from" },
        { text: "meticulously" },
        { text: "crafted" },
        { text: "frontend", italic: true },
        { text: "designs", italic: true },
        { text: "to" },
        { text: "robust" },
        { text: "backend", italic: true },
        { text: "architectures.", italic: true },
        { text: "With" },
        { text: "a" },
        { text: "technical" },
        { text: "foundation" },
        { text: "built" },
        { text: "on" },
        { text: "systems" },
        { text: "and" },
        { text: "cross-platform" },
        { text: "development," },
        { text: "and" },
        { text: "about" },
        { text: "to" },
        { text: "take" },
        { text: "the" },
        { text: "leap" },
        { text: "into" },
        { text: "Software", bold: true },
        { text: "Engineering,", bold: true },
        { text: "my" },
        { text: "career" },
        { text: "is" },
        { text: "defined" },
        { text: "by" },
        { text: "a" },
        { text: "constant" },
        { text: "pursuit" },
        { text: "of" },
        { text: "efficiency." },
        { text: "From" },
        { text: "my" },
        { text: "early" },
        { text: "international" },
        { text: "experiences" },
        { text: "in" },
        { text: "Genoa" },
        { text: "to" },
        { text: "leading" },
        { text: "the" },
        { text: "digitalization" },
        { text: "of" },
        { text: "processes" },
        { text: "within" },
        { text: "Almería's" },
        { text: "legal" },
        { text: "sector," },
        { text: "I" },
        { text: "have" },
        { text: "naturally" },
        { text: "transitioned" },
        { text: "into" },
        { text: "cybersecurity.", bold: true },
        { text: "Today," },
        { text: "as" },
        { text: "a" },
        { text: "SOAR", bold: true },
        { text: "Developer", bold: true },
        { text: "at" },
        { text: "Grupo", bold: true },
        { text: "TRC,", bold: true },
        { text: "I" },
        { text: "build" },
        { text: "critical" },
        { text: "automations" },
        { text: "that" },
        { text: "optimize" },
        { text: "incident" },
        { text: "response," },
        { text: "combining" },
        { text: "my" },
        { text: "development" },
        { text: "expertise" },
        { text: "with" },
        { text: "an" },
        { text: "offensive", italic: true },
        { text: "mindset", italic: true },
        { text: "backed" },
        { text: "by" },
        { text: "my" },
        { text: "eJPT", bold: true },
        { text: "certification.", bold: true }
    ];

    const renderWords = () => {
        return wordsList.map((word, wordIdx) => {
            return (
                <span key={wordIdx} className="inline-block whitespace-nowrap mr-1.5">
                    {word.text.split("").map((char, charIdx) => {
                        const classNames = [
                            "about-char", "opacity-20", "will-change-[opacity]", word.bold ? "font-bold text-white" : "", word.italic ? "italic text-neutral-300" : ""
                        ].filter(Boolean).join(" ");
                        return (
                            <span key={charIdx} className={classNames}>
                                {char}
                            </span>
                        );
                    })}
                </span>
            );
        });
    };

    return (
        <section id="about" ref={containerRef} className="bg-black pt-20 sm:pt-24 pb-32 sm:pb-48 z-20 relative select-none">
            <div className="flex justify-center">
                <div className="grid lg:grid-cols-5 md:grid-cols-2 container lg:px-12 px-6 sm:px-8">
                    <div className="hidden lg:block" />
                    <div className="hidden lg:block" />
                    <div className="hidden lg:block" />
                    <div className="lg:col-span-2 space-y-4 text-white">
                        <p className="text-5xl sm:text-6xl font-editorial">
                            {/*<span className="opacity-50">01.</span>*/}
                            <span className="font-greatvibes mr-1.5">A</span>bout
                        </p>
                        <div ref={textRef} className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed text-neutral-200">
                            {renderWords()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
