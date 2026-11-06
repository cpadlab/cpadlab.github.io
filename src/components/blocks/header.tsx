"use client"

import type { FC } from "react";
import Link from "next/link";
import { navigation } from "@/assets/content/navigation";
import AnimatedThemeToggler from "./theme";

export const Header: FC = () => {

    return (
        <header aria-label="Site header" className="sm:mt-20 mt-8 md:max-w-4xl max-w-xl mx-auto w-full flex items-center justify-between px-8 sticky top-4">
            
            <nav aria-label="Main navigation">
                <ul className="flex items-center gap-4 uppercase">
                    {navigation.map((item, index) => (
                        <li key={index}>
                            <Link className="hover:text-primary transition-colors" href={item.href}>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <AnimatedThemeToggler />

        </header>
    );
};

export default Header;