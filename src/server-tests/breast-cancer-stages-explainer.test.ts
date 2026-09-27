import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-stages-0-1-2-3-4";

test("the published stages explainer is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Breast Cancer Stages 0–4 Explained | Treatment in India");
  assert.match(post.seoDescription, /stage/i);
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
  assert.match(texts, /\/blogs\/breast-cancer-treatment-cost-in-india/);
  for (const path of [
    "/costs/India/Surgical-Oncology/Lumpectomy",
    "/doctors/India/Surgical-Oncology/Lumpectomy",
    "/costs/India/Surgical-Oncology/Mastectomy",
    "/costs/India/Medical-Oncology/Chemotherapy",
    "/costs/India/Medical-Oncology/Hormone-Therapy",
    "/costs/India/Medical-Oncology/Targeted-Therapy",
    "/costs/India/Medical-Oncology/Immunotherapy",
    "/costs/India/Radiation-Oncology/EBRT",
    "/doctors/India/Delhi-NCR",
    "/doctors/India/Mumbai",
    "/doctors/India/Bengaluru",
    "/doctors/India/Chennai",
    "/doctors/India/Hyderabad",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    const segments = path.split("/").slice(2);
    assert.ok(parsePrettyCatalogSegments(segments), path);
  }

  for (const file of [
    "breast-cancer-stages-visual.png",
    "breast-cancer-tnm-visual.png",
    "breast-cancer-extent-visual.png",
    "breast-cancer-stage-pathways-visual.png",
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
