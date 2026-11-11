import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);

export function getAlternateLanguages(href: string) {
    return Object.fromEntries(
        routing.locales.map((locale) => [locale, getPathname({ locale, href })]),
    );
}
