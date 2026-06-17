/**
 * Pre-computes experience embeddings and writes them to lib/embeddings/experience-embeddings.json.
 * Run with: npx dotenv -e .env.local -- npx tsx scripts/generate-embeddings.ts
 *
 * Re-run whenever experience items are added or descriptions change.
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { embedMany } from "ai";
import { experienceItems } from "../content/experience";
import type { ExperienceEmbedding } from "../lib/embeddings/types";

async function main() {
  console.log(`Generating embeddings for ${experienceItems.length} experience item(s)...`);

  const values = experienceItems.map(
    (item) =>
      `${item.title}${item.organization ? ` at ${item.organization}` : ""} (${item.kind}): ${item.description} ${item.longDescription} ${item.highlights.join(" ")} Tags: ${item.tags.join(", ")}`
  );

  const { embeddings } = await embedMany({
    model: "openai/text-embedding-3-small",
    values,
  });

  const result: ExperienceEmbedding[] = experienceItems.map((item, i) => ({
    id: item.id,
    title: item.title,
    kind: item.kind,
    embedding: embeddings[i],
  }));

  const outPath = join(
    __dirname,
    "../lib/embeddings/experience-embeddings.json"
  );
  writeFileSync(outPath, JSON.stringify(result, null, 2));

  console.log(`✓ Wrote embeddings to lib/embeddings/experience-embeddings.json`);
  console.log(
    `  ${result.length} experience item(s) × ${result[0]?.embedding.length ?? 0} dimensions`
  );
}

main().catch((err) => {
  console.error("Error generating embeddings:", err);
  process.exit(1);
});
