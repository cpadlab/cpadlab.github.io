"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/blog";
import { BlogHeader } from "./header";
import { BlogFilters } from "./filters";
import { BlogCard } from "./card";

interface BlogListViewProps {
    posts: Omit<BlogPost, "content">[];
}

export function BlogListView({ posts }: BlogListViewProps) {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["ALL", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === "ALL" || post.category === activeCategory;
        const matchesSearch = !searchQuery || (
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            post.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-32 pb-24">
            <BlogHeader />

            <BlogFilters
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
            />

            <div className="mb-6 text-sm font-mondwest text-neutral-500">
                SHOWING {filteredPosts.length} OF {posts.length} ARTICLES
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-800">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="border border-neutral-800 p-12 text-center text-neutral-500 font-mondwest">
                    NO ARTICLES MATCHED YOUR SEARCH CRITERIA
                </div>
            )}
        </div>
    );
}
