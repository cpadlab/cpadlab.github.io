interface BlogHeaderProps {
    totalPosts?: number;
}

export function BlogHeader({ totalPosts }: BlogHeaderProps) {
    return (
        <div className="mb-10 sm:mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-neutral-800/80">
                <div>
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-editorial tracking-tight text-white select-none">
                        <span className="font-greatvibes mr-2">B</span>log
                    </h1>
                    <p className="text-neutral-400 mt-3 max-w-xl text-base sm:text-lg font-sans leading-relaxed">
                        Articles, tutorials, and walkthroughs about systems, automation, full-stack development, and cybersecurity.
                    </p>
                </div>
                {totalPosts !== undefined && (
                    <div className="flex items-center gap-3 self-start md:self-end">
                        <span className="text-xs font-mondwest uppercase text-neutral-400 bg-neutral-900/80 px-3.5 py-1.5 border border-neutral-800">
                            {totalPosts} {totalPosts === 1 ? "ARTICLE" : "ARTICLES"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
