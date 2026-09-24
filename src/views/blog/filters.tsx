interface BlogFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
}

export function BlogFilters({
    categories,
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchQueryChange,
}: BlogFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10 pb-6 border-b border-neutral-900">
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                        <button key={cat} onClick={() => onCategoryChange(cat)} className={`px-4 py-1.5 text-xs font-mondwest tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-none ${ isActive ? "bg-white text-black font-semibold shadow-md shadow-white/10" : "bg-neutral-950/80 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700"}`}>
                            {cat}
                        </button>
                    );
                })}
            </div>

            <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <input type="text" placeholder="Search articles, tags..." value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} className="w-full bg-neutral-950/90 border border-neutral-800/90 text-white pl-10 pr-9 py-2 text-xs sm:text-sm font-sans placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all cursor-none"/>
                {searchQuery && (
                    <button onClick={() => onSearchQueryChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs p-1 cursor-none" aria-label="Clear search">
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}
