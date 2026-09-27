import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-diagnosis-tests-biopsy-er-pr-her2";

test("the published diagnosis blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Breast Cancer Diagnosis in India | Biopsy, ER, PR & HER2 Tests");
  assert.match(post.seoDescription, /biopsy|HER2|mammography/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "image") return block.src;
      if (block.type === "html") return block.html;
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/breast-cancer-treatment-by-stage/);
  assert.match(texts, /\/blogs\/breast-cancer-stages-0-1-2-3-4/);
  assert.match(texts, /\/blogs\/breast-cancer-treatment-cost-in-india/);
  assert.match(texts, /\/blogs\/er-pr-her2-breast-cancer-treatment-india/);
  for (const path of [
    "/costs/India/Medical-Oncology/Hormone-Therapy",
    "/doctors/India/Medical-Oncology/Hormone-Therapy",
    "/costs/India/Medical-Oncology/Targeted-Therapy",
    "/doctors/India/Medical-Oncology/Targeted-Therapy",
    "/costs/India/Medical-Oncology/Chemotherapy",
    "/costs/India/Medical-Oncology/Immunotherapy",
    "/costs/India/Surgical-Oncology/Lumpectomy",
    "/costs/India/Surgical-Oncology/Mastectomy",
    "/doctors/India/Delhi-NCR",
    "/doctors/India/Mumbai",
    "/doctors/India/Bengaluru",
    "/doctors/India/Chennai",
    "/doctors/India/Hyderabad",
    "/hospitals/India/Delhi-NCR",
    "/hospitals/India/Mumbai",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    const segments = path.split("/").slice(2);
    assert.ok(parsePrettyCatalogSegments(segments), path);
  }

  for (const file of [
    "breast-cancer-diagnosis-imaging-visual.png",
    "breast-cancer-diagnosis-biopsy-visual.png",
    "breast-cancer-diagnosis-pathology-visual.png",
    "breast-cancer-diagnosis-staging-visual.png",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 10);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);

  const sitemap = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(sitemap.some((url) => url.endsWith(`/blogs/${SLUG}`)));
});
