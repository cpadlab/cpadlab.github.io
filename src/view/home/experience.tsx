import { getLocale, getTranslations } from "next-intl/server";
import { experiences } from "@/assets/content/experience";
import { routing } from "@/i18n/routing";
import { parseDatesToIso } from "@/utils/dates";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const HomeExperienceSection = async () => {
    const locale = await getLocale();
    const t = await getTranslations("pages.home.experience");
    const localizedExperiences = experiences[locale] ?? experiences[routing.defaultLocale];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: localizedExperiences.map((item, index) => {

            const [city, country] = item.location.split(", ");
            const { startDate, endDate } = parseDatesToIso(item.dates);

            return {
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "OrganizationRole",
                    roleName: item.job,
                    ...(startDate && { startDate }),
                    ...(endDate && { endDate }),
                    worksFor: {
                        "@type": "Organization",
                        name: item.company,
                        sameAs: item.url,
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: city?.trim(),
                            addressCountry: country?.trim(),
                        },
                    },
                },
            };

        }),
    };

    return (
        <section id="experience" aria-labelledby="experience-heading" className="py-8 space-y-2">

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2 id="experience-heading" className="text-sm uppercase text-muted-foreground font-bold">{t("title")}</h2>

            <ol>
                {localizedExperiences.map((item, index) => (
                    <li key={index}>
                        <article itemScope itemType="https://schema.org/OrganizationRole">

                            <header className="text-lg">
                                <h3 className="inline">
                                    <a href={item.url} target="_blank" className="hover:text-primary transition-colors" rel="noopener noreferrer external" aria-label={t("opens_in_new_tab", { name: item.company })} itemProp="url">
                                        <b><span className="uppercase" itemProp="name">{item.company}</span></b>
                                    </a>
                                </h3>{" "}
                                <span className="text-muted-foreground inline" itemProp="roleName">{item.job}</span>
                            </header>

                            {item.projects && item.projects.length > 0 ? (
                                <Collapsible>
                                    <CollapsibleTrigger render={<button className="group text-muted-foreground hover:text-primary inline-flex flex-wrap items-center gap-x-1.5 text-left transition-colors cursor-pointer" />}>
                                        <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 shrink-0 transition-transform duration-200 group-aria-expanded:rotate-90 group-data-panel-open:rotate-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16 13v-2h-2v2h2Zm-2-2V9h-2v2h2Zm0 4v-2h-2v2h2Zm-2-6V7h-2v2h2Zm0 8v-2h-2v2h2ZM10 7V5H8v2h2Zm0 12v-2H8v2h2Z"/>
                                        </svg>
                                        <span itemProp="addressLocality">{item.location}</span>{" "}
                                        <span>
                                            (<time>{item.dates}</time>)
                                        </span>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-4 border-l-2 ml-1">
                                        <p className="text-sm uppercase text-muted-foreground font-bold">{t("projects_label")}</p>
                                        <ul className="list-disc pl-4">
                                            {item.projects.map((itemproject, indexproject) => (
                                                <li key={indexproject}>
                                                    {itemproject.year && (
                                                        <time className="text-muted-foreground inline-block" dateTime={String(itemproject.year)} itemProp="dateCreated">{itemproject.year}</time>
                                                    )}{` `}
                                                    <h4 className="inline-block" itemProp="name">
                                                        {itemproject.url ? (
                                                            <a className="hover:text-primary transition-colors" href={itemproject.url} target="_blank" rel="noopener noreferrer external" aria-label={t("opens_in_new_tab", { name: itemproject.name })} itemProp="url">
                                                                <b><span className="uppercase">{itemproject.name}</span></b>
                                                            </a>
                                                        ) : (
                                                            <b><span className="uppercase">{itemproject.name}</span></b>
                                                        )}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground" itemProp="description">{itemproject.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <div className="text-muted-foreground">
                                    <span itemProp="addressLocality">{item.location}</span>{" "}
                                    <span>
                                        (<time>{item.dates}</time>)
                                    </span>
                                </div>
                            )}

                        </article>
                    </li>
                ))}
            </ol>

        </section>
    );
};
