"use client";

import { useState, useCallback, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { EnrichedProject } from "@/components/sections/projects-section";

type SearchResult = { id: string; score: number };

type Props = {
  projects: EnrichedProject[];
};

export function ProjectSearchContainer({ projects }: Props) {
  const [query, setQuery] = useState("");
  const [rankedIds, setRankedIds] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasEmbeddings, setHasEmbeddings] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setRankedIds([]);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q.trim())}`
        );
        const data: { results: SearchResult[]; hint?: string } =
          await res.json();

        if (data.hint === "no-embeddings") {
          setHasEmbeddings(false);
          setRankedIds([]);
        } else {
          setHasEmbeddings(true);
          setRankedIds(data.results.map((r) => r.id));
        }
      } catch {
        setRankedIds([]);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 350);
  };

  const clearSearch = () => {
    setQuery("");
    setRankedIds([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  };

  const displayedProjects =
    query.trim() && rankedIds.length > 0
      ? (rankedIds
          .map((id) => projects.find((p) => p.id === id))
          .filter(Boolean) as EnrichedProject[])
      : projects;

  return (
    <>
      {/* Search input */}
      <div className="relative mb-8 max-w-md">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {isSearching ? (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search projects by concept, skill, or keyword…"
          className="w-full h-10 pl-9 pr-9 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* No-embeddings hint */}
      {query.trim() && !hasEmbeddings && (
        <p className="text-xs text-muted-foreground/60 mb-6 -mt-4">
          Semantic search is not yet activated. Run{" "}
          <code className="font-mono bg-muted px-1 rounded">
            npx dotenv -e .env.local -- npx tsx scripts/generate-embeddings.ts
          </code>{" "}
          to generate embeddings.
        </p>
      )}

      {/* Empty state */}
      {query.trim() && rankedIds.length === 0 && !isSearching && hasEmbeddings && (
        <p className="text-sm text-muted-foreground/70 mb-6 -mt-2">
          No projects matched &ldquo;{query}&rdquo;.
        </p>
      )}

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            aiSummary={project.aiSummary}
          />
        ))}
      </div>
    </>
  );
}
