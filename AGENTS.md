<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Environment config lives in `.cursor/environment.json`. On startup, dependencies install via `npm ci` and the dev server starts on port 3000.

### Required secrets

Add these in [Cursor Dashboard → Cloud Agents → Secrets](https://cursor.com/dashboard/cloud-agents):

| Variable | Required for |
|----------|--------------|
| `AI_GATEWAY_API_KEY` | `/api/chat`, `/api/search`, and `npm run seed:embeddings` |

Without `AI_GATEWAY_API_KEY`, the site still builds and renders — only AI features fail at runtime. See `.env.local.example` for the variable name.

### Verify changes before opening a PR

Run in order:

```bash
npm run lint
npm run build
```

For UI changes, confirm the dev server (port 3000) shows the expected result. For AI route changes, test with `AI_GATEWAY_API_KEY` set.

### Embeddings

Semantic search reads `lib/embeddings/project-embeddings.json`. After adding or editing projects in `content/projects.ts`, regenerate embeddings:

```bash
npm run seed:embeddings
```

Commit the updated JSON when project content changes.

### Project conventions

See `.cursor/rules/project-conventions.mdc` for stack, folder structure, and content patterns.
