import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-chemotherapy-side-effects";

test("the published chemotherapy side-effects blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Breast Cancer Chemotherapy Side Effects: Hair Loss, Nausea & Recovery");
  assert.match(post.seoDescription, /hair loss|nausea|neuropathy|fertility|recovery/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Breast cancer chemotherapy side effects including hair loss nausea fatigue neuropathy and recovery",
  );

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "heading") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "image") return block.src;
      if (block.type === "html") return block.html;
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /What are the most common chemotherapy side effects in breast cancer\?/);
  assert.match(texts, /Can chemotherapy affect fertility\?/);
  assert.match(texts, /1\. Hair Loss During Breast Cancer Chemotherapy/);
  assert.match(texts, /What Is Neutropenia\?/);
  assert.match(texts, /12\. Hand-Foot Syndrome/);
  assert.match(texts, /17\. Can Chemotherapy Cause Long-Term Side Effects\?/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/chemotherapy-for-breast-cancer-in-india/);
  assert.match(texts, /\/blogs\/breast-cancer-hormone-therapy-side-effects/);
  assert.match(texts, /\/blogs\/breast-cancer-targeted-therapy-side-effects/);
  assert.match(texts, /\/blogs\/her2-positive-breast-cancer-treatment-india/);
  for (const path of [
    "/doctors/India/Medical-Oncology/Chemotherapy",
    "/costs/India/Medical-Oncology/Chemotherapy",
    "/doctors/India/Medical-Oncology/Targeted-Therapy",
    "/doctors/India/Medical-Oncology/Hormone-Therapy",
    "/doctors/India/Delhi-NCR",
    "/hospitals/India/Mumbai",
    "/hospitals/India/Delhi-NCR",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "chemo-side-effects-infusion-visual.webp",
    "chemo-side-effects-fatigue-visual.webp",
    "chemo-side-effects-neuropathy-visual.webp",
    "chemo-side-effects-blood-visual.webp",
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
