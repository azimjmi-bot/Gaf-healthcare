import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import { COST_ARTICLE_CACHE_MAX, COST_ARTICLES_KEY } from "./asset";
import { encodeCostArticlePack } from "./pack";
import {
  clearCostArticleCache,
  costArticleCacheSize,
  costArticles,
  getCostArticle,
} from "./external-registry";
import { setContentStorage } from "@/lib/storage";
import { MemoryContentStorage } from "@/lib/storage/memory";

afterEach(() => {
  clearCostArticleCache();
  setContentStorage(undefined);
});

function install(body: string | Uint8Array) {
  const storage = new MemoryContentStorage();
  storage.write(COST_ARTICLES_KEY, body);
  setContentStorage(storage);
  clearCostArticleCache();
}

describe("worker cost-article registry", { concurrency: 1 }, () => {
  test("a packed article round-trips and an unknown slug is absent", () => {
    install(
      encodeCostArticlePack({
        "knee-scope": {
          slug: "knee-scope",
          procedure: "Knee arthroscopy",
          shortName: "knee arthroscopy",
          lastUpdated: "2026-01-01",
          seoTitle: "Knee",
          seoDescription: "Knee cost",
          heading: "Knee arthroscopy cost",
          answer: ["A planning range."],
          indiaCost: ["The stored range."],
          costDrivers: [],
          inclusions: [],
          exclusions: [],
          cities: [],
          destinations: [],
          heroLede: "Chennai has a broader knee-care ecosystem, but this page does not infer outcomes.",
        },
      }),
    );

    const article = getCostArticle("knee-scope");
    assert.equal(article?.procedure, "Knee arthroscopy");
    assert.equal(article?.heroLede, "Chennai has a broader knee-care ecosystem, but this page does not infer outcomes.");
    assert.equal(costArticles["knee-scope"]?.slug, "knee-scope");
    assert.equal(getCostArticle("missing"), undefined);
    assert.equal("missing" in costArticles, false);
    assert.equal(costArticleCacheSize(), 1);
  });

  test("a missing or malformed corpus does not throw", () => {
    install("{");
    assert.equal(getCostArticle("knee-scope"), undefined);
    clearCostArticleCache();
    install("null");
    assert.equal(getCostArticle("knee-scope"), undefined);
    clearCostArticleCache();
    setContentStorage(new MemoryContentStorage());
    assert.equal(getCostArticle("knee-scope"), undefined);
  });

  test("the parsed-article cache stays at its bound", () => {
    const articles: Record<string, { slug: string; prose: string }> = {};
    for (let i = 0; i < COST_ARTICLE_CACHE_MAX + 6; i += 1) {
      articles[`procedure-${i}`] = { slug: `procedure-${i}`, heroLede: `paragraph ${i} `.repeat(40) };
    }
    install(encodeCostArticlePack(articles));
    for (const slug of Object.keys(articles)) getCostArticle(slug);
    assert.equal(costArticleCacheSize(), COST_ARTICLE_CACHE_MAX);
    getCostArticle(`procedure-${COST_ARTICLE_CACHE_MAX + 5}`);
    assert.equal(costArticleCacheSize(), COST_ARTICLE_CACHE_MAX);
    assert.equal(getCostArticle("procedure-0")?.slug, "procedure-0");
  });
});
