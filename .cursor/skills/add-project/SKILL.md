---
name: add-project
description: Add a new project entry to the schmiesing portfolio. Use when the user wants to add, create, or register a new project — mentions content/projects.ts, a project card, or says "add my project". Handles the full workflow: content entry, tag selection, embedding regeneration, and verification.
---

# Add a New Project

## Checklist

Copy and track progress:

```
- [ ] 1. Draft the Project object in content/projects.ts
- [ ] 2. Verify required fields are complete
- [ ] 3. Re-export via content/index.ts (already done — barrel is static)
- [ ] 4. Run seed:embeddings to update semantic search
- [ ] 5. Verify the project card renders correctly
```

---

## Step 1 — Add to `content/projects.ts`

Append a new entry to the `projects` array. All fields:

```ts
{
  id: "kebab-case-unique-id",       // used for routing + embeddings key
  title: "Human-Readable Title",
  description: "One sentence (≤160 chars) — shown on the project card.",
  longDescription: "2–5 sentences. Covers what it does, tech used, your role, and why it matters. This feeds the AI chat context and the embedding index.",
  tags: ["Next.js", "TypeScript"],  // pick from ProjectTag union or add new string
  repoUrl: "https://github.com/...",  // optional
  liveUrl: "https://...",             // optional
  featured: true,   // true = appears in featured grid; false = search-only
  year: 2026,
}
```

**`id` rules**: lowercase, hyphens only, globally unique across the array. Use the project's repo slug if it has one.

**`featured` rule**: set `true` only if the project represents your best work or is client-facing. The featured grid has limited visual space.

---

## Step 2 — Verify Required Fields

Before proceeding, confirm all of these are non-empty:
- `id`, `title`, `description`, `longDescription`, `tags`, `featured`, `year`

`description` must be ≤ 160 chars (shown in card UI and AI chat context).
`longDescription` should be ≥ 2 sentences (used for embedding quality).

---

## Step 3 — Regenerate Embeddings

After saving `content/projects.ts`, run:

```bash
npm run seed:embeddings
```

This regenerates the embedding index used by the semantic search at `/api/search`. It reads from `content/projects.ts` at runtime — no import changes needed.

> Requires `ANTHROPIC_API_KEY` in `.env.local`. If not set, the script will exit early with a clear error.

---

## Step 4 — Visual Verification

Start the dev server and check:

1. **Projects section** (`/` → Projects) — card appears with correct title, description, and tags
2. **Semantic search** — type a related keyword; the new project should surface in results
3. **AI chat** — ask the chat assistant about the new project; it should reference it accurately

```bash
npm run dev
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Duplicate `id` | Check existing entries — IDs must be unique |
| `description` > 160 chars | Trim it — the card truncates and the AI context gets noisy |
| Forgot to run `seed:embeddings` | Semantic search will return stale results |
| `tags` contains a typo | Tags are rendered directly — check against the `ProjectTag` union in `content/projects.ts` |
| `featured: true` for everything | Keep featured projects to 3–5 max for visual balance |
