"use client";

import { useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { flushSync } from "react-dom";
import { cn } from "cn";
import { useTheme } from "@/hooks/theme"

type AnimatedThemeTogglerProps = {
    className?: string;
};

type ViewTransitionDocument = Document & {
    startViewTransition?: (
        callback: () => void,
    ) => {
        ready: Promise<void>;
    };
};

export const AnimatedThemeToggler = ({ className }: AnimatedThemeTogglerProps) => {
    
    const buttonRef = useRef<HTMLButtonElement>(null);

    const {
        isDark,
        mounted,
        setTheme,
    } = useTheme();

    const onToggle = useCallback(async () => {
        
        const button = buttonRef.current;
        if (!button) return;

        const nextTheme = isDark ? "light" : "dark";

        const updateTheme = () => {
            setTheme(nextTheme);
        };

        const doc = document as ViewTransitionDocument;

        if (
            !doc.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            updateTheme();
            return;
        }

        const transition = doc.startViewTransition(() => {
            flushSync(updateTheme);
        });

        await transition.ready;

        const {
            left,
            top,
            width,
            height,
        } = button.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const maxDistance = Math.hypot(
            Math.max(centerX, window.innerWidth - centerX),
            Math.max(centerY, window.innerHeight - centerY),
        );

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${centerX}px ${centerY}px)`,
                    `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
                ],
            },
            {
                duration: 700,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            },
        );

    }, [isDark, setTheme]);

    if (!mounted) {
        return (
            <button type="button" disabled aria-label="Toggle theme" className={cn("flex size-9 items-center justify-center rounded-full", className)} />
        );
    }

    return (
        <button ref={buttonRef} type="button" onClick={onToggle} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={isDark} className={cn("flex items-center justify-center", "cursor-pointer transition-colors", "hover:text-primary", "focus-visible:outline-none focus-visible:ring-0", "focus-visible:ring-0", className )}>
            <AnimatePresence mode="wait" initial={false}>
                
                <motion.span key={isDark ? "sun" : "moon"} initial={{ opacity: 0, scale: 0.55, rotate: isDark ? 25 : -25 }} animate={{ opacity: 1, scale: 1, rotate: 0, }} exit={{ opacity: 0, scale: 0.55, }} transition={{ duration: 0.33, ease: "easeOut", }} className="flex items-center justify-center">
                    {isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                            <path d="M13 22h-2v-3h2v3Zm-6-3H5v-2h2v2Zm12 0h-2v-2h2v2Zm-4-2H9v-2h6v2Zm-6-2H7V9h2v6Zm8 0h-2V9h2v6ZM5 13H2v-2h3v2Zm17 0h-3v-2h3v2Zm-7-4H9V7h6v2ZM7 7H5V5h2v2Zm12 0h-2V5h2v2Zm-6-2h-2V2h2v3Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                            <path d="M18 22H8v-2h10v2ZM8 20H6v-2h2v2Zm12 0h-2v-2h2v2ZM6 18H4v-2h2v2Zm16 0h-2v-4h-2v-2h2v-2h2v8ZM4 16H2V6h2v10Zm14 0h-6v-2h6v2Zm-6-2h-2v-2h2v2Zm-2-2H8V6h2v6ZM6 6H4V4h2v2Zm8-2h-2v2h-2V4H6V2h8v2Z" />
                        </svg>
                    )}
                </motion.span>

            </AnimatePresence>
        </button>
    );
};

export default AnimatedThemeToggler;
