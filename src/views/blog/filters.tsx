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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800 pb-8 mb-12">
            <div className="flex flex-wrap gap-2 text-sm font-mondwest">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-4 py-2 border transition-all duration-300 ${
                            activeCategory === cat
                                ? "bg-white text-black border-white cursor-none"
                                : "border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-white cursor-none"
                        }`}
                        style={{ borderRadius: 0 }}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="relative w-full md:w-80">
                <input
                    type="text"
                    placeholder="SEARCH ARTICLES..."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="w-full bg-transparent border border-neutral-800 text-white px-4 py-2 text-sm font-mondwest placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-all duration-300 cursor-none"
                    style={{ borderRadius: 0 }}
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchQueryChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs font-mondwest cursor-none"
                    >
                        CLEAR
                    </button>
                )}
            </div>
        </div>
    );
}
