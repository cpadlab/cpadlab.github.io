import type { FC } from "react";
import { experiences } from "@/assets/content/experience";
import { parseDatesToIso } from "@/utils/dates";

export const HomeExperienceSection: FC = () => {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: experiences.map((item, index) => {
            
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
            <h2 id="experience-heading" className="text-sm uppercase text-muted-foreground font-bold">Work Experience</h2>

            <ol>
                {experiences.map((item, index) => (
                    <li key={index}>
                        <article itemScope itemType="https://schema.org/OrganizationRole">
                            
                            <header className="text-lg">
                                <h3 className="inline">
                                    <a href={item.url} target="_blank" className="hover:text-primary transition-colors" rel="noopener noreferrer external" aria-label={`${item.company} (opens in new tab)`} itemProp="url">
                                        <b><span className="uppercase" itemProp="name">{item.company}</span></b>
                                    </a>
                                </h3>{" "}
                                <span className="text-muted-foreground inline" itemProp="roleName">{item.job}</span>
                            </header>

                            <div className="text-muted-foreground sm:flex-row flex-col flex sm:items-center gap-y-0 gap-2">
                                <span itemProp="addressLocality">{item.location}</span>{" "}
                                <span><span className="sm:inline hidden">{"("}</span><time>{item.dates}</time><span className="sm:inline hidden">{")"}</span></span>
                            </div>

                        </article>
                    </li>
                ))}
            </ol>

        </section>
    );
};