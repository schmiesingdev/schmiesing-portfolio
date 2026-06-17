import { NextResponse } from "next/server";
import { embed, cosineSimilarity } from "ai";
import type { ExperienceEmbedding } from "@/lib/embeddings/types";
import type { ExperienceKind } from "@/content";
import { experienceItems } from "@/content";
import { rateLimit, getClientIp, rateLimitHeaders } from "@/lib/rate-limit";

export const maxDuration = 30;

const SEARCH_RATE_LIMIT = 30;
const SEARCH_WINDOW_MS = 60 * 1000;
const MAX_QUERY_LENGTH = 200;

type SearchResult = {
  id: string;
  title: string;
  kind: ExperienceKind;
  score: number;
};

function fallbackSearch(query: string): SearchResult[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  return experienceItems
    .map((item) => {
      const haystack = [
        item.title,
        item.organization,
        item.location,
        item.dateRange,
        item.description,
        item.longDescription,
        ...item.highlights,
        ...item.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const score = terms.reduce(
        (total, term) => total + (haystack.includes(term) ? 1 : 0),
        0
      );

      return {
        id: item.id,
        title: item.title,
        kind: item.kind,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const result = rateLimit(`search:${ip}`, SEARCH_RATE_LIMIT, SEARCH_WINDOW_MS);
  const headers = rateLimitHeaders(result, SEARCH_RATE_LIMIT);

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Too many search requests. Please slow down." },
      { status: 429, headers }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ results: [] }, { headers });
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { error: `Search query must be ${MAX_QUERY_LENGTH} characters or fewer.` },
      { status: 400, headers }
    );
  }

  const storedEmbeddings = (
    await import("@/lib/embeddings/experience-embeddings.json")
  ).default as ExperienceEmbedding[];

  if (storedEmbeddings.length === 0) {
    return NextResponse.json(
      { results: fallbackSearch(query), hint: "keyword-fallback" },
      { headers }
    );
  }

  try {
    const { embedding: queryEmbedding } = await embed({
      model: "openai/text-embedding-3-small",
      value: query,
    });

    const results: SearchResult[] = storedEmbeddings
      .map((item) => ({
        id: item.id,
        title: item.title,
        kind: item.kind,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score);

    return NextResponse.json({ results }, {
      headers: {
        ...headers,
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      { results: fallbackSearch(query), hint: "keyword-fallback" },
      {
        headers: {
          ...headers,
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  }
}
