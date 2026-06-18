import fs from "fs";
import path from "path";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  cover: string;
  tags: string[];
  content: string;
}

const blogDirectory = path.join(process.cwd(), "src/assets/blog");

function parseFrontmatter(frontmatter: string): Omit<BlogPost, "id" | "slug" | "content"> {
  const data = {
    title: "",
    date: "",
    description: "",
    category: "",
    cover: "",
    tags: [] as string[],
  };

  const lines = frontmatter.split("\n");
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
      val = val.slice(1, -1);
    }

    if (key === "tags") {
      if (val.startsWith("[") && val.endsWith("]")) {
        const arrayContent = val.slice(1, -1);
        data.tags = arrayContent
          .split(",")
          .map((item) => {
            let tag = item.trim();
            if ((tag.startsWith("'") && tag.endsWith("'")) || (tag.startsWith('"') && tag.endsWith('"'))) {
              tag = tag.slice(1, -1);
            }
            return tag;
          })
          .filter(Boolean);
      } else {
        data.tags = val.split(",").map((t) => t.trim()).filter(Boolean);
      }
    } else {
      (data as Record<string, string | string[]>)[key] = val;
    }
  }

  return data;
}

export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const firstDash = fileContents.indexOf("---");
      const secondDash = fileContents.indexOf("---", firstDash + 3);

      let frontmatterData: Partial<Omit<BlogPost, "id" | "slug" | "content">> = {};
      if (firstDash !== -1 && secondDash !== -1) {
        const frontmatterContent = fileContents.slice(firstDash + 3, secondDash).trim();
        frontmatterData = parseFrontmatter(frontmatterContent);
      }

      return {
        id: slug,
        slug,
        ...frontmatterData,
      } as Omit<BlogPost, "content">;
    });

  return allPosts.sort((a, b) => {
    const aTime = Date.parse(a.date) || 0;
    const bTime = Date.parse(b.date) || 0;
    return bTime - aTime;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const firstDash = fileContents.indexOf("---");
  const secondDash = fileContents.indexOf("---", firstDash + 3);

  let frontmatterData: Partial<Omit<BlogPost, "id" | "slug" | "content">> = {};
  let content = fileContents;

  if (firstDash !== -1 && secondDash !== -1) {
    const frontmatterContent = fileContents.slice(firstDash + 3, secondDash).trim();
    frontmatterData = parseFrontmatter(frontmatterContent);
    content = fileContents.slice(secondDash + 3).trim();
  }

  return {
    id: slug,
    slug,
    ...frontmatterData,
    content,
  } as BlogPost;
}

export function searchPosts(query: string): Omit<BlogPost, "content">[] {
  const posts = getAllPosts();
  if (!query) return posts;

  const cleanQuery = query.toLowerCase().trim();

  return posts.filter((post) => {
    const matchesTitle = post.title?.toLowerCase().includes(cleanQuery);
    const matchesDescription = post.description?.toLowerCase().includes(cleanQuery);
    const matchesCategory = post.category?.toLowerCase().includes(cleanQuery);
    const matchesTags = post.tags?.some((tag) => tag.toLowerCase().includes(cleanQuery));

    return matchesTitle || matchesDescription || matchesCategory || matchesTags;
  });
}

export function getRelatedPosts(currentPost: Omit<BlogPost, "content">, limit = 3): Omit<BlogPost, "content">[] {
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);

  const postsWithScores = otherPosts.map((post) => {
    let score = 0;

    if (post.category && currentPost.category && post.category.toLowerCase() === currentPost.category.toLowerCase()) {
      score += 5;
    }

    if (post.tags && currentPost.tags) {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      score += sharedTags.length * 2;
    }

    return { post, score };
  });

  return postsWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      const aTime = Date.parse(a.post.date) || 0;
      const bTime = Date.parse(b.post.date) || 0;
      return bTime - aTime;
    })
    .map((item) => item.post)
    .slice(0, limit);
}
