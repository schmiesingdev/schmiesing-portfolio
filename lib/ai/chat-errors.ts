import {
  GatewayAuthenticationError,
  GatewayRateLimitError,
} from "@ai-sdk/gateway";

export const CHAT_UNAVAILABLE_MESSAGE =
  "I can answer questions about Matt's background, but the AI provider is temporarily unavailable. Please try again in a moment, or use the contact link if this is time-sensitive.";

const FREE_TIER_MESSAGE =
  "The AI assistant is temporarily unavailable on Vercel AI Gateway's free tier. Free credits have strict per-model rate limits that are separate from your $5 monthly balance. Top up paid AI Gateway credits in the Vercel dashboard to move to the paid tier, or try again later if you hit a short-term limit.";

const PROVIDER_BUSY_MESSAGE =
  "The AI provider is busy right now. Please wait a moment and try again.";

const AUTH_MESSAGE =
  "The AI assistant could not authenticate with Vercel AI Gateway. Check AI_GATEWAY_API_KEY locally, or run vercel link && vercel env pull for OIDC auth.";

function unwrapError(error: unknown): unknown {
  if (!error || typeof error !== "object") {
    return error;
  }

  if (
    GatewayAuthenticationError.isInstance(error) ||
    GatewayRateLimitError.isInstance(error)
  ) {
    return error;
  }

  if ("lastError" in error && error.lastError) {
    return unwrapError(error.lastError);
  }

  return error;
}

function isFreeTierRateLimit(message: string): boolean {
  return /free tier/i.test(message);
}

export function getChatErrorMessage(error: unknown): string {
  const root = unwrapError(error);

  if (GatewayAuthenticationError.isInstance(root)) {
    return AUTH_MESSAGE;
  }

  if (GatewayRateLimitError.isInstance(root)) {
    return isFreeTierRateLimit(root.message)
      ? FREE_TIER_MESSAGE
      : PROVIDER_BUSY_MESSAGE;
  }

  const message = root instanceof Error ? root.message : String(root);

  if (/rate.?limit|too many|429/i.test(message)) {
    return isFreeTierRateLimit(message)
      ? FREE_TIER_MESSAGE
      : PROVIDER_BUSY_MESSAGE;
  }

  if (/auth|api key|credential|unauthorized|forbidden/i.test(message)) {
    return AUTH_MESSAGE;
  }

  return CHAT_UNAVAILABLE_MESSAGE;
}
