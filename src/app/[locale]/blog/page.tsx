import type { Metadata } from "next";
import { BlogSection } from "@/view/blog/section";
import { getPostsByCategory } from "@/utils/blog";

export const metadata: Metadata = {
    title: "Blog | Carlos Padilla",
    description: "Technical writeups, security research, development tutorials and notes from the things I explore along the way.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | Carlos Padilla",
        description: "Technical writeups, security research, development tutorials and notes from the things I explore along the way.",
        url: "/blog",
        type: "website",
    },
};

export default function BlogPage() {

    const articles = getPostsByCategory("Article");

  return (
    <main className="md:max-w-4xl max-w-xl mx-auto px-8 w-full">
        
        <section className="pb-8 space-y-2 pt-2">
            <h1 className="capitalize text-2xl font-bold">A collection of things I&apos;ve learned, built and broken.</h1>
            <p className="capitalize text-muted-foreground">Technical writeups, security research, development tutorials and notes from the things I explore along the way.</p>
        </section>

        <div className="space-y-16 py-8">
            <BlogSection needCategory={false} title="All articles" description="Browse everything I've published, from technical notes to personal learnings." posts={articles} emptyMessage="No articles available." />
        </div>

    </main>
  );
}