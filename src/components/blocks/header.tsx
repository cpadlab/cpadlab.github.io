"use client"

import type { FC } from "react";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "cn";
import { navigation } from "@/assets/content/navigation";
import { getPathname, Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import AnimatedThemeToggler from "./theme";

export const Header: FC = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations("components.header");
    const navItems = navigation[locale] ?? navigation[routing.defaultLocale];
    const targetPathname = pathname === "/_not-found" ? "/" : pathname;
    const enHref = getPathname({ locale: "en", href: targetPathname });
    const esHref = getPathname({ locale: "es", href: targetPathname });

    return (
        <header aria-label={t("site_header")} className="sm:mt-20 z-9999999 mt-8 md:max-w-4xl max-w-xl mx-auto w-full flex items-center justify-between px-8 sticky top-4">

            <nav aria-label={t("main_navigation")}>
                <ul className="flex items-center gap-4 uppercase">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link className="hover:text-primary transition-colors" href={item.href}>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex items-center gap-4">
                <nav aria-label={t("language_switcher")} className="flex items-center gap-2 uppercase text-sm">
                    <NextLink href={enHref} hrefLang="en" aria-label={t("switch_to_en")} aria-current={locale === "en" ? "page" : undefined} className={cn("transition-colors hover:text-primary", locale === "en" ? "text-primary font-bold" : "text-muted-foreground")}>
                        <span>EN</span>
                    </NextLink>
                    <span className="text-muted-foreground" aria-hidden="true">/</span>
                    <NextLink href={esHref} hrefLang="es" aria-label={t("switch_to_es")} aria-current={locale === "es" ? "page" : undefined} className={cn("transition-colors hover:text-primary", locale === "es" ? "text-primary font-bold" : "text-muted-foreground")}>
                        <span>ES</span>
                    </NextLink>
                </nav>

                <AnimatedThemeToggler />
            </div>

        </header>
    );
};

export default Header;
