import { contentStorage } from "@/lib/storage";
import { TtlLru } from "@/lib/ttl-lru";
import { COST_ARTICLE_CACHE_MAX, COST_ARTICLES_KEY } from "./asset";
import { indexCostArticlePack, inflatePackedArticle } from "./pack";
import type { CostArticle } from "./types";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * The Cloudflare build loads articles from one packed asset instead of the
 * static module graph. This module keeps that packed container (one copy of
 * the deflated bytes) and an LRU of parsed articles. It does not keep the
 * uncompressed corpus, so a sitemap walk or a crawl of every cost URL cannot
 * pin every paragraph.
 */
type Packed = {
  version: string;
  bytes: Uint8Array;
  spans: Map<string, [number, number]>;
};

const cache = new TtlLru<CostArticle>(COST_ARTICLE_CACHE_MAX, CACHE_TTL_MS);
let packed: Packed | undefined;

function ownString(value: string) {
  return textDecoder.decode(textEncoder.encode(value));
}

function detach<T>(value: T): T {
  if (typeof value === "string") return ownString(value) as T;
  if (Array.isArray(value)) return value.map((item) => detach(item)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) out[key] = detach(item);
    return out as T;
  }
  return value;
}

function ensurePacked(): Packed {
  const storage = contentStorage();
  const version = storage.version(COST_ARTICLES_KEY) ?? "missing";
  if (packed && packed.version === version) return packed;
  cache.clear();
  const bytes = storage.readBytes(COST_ARTICLES_KEY);
  packed = {
    version,
    bytes: bytes ?? new Uint8Array(),
    spans: bytes ? indexCostArticlePack(bytes) : new Map(),
  };
  return packed;
}

function loadArticle(slug: string): CostArticle | undefined {
  if (!slug) return undefined;
  const source = ensurePacked();
  const key = `${source.version}\0${slug}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const span = source.spans.get(slug);
  if (!span) return undefined;
  try {
    const parsed = inflatePackedArticle(source.bytes, span);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
    return cache.set(key, detach(parsed as CostArticle));
  } catch {
    return undefined;
  }
}

export const costArticles: Record<string, CostArticle> = new Proxy({} as Record<string, CostArticle>, {
  get(_target, property) {
    return typeof property === "string" ? loadArticle(property) : undefined;
  },
  has(_target, property) {
    return typeof property === "string" && loadArticle(property) !== undefined;
  },
});

export function getCostArticle(slug: string): CostArticle | undefined {
  return loadArticle(slug);
}

export function costArticleCacheSize() {
  return cache.size;
}

export function clearCostArticleCache() {
  packed = undefined;
  cache.clear();
}
