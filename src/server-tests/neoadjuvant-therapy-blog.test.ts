import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-neoadjuvant-therapy";

test("the published neoadjuvant-therapy blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Breast Cancer Neoadjuvant Therapy: Treatment Before Surgery in India");
  assert.match(post.seoDescription, /neoadjuvant|chemotherapy|surgery/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Neoadjuvant breast cancer treatment before surgery showing chemotherapy and tumor response",
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
  assert.match(texts, /What is neoadjuvant therapy for breast cancer\?/);
  assert.match(texts, /What Is Pathological Complete Response\?/);
  assert.match(texts, /Neoadjuvant Therapy for Triple-Negative Breast Cancer/);
  assert.match(texts, /Neoadjuvant Therapy vs Adjuvant Therapy/);
  assert.doesNotMatch(texts, /Depending on the type of breast cancer, it can involve:/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/chemotherapy-for-breast-cancer-in-india/);
  assert.match(texts, /\/blogs\/her2-positive-breast-cancer-treatment-india/);
  for (const path of [
    "/doctors/India/Delhi-NCR",
    "/doctors/India/Mumbai",
    "/hospitals/India/Mumbai",
    "/hospitals/India/Delhi-NCR",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "neoadjuvant-infusion-visual.webp",
    "neoadjuvant-consult-visual.webp",
    "neoadjuvant-imaging-visual.webp",
    "neoadjuvant-recovery-visual.webp",
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
