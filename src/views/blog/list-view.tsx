"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/blog";
import { BlogHeader } from "./header";
import { BlogFilters } from "./filters";
import { BlogCard } from "./card";
import { FeaturedBlogCard } from "./featured-card";

interface BlogListViewProps {
    posts: Omit<BlogPost, "content">[];
}

export function BlogListView({ posts }: BlogListViewProps) {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["ALL", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = activeCategory === "ALL" || post.category === activeCategory;
        const matchesSearch =
            !searchQuery ||
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            post.category?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const isFiltered = activeCategory !== "ALL" || searchQuery.trim().length > 0;
    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

    const handleResetFilters = () => {
        setActiveCategory("ALL");
        setSearchQuery("");
    };

    return (
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-24">
            
            <BlogHeader totalPosts={posts.length} />
            <BlogFilters categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />

            {filteredPosts.length > 0 ? (
                <div>
                    {featuredPost && (
                        <FeaturedBlogCard post={featuredPost} />
                    )}

                    {gridPosts.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800/80">
                                <h3 className="text-xl sm:text-2xl font-editorial text-white tracking-wide">
                                    {isFiltered ? "More Matching Articles" : "Previous Articles"}
                                </h3>
                                <span className="text-xs font-mondwest text-neutral-500 uppercase tracking-widest">
                                    {gridPosts.length} {gridPosts.length === 1 ? "ARTICLE" : "ARTICLES"}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {gridPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-12 sm:p-16 text-center my-12">
                    <p className="text-lg font-editorial text-white mb-2">No articles found</p>
                    <p className="text-sm font-sans text-neutral-400 max-w-md mx-auto mb-6">
                        We couldn&apos;t find any articles matching your search &ldquo;{searchQuery}&rdquo; in {activeCategory}.
                    </p>
                    <button onClick={handleResetFilters} className="px-5 py-2 rounded-full text-xs font-mondwest uppercase tracking-wider bg-white text-black font-semibold hover:bg-neutral-200 transition-colors cursor-none">
                        Reset filters
                    </button>
                </div>
            )}
        </div>
    );
}
