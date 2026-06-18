import { HomeAboutSection } from "@/views/home/about";
import { HomeViewEffect } from "@/views/home/view";
import { HomeBlogSection } from "@/views/home/blog";
import { StickyFooter } from "@/views/sticky-footer";
import { getAllPosts } from "@/lib/blog";

export default function Page() {
  const posts = getAllPosts();

  return (
    <main className="bg-black text-white min-h-screen">
      <HomeViewEffect />
      <HomeAboutSection />
      <HomeBlogSection posts={posts} />
      <StickyFooter />
    </main>
  );
}
