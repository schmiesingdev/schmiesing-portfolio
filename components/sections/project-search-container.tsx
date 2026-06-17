"use client";

import { useState, useCallback, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { ExperienceKind } from "@/content";
import type { EnrichedExperienceItem } from "@/components/sections/projects-section";

type SearchResult = { id: string; score: number };
type FilterValue = "all" | ExperienceKind;

type Props = {
  items: EnrichedExperienceItem[];
};

const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Projects", value: "project" },
  { label: "Internships", value: "internship" },
  { label: "Work", value: "work" },
];

export function ProjectSearchContainer({ items }: Props) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
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

  const baseItems = query.trim()
    ? (rankedIds
          .map((id) => items.find((item) => item.id === id))
          .filter(Boolean) as EnrichedExperienceItem[])
    : items;

  const displayedItems =
    activeFilter === "all"
      ? baseItems
      : baseItems.filter((item) => item.kind === activeFilter);

  return (
    <>
      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
              activeFilter === filter.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

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
          placeholder="Search projects, internships, and work by concept…"
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
          No experience matched &ldquo;{query}&rdquo;.
        </p>
      )}

      {displayedItems.length === 0 && !query.trim() && !isSearching && (
        <p className="text-sm text-muted-foreground/70 mb-6 -mt-2">
          No items match the current filter.
        </p>
      )}

      {/* Experience grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {displayedItems.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
            aiSummary={item.aiSummary}
          />
        ))}
      </div>
    </>
  );
}
