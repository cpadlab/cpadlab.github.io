import type { Locale } from "next-intl";
import type { AboutContent } from "@/types/about";

export const en_about: AboutContent = {
    headline: "i build software, automate the tedious stuff, and break things along the way. Currently hacking away on dev and security automations at TRC.",
};

export const es_about: AboutContent = {
    headline: "construyo software, automatizo lo tedioso y rompo cosas por el camino. Actualmente desarrollando automatizaciones de desarrollo y seguridad en TRC.",
};

export const about: Record<Locale, AboutContent> = {
    en: en_about,
    es: es_about,
};
