import { getLocale } from "next-intl/server";
import { about } from "@/assets/content/about";
import { routing } from "@/i18n/routing";

export const HomeAboutSection = async () => {
    const locale = await getLocale();
    const content = about[locale] ?? about[routing.defaultLocale];

    return (
        <section id="about" aria-labelledby="about-heading" className="pb-8">
            <h2 className="capitalize text-muted-foreground">{content.headline}</h2>
            {content.subtext && <p>{content.subtext}</p>}
        </section>
    );
};

export default HomeAboutSection;
