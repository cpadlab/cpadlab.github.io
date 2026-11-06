import type { FC } from "react";
import { about } from "@/assets/content/about";

export const HomeAboutSection: FC = () => {
  
    return (
        <section id="about" aria-labelledby="about-heading" className="pb-8">
            <p className="capitalize text-muted-foreground">{about.headline}</p>
            {about.subtext && <p>{about.subtext}</p>}
        </section>
    );
};

export default HomeAboutSection;