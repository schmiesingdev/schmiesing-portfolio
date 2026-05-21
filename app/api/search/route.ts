import { NextResponse } from "next/server";
import { embed, cosineSimilarity } from "ai";
import type { ProjectEmbedding } from "@/lib/embeddings/types";

export const maxDuration = 30;

type SearchResult = {
  id: string;
  title: string;
  score: number;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const storedEmbeddings = (
    await import("@/lib/embeddings/project-embeddings.json")
  ).default as ProjectEmbedding[];

  if (storedEmbeddings.length === 0) {
    return NextResponse.json({ results: [], hint: "no-embeddings" });
  }

  const { embedding: queryEmbedding } = await embed({
    model: "openai/text-embedding-3-small",
    value: query,
  });

  const results: SearchResult[] = storedEmbeddings
    .map((item) => ({
      id: item.id,
      title: item.title,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({ results });
}
