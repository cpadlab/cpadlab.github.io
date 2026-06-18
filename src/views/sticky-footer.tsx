"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const StickyFooter = () => {
    
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

    return (
        <div className="relative h-[450px] bg-black select-none z-0" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
            <div className="fixed bottom-0 h-[450px] w-full bg-neutral-950 text-neutral-400 font-sans border-t border-neutral-900 px-8 md:px-12 py-12 flex flex-col justify-between">
        
                <div className="flex flex-col">
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
                    <div className="mt-4 flex flex-col">
                        <p className="text-sm">Based in Almería, Spain — {time || "00:00:00 UTC"}</p>
                        <p className="text-sm">© {new Date().getFullYear()} Carlos Padilla. All rights reserved.</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-6xl sm:text-[8.5vw] font-editorial uppercase text-white select-none w-full text-left">
                        <span><i className="font-greatvibes mr-3 sm:mr-6 italic">C</i>arlos </span>
                        <span><i className="font-greatvibes mr-3 sm:mr-6 italic">P</i>adilla </span>
                    </h2>
                </div>

            </div>
        </div>
    );
};
