/**
 * Pre-computes project embeddings and writes them to lib/embeddings/project-embeddings.json.
 * Run with: npx dotenv -e .env.local -- npx tsx scripts/generate-embeddings.ts
 *
 * Re-run whenever projects are added or descriptions change.
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { embedMany } from "ai";
import { projects } from "../content/projects";
import type { ProjectEmbedding } from "../lib/embeddings/types";

async function main() {
  console.log(`Generating embeddings for ${projects.length} project(s)...`);

  const values = projects.map(
    (p) => `${p.title}: ${p.description} ${p.longDescription}`
  );

  const { embeddings } = await embedMany({
    model: "openai/text-embedding-3-small",
    values,
  });

  const result: ProjectEmbedding[] = projects.map((p, i) => ({
    id: p.id,
    title: p.title,
    embedding: embeddings[i],
  }));

  const outPath = join(
    __dirname,
    "../lib/embeddings/project-embeddings.json"
  );
  writeFileSync(outPath, JSON.stringify(result, null, 2));

  console.log(`✓ Wrote embeddings to lib/embeddings/project-embeddings.json`);
  console.log(
    `  ${result.length} project(s) × ${result[0]?.embedding.length ?? 0} dimensions`
  );
}

main().catch((err) => {
  console.error("Error generating embeddings:", err);
  process.exit(1);
});
