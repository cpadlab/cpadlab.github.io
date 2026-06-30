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
    const refs = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = containerRef.current;
        if (!el || refs.current.length === 0) return;
        const anim = gsap.to(refs.current, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
                start: "top 75%",
                end: "bottom 85%",
            },
            opacity: 1,
            ease: "none",
            stagger: 0.1,
        });
        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
            anim.kill();
        };
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
                            "opacity-15",
                            "transition-opacity",
                            "duration-300",
                            word.bold ? "font-bold text-white" : "",
                            word.italic ? "italic text-neutral-300" : ""
                        ].filter(Boolean).join(" ");
                        return (
                            <span key={charIdx} ref={(el) => {if (el && !refs.current.includes(el)) {refs.current.push(el);}}} className={classNames}>
                                {char}
                            </span>
                        );
                    })}
                </span>
            );
        });
    };

    return (
        <section ref={containerRef} className="bg-black pt-24 pb-48 z-20 relative select-none">
            <div className="flex justify-center">
                <div className="grid lg:grid-cols-5 md:grid-cols-2 container lg:px-12 px-8">
                <div /><div /><div />
                <div className="lg:col-span-2 space-y-2 text-white">
                    <p className="text-6xl font-editorial">
                        {/*<span className="opacity-50">01.</span>*/}
                        <span className="font-greatvibes mr-1.5">A</span>bout
                    </p>
                    <div className="text-xl leading-relaxed text-neutral-200">
                        {renderWords()}
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};
