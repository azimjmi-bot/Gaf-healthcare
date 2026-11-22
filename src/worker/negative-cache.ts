/**
 * Short-TTL negative cache policy for genuine HTML 404 responses (audit P1).
 *
 * Disabled unless explicitly enabled by the Worker env flag. Never treats 5xx,
 * auth failures, or non-HTML responses as cacheable negatives.
 */

export const DEFAULT_NEGATIVE_CACHE_TTL_SECONDS = 120;
export const MAX_NEGATIVE_CACHE_TTL_SECONDS = 300;

export type NegativeCacheDecision =
  | { cache: false; reason: string }
  | { cache: true; ttlSeconds: number };

export function parseNegativeCacheTtlSeconds(raw: string | undefined, fallback = DEFAULT_NEGATIVE_CACHE_TTL_SECONDS) {
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(MAX_NEGATIVE_CACHE_TTL_SECONDS, Math.floor(n));
}

export function isNegativeCacheEnabled(envFlag: string | undefined) {
  return envFlag === "1" || envFlag === "true" || envFlag === "on";
}

/**
 * Decide whether a rendered document may be stored as a negative (404) entry.
 */
export function decideNegativeCache(input: {
  enabled: boolean;
  status: number;
  contentType: string | null;
  cacheControl: string | null;
  hasSetCookie: boolean;
  authorization: boolean;
  cmsCookie: boolean;
  ttlSeconds?: number;
}): NegativeCacheDecision {
  if (!input.enabled) return { cache: false, reason: "disabled" };
  if (input.authorization || input.cmsCookie) return { cache: false, reason: "authenticated" };
  if (input.hasSetCookie) return { cache: false, reason: "set-cookie" };
  if (input.status !== 404) {
    if (input.status === 503) return { cache: false, reason: "upstream-busy" };
    if (input.status >= 500) return { cache: false, reason: "5xx" };
    if (input.status === 401 || input.status === 403) return { cache: false, reason: "auth-status" };
    return { cache: false, reason: `status-${input.status}` };
  }
  const type = (input.contentType ?? "").toLowerCase();
  if (!type.includes("text/html")) return { cache: false, reason: "non-html" };
  const cc = (input.cacheControl ?? "").toLowerCase();
  // Align with positive HTML policy: never retain private / no-store / no-cache.
  if (/\b(?:private|no-store|no-cache)\b/.test(cc)) return { cache: false, reason: "cache-control" };
  const ttl = input.ttlSeconds ?? DEFAULT_NEGATIVE_CACHE_TTL_SECONDS;
  return { cache: true, ttlSeconds: Math.min(MAX_NEGATIVE_CACHE_TTL_SECONDS, Math.max(1, ttl)) };
}

/** Cache-key path suffix so 404 bodies never overwrite 200 HTML entries. */
export const NEGATIVE_CACHE_SUFFIX = ".404";
