import Link from "next/link";
import { getAllPosts } from "@/lib/devlog";
import { Badge } from "@/components/ui/badge";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devlog — Matthew Schmiesing",
  description:
    "Real prompts, diffs, and Cursor skill usage from building this portfolio with AI-assisted development.",
};

export default function DevlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/80 uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70 inline-block" />
                Built with Cursor
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Devlog
            </h1>
            <p className="text-muted-foreground max-w-lg leading-relaxed">
              A behind-the-scenes record of building this portfolio — real
              prompts, architectural decisions, and Cursor skill usage
              throughout each phase.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No posts yet.</p>
          ) : (
            <ol className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/devlog/${post.slug}`}
                    className="group block p-6 rounded-xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                        {post.title}
                      </h2>
                      <time
                        dateTime={post.date}
                        className="shrink-0 text-xs text-muted-foreground tabular-nums pt-0.5"
                      >
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </main>
    </>
  );
}
