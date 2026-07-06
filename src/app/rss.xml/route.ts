import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
    const baseUrl = "https://cpadlab.github.io";
    const posts = getAllPosts();

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Carlos Padilla</title>
    <link>${baseUrl}</link>
    <description>Portfolio and blog by Carlos Padilla. Showcasing full-stack development, automation, cybersecurity, pentesting, writeups, and high-performance web applications.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
        .map((post) => {
            const postDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${postDate}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category>${post.category || "General"}</category>
    </item>`;
        })
        .join("")}
  </channel>
</rss>`;

    return new Response(rssFeed, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=18000",
        },
    });
}
