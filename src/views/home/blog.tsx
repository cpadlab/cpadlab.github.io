"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogPost } from "@/lib/blog";

export const Card = ({ data, index, total }: { data: Omit<BlogPost, "content">; index: number; total: number }) => {
    return (
        <li className={`relative flex-[0_0_80vw] md:flex-[0_0_45vw] lg:flex-[0_0_28vw] min-w-0 m-0 flex flex-col justify-between h-[360px] lg:h-[420px] p-6 md:p-8 border border-neutral-400 dark:border-neutral-600 ${total !== index + 1 ? "border-r-0" : ""}`}>
            <div>
                <Link title={data.title} href={`/blog/${data.id}`} className="block dark:hover:text-primary hover:text-dark-primary transition-all duration-300">
                    <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-medium line-clamp-3">{data.title}</p>
                </Link>
            </div>
            
            <div className="dark:text-neutral-300 text-neutral-800">
                <div className="mb-4 mt-4 md:mt-6 text-sm gap-4 flex items-center">
                    <span>{data.date}</span>
                    <span className="block w-2 h-2 opacity-50 rounded-full dark:bg-neutral-300 bg-neutral-800" />
                    <span>{data.category}</span>
                </div>
                <div className="mb-4 h-px border-b dark:border-neutral-300 border-neutral-800" />
                <p className="line-clamp-2">{data.description}</p>
            </div>
        </li>
    );
};

export const HomeBlogSection = ({ posts = [] }: { posts?: Omit<BlogPost, "content">[] }) => {
    
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  const displayPosts = posts.slice(0, 5);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        const getScrollAmount = () => {
        const containerWidth = container.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(containerWidth - windowWidth);
        };

        const anim = gsap.to(container, {
            x: () => getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: true,
                start: "top top",
                end: () => `+=${container.scrollWidth - window.innerWidth}`,
                invalidateOnRefresh: true,
            },
        });

        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
            anim.kill();
        };

    }, []);

    return (
        <section ref={sectionRef} className="relative bg-black z-20 pt-4 pb-48 overflow-hidden">
            <div className="h-dhv w-full flex flex-col justify-center pt-20">
            
                <div className="max-w-6xl mx-auto w-full px-8 lg:px-12 mb-6 md:mb-8 flex flex-col items-start">
                    <p className="text-6xl font-editorial">
                        <span className="opacity-50">02.</span>{" "}
                        <span className="font-greatvibes mr-1.5">B</span>log
                    </p>
                </div>
        
                <div className="w-full overflow-hidden">
                    <ul ref={containerRef} className="flex flex-row w-fit m-0 p-0 list-none pl-[10vw] pr-[10vw] md:pl-[12vw] md:pr-[12vw] lg:pl-[calc((100vw-1152px)/2+3rem)] lg:pr-[calc((100vw-1152px)/2+3rem)]"style={{ willChange: "transform" }}>
                        {displayPosts.map((post, idx) => (
                            <Card key={post.id} data={post} index={idx} total={displayPosts.length} />
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};
