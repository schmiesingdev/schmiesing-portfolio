import { generateText } from "ai";
import { cacheLife, cacheTag } from "next/cache";
import { CHAT_MODEL } from "@/lib/ai/models";

export async function generateExperienceSummary(
  itemId: string,
  longDescription: string
): Promise<string> {
  "use cache";
  cacheLife("days");
  cacheTag(`experience-summary-${itemId}`);

  try {
    const { text } = await generateText({
      model: CHAT_MODEL,
      maxRetries: 0,
      prompt: `Write a single concise sentence (max 20 words) that captures the most impressive technical, engineering, leadership, or product aspect of this experience. No filler phrases like "This project" or "This role". Start directly with a verb or noun.\n\n${longDescription}`,
      maxOutputTokens: 60,
    });
    return text.trim().replace(/\.$/, "") + ".";
  } catch {
    return "";
  }
}
