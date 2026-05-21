import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/devlog";
import { Badge } from "@/components/ui/badge";
import { Nav } from "@/components/nav";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Devlog`,
    description: post.summary,
  };
}

export default async function DevlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/devlog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-10"
          >
            <ChevronLeft className="h-4 w-4" />
            Devlog
          </Link>

          <header className="mb-10">
            <time
              dateTime={post.date}
              className="text-xs text-muted-foreground tabular-nums"
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2 mb-4">
              {post.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-5">
              {post.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <article className="prose prose-neutral dark:prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-code:text-primary prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <MDXRemote source={post.content} />
          </article>
        </div>
      </main>
    </>
  );
}
