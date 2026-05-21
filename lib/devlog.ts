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

// Parse "YYYY-MM-DD" as local midnight to avoid UTC offset shifting the displayed date.
function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getAllPosts(): DevlogPost[] {
  if (!fs.existsSync(DEVLOG_DIR)) return [];

  const files = fs
    .readdirSync(DEVLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .sort(); // alphabetical so slug is a reliable tiebreaker

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
    .sort((a, b) => {
      const dateDiff = parseDate(b.date).getTime() - parseDate(a.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      // Same date — higher slug (e.g. "04-phase5") sorts above lower ("03-phase4")
      return b.slug.localeCompare(a.slug);
    });
}

export function getPostBySlug(slug: string): DevlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
