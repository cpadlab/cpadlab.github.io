import type { FC } from "react";
import { projects } from "@/assets/content/projects";

export const HomeProjectsSection: FC = () => {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: projects.map((item, index) => ({
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
            <h2 id="projects-heading" className="text-sm uppercase text-muted-foreground font-bold">Projects</h2>

            <ol>
                {projects.map((item, index) => (
                    <li key={index}>
                        <article itemScope itemType="https://schema.org/SoftwareSourceCode">
                            
                            <header className="text-lg">
                                {item.year && (
                                    <time className="text-muted-foreground inline-block" dateTime={String(item.year)} itemProp="dateCreated">{item.year}</time>
                                )}{` `}
                                <h3 className="inline-block" itemProp="name">
                                    <a className="hover:text-primary transition-colors" href={item.url} target="_blank" rel="noopener noreferrer external" aria-label={`${item.name} (opens in new tab)`} itemProp="url">
                                        <b><span className="uppercase">{item.name}</span></b>
                                    </a>
                                </h3>
                            </header>

                            <p className="text-muted-foreground" itemProp="description">{item.description}</p>

                            <nav aria-label={`${item.name} links`} className="flex items-center gap-2">
                                
                                {item.code && (
                                    <a className="hover:text-primary text-muted-foreground transition-colors uppercase" href={item.code} target="_blank" rel="noopener noreferrer external" itemProp="codeRepository">
                                        <span>Source code</span>
                                    </a>
                                )}

                                {item.article && (
                                    <>
                                        <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 2h12v2H6zM4 4h2v18H4zm14 0h2v18h-2zm-2 16h2v2h-2zm-2-2h2v2h-2zm-8 2h2v2H6zm2-2h2v2H8zm2-2h4v2h-4z" />
                                        </svg>
                                        <a className="hover:text-primary text-muted-foreground transition-colors uppercase" href={item.article} target="_blank" rel="noopener noreferrer">
                                            <span>Read article</span>
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