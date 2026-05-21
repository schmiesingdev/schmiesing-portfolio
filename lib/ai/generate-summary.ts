import { generateText } from "ai";
import { cacheLife, cacheTag } from "next/cache";

export async function generateProjectSummary(
  projectId: string,
  longDescription: string
): Promise<string> {
  "use cache";
  cacheLife("days");
  cacheTag(`project-summary-${projectId}`);

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4.6",
      prompt: `Write a single concise sentence (max 20 words) that captures the most impressive technical or engineering aspect of this project. No filler phrases like "This project" or "A system". Start directly with a verb or noun.\n\n${longDescription}`,
      maxOutputTokens: 60,
    });
    return text.trim().replace(/\.$/, "") + ".";
  } catch {
    return "";
  }
}
