import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { rateLimit, getClientIp, rateLimitHeaders } from "@/lib/rate-limit";

export const maxDuration = 30;

const CHAT_RATE_LIMIT = 10;
const CHAT_WINDOW_MS = 60 * 1000;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2_000;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const result = rateLimit(`chat:${ip}`, CHAT_RATE_LIMIT, CHAT_WINDOW_MS);
  const headers = rateLimitHeaders(result, CHAT_RATE_LIMIT);

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before sending another message." },
      { status: 429, headers }
    );
  }

  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages must be a non-empty array." }, { status: 400 });
  }

  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: `Conversation history is limited to ${MAX_MESSAGES} messages.` },
      { status: 400 }
    );
  }

  for (const msg of messages) {
    const content =
      typeof msg.content === "string"
        ? msg.content
        : Array.isArray(msg.content)
          ? msg.content
              .filter((p: { type: string; text?: string }) => p.type === "text")
              .map((p: { type: string; text?: string }) => p.text ?? "")
              .join("")
          : "";

    if (content.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `Each message must be ${MAX_MESSAGE_CHARS.toLocaleString()} characters or fewer.` },
        { status: 400 }
      );
    }
  }

  const streamResult = streamText({
    model: "anthropic/claude-sonnet-4.6",
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
  });

  const response = streamResult.toUIMessageStreamResponse();

  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }

  return response;
}
