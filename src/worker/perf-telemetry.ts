/**
 * Sampled, privacy-safe Worker performance telemetry (audit P5).
 *
 * Logs only bounded-cardinality labels and timings. Never logs full URLs with
 * query strings, cookies, authorization, or visitor identifiers.
 */

export type PerfRouteCategory =
  | "home"
  | "treatment"
  | "doctor"
  | "hospital"
  | "cost"
  | "blog"
  | "country"
  | "specialty"
  | "cms"
  | "api"
  | "sitemap"
  | "upload"
  | "image"
  | "other";

export type PerfCacheOutcome = "hit" | "miss" | "bypass" | "n/a";

export type PerfSample = {
  route: PerfRouteCategory;
  status: number;
  cache: PerfCacheOutcome;
  hydrate_ms?: number;
  hydrate_en_ms?: number;
  hydrate_ar_ms?: number;
  r2_reads?: number;
  ssr_ms?: number;
  worker_ms: number;
  groups?: string;
};

/** Default sample rate for document renders (1 = 100%, 0 = off). */
export const DEFAULT_PERF_SAMPLE_RATE = 0.05;

/**
 * Classify a pathname into a low-cardinality route bucket.
 * Locale prefixes are stripped; query strings must never be passed in.
 */
export function classifyPerfRoute(pathname: string): PerfRouteCategory {
  const raw = pathname.split("?")[0] || "/";
  const parts = raw.split("/").filter(Boolean);
  const head = parts[0] === "ar" || parts[0] === "fr" || parts[0] === "ru" || parts[0] === "sw" ? parts[1] : parts[0];
  const rest = parts[0] === "ar" || parts[0] === "fr" || parts[0] === "ru" || parts[0] === "sw" ? parts.slice(1) : parts;

  if (!head) return "home";
  if (head === "cms") return "cms";
  if (head === "api") return "api";
  if (head.startsWith("sitemap") || head === "robots.txt") return "sitemap";
  if (head === "uploads") return "upload";
  if (raw === "/_next/image") return "image";
  if (head === "treatments") return "treatment";
  if (head === "doctors") return "doctor";
  if (head === "hospitals") return "hospital";
  if (head === "costs") return "cost";
  if (head === "blogs" || head === "blog") return "blog";
  if (head === "specialties" || head === "specialty") return "specialty";
  // Country hubs: /nigeria/treatment-in-india
  if (rest.length >= 2 && rest[1] === "treatment-in-india") return "country";
  if (rest.length === 1 && /^[a-z0-9-]+$/.test(rest[0] ?? "") && rest[0] !== "consult") {
    // Bare country landing is still a country-class commercial page.
    return "country";
  }
  return "other";
}

/** Deterministic sample gate from a path + attempt salt (no visitor entropy). */
export function shouldSamplePerf(pathname: string, rate = DEFAULT_PERF_SAMPLE_RATE, salt = 0): boolean {
  if (rate <= 0) return false;
  if (rate >= 1) return true;
  const key = `${pathname.split("?")[0] || "/"}#${salt}`;
  let hash = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const unit = (hash >>> 0) / 0xffffffff;
  return unit < rate;
}

/** Stable log line for Cloudflare Worker logs / logpush. */
export function formatPerfSample(sample: PerfSample): string {
  const parts = [
    "perf",
    `route=${sample.route}`,
    `status=${sample.status}`,
    `cache=${sample.cache}`,
    `worker_ms=${Math.round(sample.worker_ms)}`,
  ];
  if (sample.hydrate_ms !== undefined) parts.push(`hydrate_ms=${Math.round(sample.hydrate_ms)}`);
  if (sample.hydrate_en_ms !== undefined) parts.push(`hydrate_en_ms=${Math.round(sample.hydrate_en_ms)}`);
  if (sample.hydrate_ar_ms !== undefined) parts.push(`hydrate_ar_ms=${Math.round(sample.hydrate_ar_ms)}`);
  if (sample.r2_reads !== undefined) parts.push(`r2_reads=${sample.r2_reads}`);
  if (sample.ssr_ms !== undefined) parts.push(`ssr_ms=${Math.round(sample.ssr_ms)}`);
  if (sample.groups) parts.push(`groups=${sample.groups}`);
  return parts.join(" ");
}

export type HydrateTiming = {
  totalMs: number;
  byGroup: Partial<Record<string, number>>;
  r2Reads: number;
};

/**
 * Time parallel ensureHydrated calls. `readCounter` is incremented by the
 * storage layer when provided; otherwise r2Reads stays 0.
 */
export async function timeHydration(
  groups: readonly string[],
  ensure: (group: string) => Promise<void>,
  readCounter?: { count: number },
): Promise<HydrateTiming> {
  const byGroup: Partial<Record<string, number>> = {};
  const started = Date.now();
  const before = readCounter?.count ?? 0;
  await Promise.all(
    groups.map(async (group) => {
      const t0 = Date.now();
      await ensure(group);
      byGroup[group] = Date.now() - t0;
    }),
  );
  return {
    totalMs: Date.now() - started,
    byGroup,
    r2Reads: Math.max(0, (readCounter?.count ?? before) - before),
  };
}
