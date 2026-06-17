import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  UIMessage,
  type UIMessageStreamWriter,
} from "ai";
import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { rateLimit, getClientIp, rateLimitHeaders } from "@/lib/rate-limit";

export const maxDuration = 30;

const CHAT_RATE_LIMIT = 10;
const CHAT_WINDOW_MS = 60 * 1000;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2_000;
const CHAT_UNAVAILABLE_MESSAGE =
  "I can answer questions about Matt's background, but the AI provider is temporarily unavailable. Please try again in a moment, or use the contact link if this is time-sensitive.";

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function getChatErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (/rate.?limit|too many|429/i.test(message)) {
    return "The AI provider is rate-limited right now. Please wait a moment and try again.";
  }

  if (/auth|api key|credential|unauthorized|forbidden/i.test(message)) {
    return "The AI provider is not configured correctly. Please check the deployment environment variables.";
  }

  return CHAT_UNAVAILABLE_MESSAGE;
}

function createFallbackResponse(message: string, headers: Record<string, string>) {
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writeAssistantText(writer, message);
    },
  });

  return createUIMessageStreamResponse({
    stream,
    headers,
  });
}

function writeAssistantText(writer: UIMessageStreamWriter, message: string) {
  const textId = "fallback";
  writer.write({ type: "start-step" });
  writer.write({ type: "text-start", id: textId });
  writer.write({ type: "text-delta", id: textId, delta: message });
  writer.write({ type: "text-end", id: textId });
  writer.write({ type: "finish-step" });
}

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
    const content = getMessageText(msg);

    if (content.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `Each message must be ${MAX_MESSAGE_CHARS.toLocaleString()} characters or fewer.` },
        { status: 400 }
      );
    }
  }

  try {
    const streamResult = streamText({
      model: "openai/gpt-5.4-nano",
      system: buildSystemPrompt(),
      messages: await convertToModelMessages(messages),
    });

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        const aiStream = streamResult.toUIMessageStream({
          onError: getChatErrorMessage,
        });
        const reader = aiStream.getReader();
        let activeTextId: string | null = null;
        let wroteText = false;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            if (value.type === "error") {
              const fallback = value.errorText || CHAT_UNAVAILABLE_MESSAGE;

              if (activeTextId) {
                writer.write({
                  type: "text-delta",
                  id: activeTextId,
                  delta: `\n\n${fallback}`,
                });
                writer.write({ type: "text-end", id: activeTextId });
                writer.write({ type: "finish-step" });
              } else if (!wroteText) {
                writeAssistantText(writer, fallback);
              }
              return;
            }

            if (value.type === "text-start") {
              activeTextId = value.id;
            } else if (value.type === "text-delta") {
              wroteText = true;
            } else if (value.type === "text-end") {
              activeTextId = null;
            }

            writer.write(value);
          }
        } catch (error) {
          writeAssistantText(writer, getChatErrorMessage(error));
        }
      },
    });

    return createUIMessageStreamResponse({ stream, headers });
  } catch (error) {
    return createFallbackResponse(getChatErrorMessage(error), headers);
  }
}
