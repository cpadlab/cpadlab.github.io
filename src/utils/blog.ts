
import fs from "fs";
import path from "path";
import type { BlogPost, BlogPostPreview } from "@/types/blog";

const baseBlogDirectory = path.join(process.cwd(), "src/assets/blog");

type Frontmatter = Omit<BlogPost, "id" | "slug" | "content">;

function parseFrontmatter(frontmatter: string): Frontmatter {
    
    const data: Frontmatter = {
        title: "",
        date: "",
        description: "",
        category: "",
        cover: "",
        tags: [],
    };

    const lines = frontmatter.split("\n");

    for (const line of lines) {
   
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) continue;

        const key = line.slice(0, colonIdx).trim();
        let val = line.slice(colonIdx + 1).trim();

        if (
            (val.startsWith("'") && val.endsWith("'")) ||
            (val.startsWith('"') && val.endsWith('"'))
        ) {
            val = val.slice(1, -1);
        }

        if (key === "tags") {
            if (val.startsWith("[") && val.endsWith("]")) {
                
                const arrayContent = val.slice(1, -1);

                data.tags = arrayContent
                    .split(",")
                    .map((item) => {
                        let tag = item.trim();

                        if (
                            (tag.startsWith("'") && tag.endsWith("'")) ||
                            (tag.startsWith('"') && tag.endsWith('"'))
                        ) {
                            tag = tag.slice(1, -1);
                        }

                        return tag;

                    })
                    .filter(Boolean);

            } else {
                data.tags = val.split(",").map((tag) => tag.trim()).filter(Boolean);
            }

        } else if (key in data) {
            (data as Record<string, string | string[]>)[key] = val;
        }

    }

    return data;
}

function readPostFile(fileName: string): BlogPost {

    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(baseBlogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const firstDash = fileContents.indexOf("---");
    const secondDash = fileContents.indexOf("---", firstDash + 3);

    let frontmatterData: Partial<Frontmatter> = {};
    let content = fileContents;

    if (firstDash !== -1 && secondDash !== -1) {
        const frontmatterContent = fileContents
            .slice(firstDash + 3, secondDash)
            .trim();

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

export function getAllPosts(): BlogPostPreview[] {
    
    if (!fs.existsSync(baseBlogDirectory)) {
        return [];
    }

    const fileNames = fs
        .readdirSync(baseBlogDirectory)
        .filter((fileName) => fileName.endsWith(".md"));

    const allPosts = fileNames.map((fileName) => {
        const post = readPostFile(fileName);
        const { content: _content, ...preview } = post;
        return preview;
    });

    return allPosts.sort((a, b) => {
        const aTime = Date.parse(a.date) || 0;
        const bTime = Date.parse(b.date) || 0;
        return bTime - aTime;
    });

}

export function getRecentPosts(limit = 5): BlogPostPreview[] {
    return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | null {
    
    const fileName = `${slug}.md`;
    const fullPath = path.join(baseBlogDirectory, fileName);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    return readPostFile(fileName);

}

function normalizeCategory(category: string): string {
    return category.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

export function getPostsByCategory(category: string): BlogPostPreview[] {
    
    const normalizedCategory = normalizeCategory(category);
    return getAllPosts().filter(
        (post) => normalizeCategory(post.category) === normalizedCategory,
    );

}