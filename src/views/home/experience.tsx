"use client";

interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    location: string;
    period: string;
    link?: string;
}

const EXPERIENCES: ExperienceItem[] = [
    {
        id: "mantero",
        company: "Mantero Sistemi srl",
        role: "IT Systems Technician",
        location: "Genoa, Italy",
        period: "Mar. 2023 - Jun. 2023",
        link: "https://www.linkedin.com/in/cpadilla10/",
    },
    {
        id: "lealtadis",
        company: "Lealtadis Abogados S.L.P.",
        role: "Head of Technology",
        location: "Almería, Spain",
        period: "Jul. 2025 - Dec. 2025",
        link: "https://www.linkedin.com/in/cpadilla10/",
    },
    {
        id: "trc",
        company: "Grupo TRC",
        role: "SOAR Cybersecurity Analyst",
        location: "Almería, Spain",
        period: "Oct. 2025 - Present",
        link: "https://www.linkedin.com/company/3010528/",
    },
];

export function HomeExperienceSection() {
    return (
        <section className="w-full bg-black pb-20 pt-8 px-4 sm:px-8 md:px-12 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                
                <div className="mb-10 text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-mono">Experience</span>
                </div>

                <div className="relative w-full max-w-4xl mx-auto">
                    
                    <div className="absolute top-[7px] left-[16.666%] right-[16.666%] h-px bg-neutral-800 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 justify-items-center w-full">
                        {EXPERIENCES.map((exp, index) => (
                            <div key={exp.id} className="flex flex-col items-center justify-center text-center group relative w-full max-w-xs">
                                
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative z-10 w-3.5 h-3.5 rounded-full border border-neutral-700 bg-neutral-950 flex items-center justify-center group-hover:border-white transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-white transition-colors" />
                                    </div>
                                </div>

                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-center justify-center overflow-hidden mb-4 transition-all group-hover:border-neutral-600">
                                    <div className="w-full h-full bg-neutral-800/40" />
                                </div>

                                <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-neutral-200 transition-colors">{exp.company}</h3>
                                
                                <p className="text-sm text-neutral-300 font-normal mt-0.5">{exp.role}</p>
                                <p className="text-xs text-neutral-400 mt-1">{exp.location}</p>
                                <p className="text-xs text-neutral-500 mt-1">{exp.period}</p>

                                {index < EXPERIENCES.length - 1 && (
                                    <div className="w-px h-12 bg-neutral-800 my-8 md:hidden" />
                                )}

                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}

export default HomeExperienceSection;
