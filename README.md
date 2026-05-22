# schmiesingdev — Portfolio

A personal portfolio built with Next.js 16 App Router that doubles as a live showcase of AI-integrated software engineering. Every phase of the build is documented in the [Devlog](/devlog).

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| UI | React 19, Tailwind v4, shadcn/ui |
| Language | TypeScript |
| AI | Vercel AI SDK v6, AI Gateway (Claude, OpenAI embeddings) |
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | Vercel (GitHub → preview deploys on PR) |

## Getting Started

### Prerequisites

Copy `.env.local.example` to `.env.local` and fill in your key:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|----------|-------------|
| `AI_GATEWAY_API_KEY` | Vercel AI Gateway key — get one at [vercel.com/ai](https://vercel.com/ai) |

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Seed Semantic Search Embeddings

The project search bar uses pre-computed OpenAI embeddings for cosine-similarity search. Run this once after cloning, and again whenever you add or update a project in `content/projects.ts`:

```bash
npm run seed:embeddings
```

This writes vectors to `lib/embeddings/project-embeddings.json`. Without this step the search bar shows a hint to run the script; the rest of the site works normally.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed:embeddings` | Generate project embeddings for semantic search |

## Project Structure

```
app/
  page.tsx               # Home (all sections)
  devlog/
    page.tsx             # Devlog listing
    [slug]/page.tsx      # Individual devlog post
  api/
    chat/route.ts        # Streaming AI chat (POST)
    search/route.ts      # Semantic project search (GET)

components/
  sections/              # Page sections (Server Components)
  chat/                  # AI chat widget (Client Component)
  ui/                    # shadcn primitives

content/
  bio.ts                 # Personal info, social links
  projects.ts            # Project data (source of truth)
  skills.ts              # Skills by category
  certifications.ts      # Certifications
  nav.ts                 # Navigation links
  devlog/                # MDX devlog posts

lib/
  ai/
    system-prompt.ts     # Builds RAG-style chat context from content/
    generate-summary.ts  # Cached AI project summaries ('use cache')
  embeddings/
    project-embeddings.json  # Pre-computed embedding vectors (git-tracked)
    types.ts             # ProjectEmbedding type
  devlog.ts              # MDX file loader (gray-matter)

scripts/
  generate-embeddings.ts # Seed script — run via npm run seed:embeddings
```

## AI Features

### Streaming Chat Assistant
Floating chat widget — visitors can ask questions about projects, skills, and background. Powered by `streamText` + `useChat` (Vercel AI SDK v6). System prompt is built dynamically from `content/` data so it always reflects current project and skill info.

### AI Project Summaries
Each project card shows a one-sentence AI-generated TL;DR, cached server-side with Next.js `'use cache'` + `cacheLife('days')`. The first request generates the summary via Claude; all subsequent requests are served from cache.

### Semantic Project Search
Search bar in the Projects section. Embeds the query with `openai/text-embedding-3-small` via AI Gateway, computes cosine similarity against pre-stored project vectors, and returns results ranked by meaning — not keyword match.

## Content

All content lives in `content/` as typed TypeScript. To update:

- **Add a project** → edit `content/projects.ts`, then run `npm run seed:embeddings` (or use the `add-project` Cursor skill for a guided checklist)
- **Update bio** → edit `content/bio.ts`
- **Add a skill** → edit `content/skills.ts`
- **Add a certification** → edit `content/certifications.ts`
- **Add a devlog post** → create `content/devlog/your-slug.mdx` with frontmatter:

```mdx
---
title: "Your Post Title"
date: "2026-06-01"
slug: "your-slug"
summary: "One sentence summary for the listing page."
tags: ["Next.js", "AI"]
---

Post content here...
```

## Roadmap

- [x] Phase 1 — Tooling: shadcn/ui, Cursor rules, project structure
- [x] Phase 2 — Core UI: Hero, About, Skills, Projects, Contact sections
- [x] Phase 3 — AI Chat: Streaming assistant with RAG-style system prompt
- [x] Phase 4 — AI Features: Semantic search, cached summaries, devlog
- [x] Phase 5 — Polish: Vercel Analytics + Speed Insights, performance audit, refined Cursor rules, custom `add-project` skill
