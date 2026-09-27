import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-targeted-therapy-side-effects";

test("the published targeted-therapy side-effects blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(
    post.seoTitle,
    "Breast Cancer Targeted Therapy Side Effects: HER2 Treatment & Monitoring",
  );
  assert.match(post.seoDescription, /HER2|heart|diarrhea|liver/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Breast cancer targeted therapy and HER2 treatment side effects and monitoring",
  );

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
  assert.match(texts, /What is targeted therapy for breast cancer\?/);
  assert.match(texts, /Can HER2-targeted therapy affect the heart\?/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/her2-positive-breast-cancer-treatment-india/);
  assert.match(texts, /\/blogs\/er-pr-her2-breast-cancer-treatment-india/);
  assert.match(texts, /\/blogs\/breast-cancer-diagnosis-tests-biopsy-er-pr-her2/);
  assert.match(texts, /\/blogs\/hormone-therapy-breast-cancer-india/);
  assert.match(texts, /\/blogs\/chemotherapy-for-breast-cancer-in-india/);
  for (const path of [
    "/doctors/India/Medical-Oncology/Targeted-Therapy",
    "/costs/India/Medical-Oncology/Targeted-Therapy",
    "/costs/India/Medical-Oncology/Chemotherapy",
    "/costs/India/Medical-Oncology/Hormone-Therapy",
    "/costs/India/Medical-Oncology/Immunotherapy",
    "/doctors/India/Delhi-NCR",
    "/doctors/India/Mumbai",
    "/hospitals/India/Mumbai",
    "/hospitals/India/Delhi-NCR",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "targeted-therapy-side-effects-infusion-visual.webp",
    "targeted-therapy-side-effects-heart-visual.webp",
    "targeted-therapy-side-effects-blood-visual.webp",
    "targeted-therapy-side-effects-followup-visual.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 10);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
