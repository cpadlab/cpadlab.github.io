"use client";

import { useEffect, useState, type FC } from "react";
import { useLocale, useTranslations } from "next-intl";
import { navigation } from "@/assets/content/navigation";
import { socialMediaLinks } from "@/assets/content/social-media";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const Footer: FC = () => {
    const locale = useLocale();
    const t = useTranslations("components.footer");
    const navItems = navigation[locale] ?? navigation[routing.defaultLocale];

    const [madridTime, setMadridTime] = useState<string>("");
    const [currentYear, setCurrentYear] = useState<number | null>(null);
    const [currentDateTime, setCurrentDateTime] = useState<string>("");

    useEffect(() => {

        const updateTime = () => {

            const now = new Date();

            setCurrentYear(now.getFullYear());

            setMadridTime(
                now.toLocaleTimeString("en-GB", {
                    timeZone: "Europe/Madrid",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZoneName: "short",
                })
            );

            setCurrentDateTime(
                new Intl.DateTimeFormat("en-CA", {
                    timeZone: "Europe/Madrid",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }).format(now)
            );

        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);

    }, []);


    const sameAsProfiles = socialMediaLinks.filter((item) => item.type === "link").map((item) => item.url);

    const emailItem = socialMediaLinks.find((item) => item.type === "email");
    const rawEmail = emailItem ? emailItem.url.replace("mailto:", "") : undefined;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Carlos Padilla",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://cpadlab.github.io",
        sameAs: sameAsProfiles,
        ...(rawEmail && { email: rawEmail }),
        address: {
            "@type": "PostalAddress",
            addressLocality: "Almería",
            addressRegion: "Andalucía",
            addressCountry: "ES",
        },
    };


    return (
        <footer className="pt-8 md:max-w-4xl max-w-xl mx-auto px-8 w-full sm:pb-20 pb-8">

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav aria-label={t("main_navigation")}>
                <ul className="flex items-center uppercase gap-2">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link className="hover:text-primary transition-colors" href={item.href}>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <nav aria-label={t("social_navigation")}>
                <ul className="flex items-center uppercase flex-wrap gap-y-0 gap-2">
                    {socialMediaLinks.map((item) => {
                        const isEmail = item.type === "email";
                        return (
                            <li key={item.name}>
                                <a className="hover:text-primary transition-colors" href={item.url} {...(!isEmail && {target: "_blank", rel: "noopener noreferrer external me"})} aria-label={isEmail ? `${item.name} (${item.url.replace("mailto:", "")})` : t("opens_in_new_tab", { name: item.name })}>
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="text-muted-foreground">
                <p>
                    {t("based_in")}{" "}
                    <time dateTime={currentDateTime} suppressHydrationWarning>{madridTime || "--:--:-- CET"}</time>
                </p>
                <p>© {currentYear} Carlos Padilla.{" "} {t("rights")}</p>
            </div>

        </footer>
    );
};

export default Footer;
