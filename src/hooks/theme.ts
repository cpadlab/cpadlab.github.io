
"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export const useTheme = () => {
    const [theme, setThemeState] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    const setTheme = useCallback((nextTheme: Theme) => {
        document.documentElement.classList.toggle(
            "dark",
            nextTheme === "dark",
        );

        localStorage.setItem(STORAGE_KEY, nextTheme);
        setThemeState(nextTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
    }, [theme, setTheme]);

    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY);

        const initialTheme: Theme =
            storedTheme === "dark" || storedTheme === "light"
                ? storedTheme
                : document.documentElement.classList.contains("dark")
                    ? "dark"
                    : "light";

        setThemeState(initialTheme);
        document.documentElement.classList.toggle(
            "dark",
            initialTheme === "dark",
        );

        setMounted(true);

        const observer = new MutationObserver(() => {
            const isDark =
                document.documentElement.classList.contains("dark");

            setThemeState(isDark ? "dark" : "light");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return {
        theme,
        isDark: theme === "dark",
        mounted,
        setTheme,
        toggleTheme,
    };
};
