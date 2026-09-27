import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "brachytherapy-for-prostate-cancer";

test("the published prostate brachytherapy blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Brachytherapy for Prostate Cancer: Procedure & Cost");
  assert.match(post.seoDescription, /LDR|HDR|brachytherapy|cost/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent male body highlighting the prostate in the pelvis as the target for internal radiation",
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
  assert.match(texts, /What is brachytherapy for prostate cancer\?/);
  assert.match(texts, /How much does prostate brachytherapy cost in India\?/);
  assert.match(texts, /₹1 lakh to ₹2\.5 lakh/);
  assert.match(texts, /\$5,500–\$13,000/);
  assert.match(texts, /Low-Dose-Rate Brachytherapy/);
  assert.match(texts, /High-Dose-Rate Brachytherapy/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/radiation-therapy-for-prostate-cancer/);
  assert.match(texts, /\/blogs\/robotic-prostatectomy-in-india/);
  assert.match(texts, /\/costs\/India\/Radiation-Oncology\/Brachytherapy/);
  assert.match(texts, /\/doctors\/India\/Radiation-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Radiation-Oncology",
    "/doctors/India/Mumbai/Radiation-Oncology",
    "/hospitals/India/Mumbai/Radiation-Oncology",
    "/hospitals/India/Delhi-NCR/Radiation-Oncology",
    "/costs/India/Delhi-NCR/Radiation-Oncology/Brachytherapy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "pca-brachy-anatomy.webp",
    "pca-brachy-ldr.webp",
    "pca-brachy-hdr.webp",
    "pca-brachy-followup.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
