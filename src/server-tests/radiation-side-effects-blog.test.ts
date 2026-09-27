import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-radiation-side-effects";

test("the published radiation side-effects blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Breast Cancer Radiation Side Effects: Skin, Fatigue & Recovery");
  assert.match(post.seoDescription, /skin|fatigue|lymphedema|heart|lung/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Breast cancer radiation therapy side effects including skin changes fatigue swelling and recovery",
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
  assert.match(texts, /What are the most common side effects of breast cancer radiation\?/);
  assert.match(texts, /Why Is Radiation Used for Breast Cancer\?/);
  assert.match(texts, /What Is Deep Inspiration Breath Hold\?/);
  assert.match(texts, /Can Radiation Cause Lymphedema\?/);
  assert.doesNotMatch(texts, /The most common early effects include:/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/radiation-therapy-for-breast-cancer/);
  assert.match(texts, /\/blogs\/breast-cancer-lymphedema/);
  assert.match(texts, /\/blogs\/lumpectomy-vs-mastectomy/);
  assert.match(texts, /\/doctors\/India\/Surgical-Oncology\/Breast-Conserving-Surgery/);
  for (const path of [
    "/doctors/India/Radiation-Oncology",
    "/doctors/India/Delhi-NCR",
    "/hospitals/India/Mumbai",
    "/hospitals/India/Delhi-NCR",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "radiation-side-effects-planning-visual.webp",
    "radiation-side-effects-skin-visual.webp",
    "radiation-side-effects-fatigue-visual.webp",
    "radiation-side-effects-followup-visual.webp",
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
