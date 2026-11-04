export type { CostArticle } from "./types";

/**
 * Long-form cost articles, keyed by treatment slug. A procedure without an entry
 * keeps the default cost-sheet rendering, so this registry grows one procedure at
 * a time without touching the route.
 *
 * On Hostinger this is the static registry. The Cloudflare build substitutes
 * `external-registry.ts`, which reads one packed JSON asset and keeps only a
 * few parsed articles.
 */
export { costArticles, getCostArticle } from "./static-registry";
