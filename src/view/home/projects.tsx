import { getLocale, getTranslations } from "next-intl/server";
import { projects } from "@/assets/content/projects";
import { routing } from "@/i18n/routing";

export const HomeProjectsSection = async () => {
    
    const locale = await getLocale();
    const t = await getTranslations("pages.home.projects");
    const localizedProjects = projects[locale] ?? projects[routing.defaultLocale];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: localizedProjects.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareSourceCode",
                name: item.name,
                description: item.description,
                dateCreated: item.year ? String(item.year) : undefined,
                codeRepository: item.url,
                url: item.url,
            },
        })),
    };

    return (
        <section id="projects" aria-labelledby="projects-heading" className="py-8 space-y-2">

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2 id="projects-heading" className="text-sm uppercase text-muted-foreground font-bold">{t("title")}</h2>

            <ol>
                {localizedProjects.map((item, index) => (
                    <li key={index}>
                        <article itemScope itemType="https://schema.org/SoftwareSourceCode">

                            <header className="text-lg">
                                {item.year && (
                                    <time className="text-muted-foreground inline-block" dateTime={String(item.year)} itemProp="dateCreated">{item.year}</time>
                                )}{` `}
                                <h3 className="inline-block" itemProp="name">
                                    {item.url ? (
                                        <a className="hover:text-primary transition-colors" href={item.url} target="_blank" rel="noopener noreferrer external" aria-label={t("opens_in_new_tab", { name: item.name })} itemProp="url">
                                            <b><span className="uppercase">{item.name}</span></b>
                                        </a>
                                    ) : <b><span className="uppercase">{item.name}</span></b>}
                                </h3>
                            </header>

                            <p className="text-muted-foreground" itemProp="description">{item.description}</p>

                            <nav aria-label={t("links_label", { name: item.name })} className="flex items-center gap-2">

                                {item.code && (
                                    <a className="hover:text-primary text-muted-foreground transition-colors uppercase" href={item.code} target="_blank" rel="noopener noreferrer external" itemProp="codeRepository">
                                        <span>{t("source_code")}</span>
                                    </a>
                                )}

                                {item.article && (
                                    <>
                                        <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 2h12v2H6zM4 4h2v18H4zm14 0h2v18h-2zm-2 16h2v2h-2zm-2-2h2v2h-2zm-8 2h2v2H6zm2-2h2v2H8zm2-2h4v2h-4z" />
                                        </svg>
                                        <a className="hover:text-primary text-muted-foreground transition-colors uppercase" href={item.article} target="_blank" rel="noopener noreferrer">
                                            <span>{t("read_article")}</span>
                                        </a>
                                    </>
                                )}

                            </nav>

                        </article>
                    </li>
                ))}
            </ol>

        </section>
    );
};
