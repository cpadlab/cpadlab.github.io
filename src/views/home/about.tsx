export const HomeAboutSection = () => {
    return (
        <section id="about" className="bg-black pt-20 sm:pt-24 z-20 relative select-none">
            <div className="flex justify-center">
                <div className="grid container lg:px-12 px-6 sm:px-8">
                    <div className="lg:col-span-2 space-y-4 text-white">
                        <p className="text-5xl sm:text-6xl font-editorial text-center">
                            <span className="font-greatvibes mr-1.5">A</span>bout
                        </p>
                        <p className="text-base text-center sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed text-neutral-200 font-light">
                            I am <strong className="font-bold text-white">Carlos Padilla</strong>, a developer passionate about creating{" "}
                            <strong className="font-bold text-white">end-to-end solutions</strong>, from meticulously crafted{" "}
                            <em className="italic text-neutral-300">frontend designs</em> to robust{" "}
                            <em className="italic text-neutral-300">backend architectures</em>. With a technical foundation built on systems and cross-platform development, and about to take the leap into{" "}
                            <strong className="font-bold text-white">Software Engineering</strong>, my career is defined by a constant pursuit of efficiency. From my early international experiences in Genoa to leading the digitalization of processes within Almería&apos;s legal sector, I have naturally transitioned into{" "}
                            <strong className="font-bold text-white">cybersecurity</strong>. Today, as a{" "}
                            <strong className="font-bold text-white">SOAR Developer at Grupo TRC</strong>, I build critical automations that optimize incident response, combining my development expertise with an{" "}
                            <em className="italic text-neutral-300">offensive mindset</em> backed by my{" "}
                            <strong className="font-bold text-white">eJPT certification</strong>.
                        </p>
                    </div>
                    <div className="hidden lg:block col-span-3" />
                </div>
            </div>
        </section>
    );
};

export default HomeAboutSection;
