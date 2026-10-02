"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChromeDino } from "@/components/chrome-dino";

export const StickyFooter = () => {
    
    const containerRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZoneName: "short",
                })
            );
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.code === "Space" || e.key === " " || e.key === "ArrowUp") && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    e.preventDefault();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown, { passive: false });
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div ref={containerRef} className="relative flex flex-col justify-end h-dvh bg-neutral-900 select-none z-0" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
            <div className="fixed bottom-0 w-full bg-neutral-900 text-neutral-400 font-sans border-t pt-20 border-neutral-800 py-8 flex flex-col justify-end gap-12">

                <div className="px-4 md:px-12 text-center">
                    <h2 className="text-6xl sm:text-[8.5vw] font-editorial uppercase text-white select-none w-full">
                        <span><i className="font-greatvibes mr-3 sm:mr-6 italic">C</i>arlos </span>
                        <span><i className="font-greatvibes mr-3 sm:mr-6 italic">P</i>adilla </span>
                    </h2>
                </div>

                <div className="mt-auto flex flex-col">
                    
                    <div className="w-full mt-2">
                        <ChromeDino />
                    </div>
                </div>

                <div className="flex px-4 md:px-12 flex-col">
                    <div className="flex gap-2 text-sm justify-center flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors">
                            <span>Home</span>
                        </Link>
                        <Link href="/blog" className="hover:text-white transition-colors">
                            <span>Blog</span>
                        </Link>
                        <a href="mailto:cpadlab@proton.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <span>Contact</span>
                        </a>
                        <a href="https://es.linkedin.com/in/cpadilla10" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <span>LinkedIn</span>
                        </a>
                    </div>
                    <div className="md:flex hidden flex-col justify-center items-center">
                        <p className="text-center text-sm">Based in Almería, Spain — {time || "00:00:00 UTC"}</p>
                        <p className="text-center text-sm">© {new Date().getFullYear()} Carlos Padilla. All rights reserved.</p>
                    </div>
                    <p className="text-center md:hidden block text-sm">Based in Almería, Spain — {time || "00:00:00 UTC"} © {new Date().getFullYear()} Carlos Padilla. All rights reserved.</p>
                </div>

            </div>
        </div>
    );
};
