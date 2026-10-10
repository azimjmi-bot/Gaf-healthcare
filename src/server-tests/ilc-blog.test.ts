import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "invasive-lobular-carcinoma-treatment-india";

test("the published ILC blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Invasive Lobular Carcinoma: Treatment & Cost in India");
  assert.match(post.seoDescription, /lobular|surgery|hormone/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Invasive lobular carcinoma showing cancer cells spreading through the breast lobules and surrounding tissue",
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
  assert.match(texts, /What is invasive lobular carcinoma\?/);
  assert.match(texts, /ILC vs Invasive Ductal Carcinoma/);
  assert.match(texts, /Why Does ILC Grow Differently\?/);
  assert.match(texts, /Hormone Therapy for Invasive Lobular Carcinoma/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.doesNotMatch(texts, /Possible changes include:/);
  assert.doesNotMatch(texts, /Instead of saying:/);
  assert.doesNotMatch(texts, /It can instead cause:/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/breast-cancer-pathology-report-explained/);
  assert.match(texts, /\/doctors\/India\/Surgical-Oncology\/Mastectomy/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Hormone-Therapy/);
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
    "ilc-consult-visual.webp",
    "ilc-imaging-visual.webp",
    "ilc-surgery-visual.webp",
    "ilc-followup-visual.webp",
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
