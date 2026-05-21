import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type DevlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
};

const DEVLOG_DIR = path.join(process.cwd(), "content/devlog");

function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function getAllPosts(): DevlogPost[] {
  if (!fs.existsSync(DEVLOG_DIR)) return [];

  const files = fs
    .readdirSync(DEVLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(DEVLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: (data.slug as string) ?? filename.replace(/\.(mdx|md)$/, ""),
        title: data.title as string,
        date: data.date as string,
        summary: data.summary as string,
        tags: (data.tags as string[]) ?? [],
        content,
      };
    })
    .sort(
      (a, b) =>
        parseDate(b.date).getTime() - parseDate(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): DevlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
