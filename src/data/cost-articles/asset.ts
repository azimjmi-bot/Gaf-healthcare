/** Storage key of the packed cost-article corpus. Copied under `/_gaf/` by post-build. */
export const COST_ARTICLES_KEY = "src/data/cost-articles.pack";

/**
 * Parsed articles kept after a request. Eight covers a cost page plus the
 * specialty pages that consult a handful of sibling procedures, and a crawl
 * of every cost URL cannot retain the whole corpus.
 */
export const COST_ARTICLE_CACHE_MAX = 8;
