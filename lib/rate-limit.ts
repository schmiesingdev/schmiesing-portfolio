/**
 * In-process sliding-window rate limiter.
 *
 * Works well for a single-region Vercel deployment where one function
 * instance handles a burst of requests. For multi-region or high-traffic
 * deployments, replace the Map store with Upstash Ratelimit or pair this
 * with a Vercel Firewall rule (see README / security notes).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/** Remove stale entries every 5 minutes to prevent unbounded memory growth. */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now >= entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * @param key      Unique identifier for this counter bucket (e.g. `"chat:1.2.3.4"`)
 * @param limit    Maximum allowed requests per window
 * @param windowMs Window duration in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  entry.count += 1;
  return {
    allowed: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}

/** Extract the real client IP from Vercel / standard proxy headers. */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/** Build standard rate-limit response headers. */
export function rateLimitHeaders(result: RateLimitResult, limit: number) {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    "Retry-After": String(Math.ceil((result.resetAt - Date.now()) / 1000)),
  };
}
