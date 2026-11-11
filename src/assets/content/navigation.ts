import type { Locale } from "next-intl";
import type { NavigationList } from "@/types/navigation";

export const en_navigation: NavigationList = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Blog",
        href: "/blog"
    },
];

export const es_navigation: NavigationList = [
    {
        name: "Inicio",
        href: "/"
    },
    {
        name: "Blog",
        href: "/blog"
    },
];

export const navigation: Record<Locale, NavigationList> = {
    en: en_navigation,
    es: es_navigation,
};
