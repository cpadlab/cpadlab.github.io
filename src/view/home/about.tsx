import type { FC } from "react";
import { about } from "@/assets/content/about";

export const HomeAboutSection: FC = () => {
  
    return (
        <section id="about" aria-labelledby="about-heading" className="pb-8">
            <h2 className="capitalize text-muted-foreground">{about.headline}</h2>
            {about.subtext && <p>{about.subtext}</p>}
        </section>
    );
};

export default HomeAboutSection;