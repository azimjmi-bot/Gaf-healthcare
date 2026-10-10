import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "stage-2-colon-cancer-treatment-in-india";

test("the published Stage 2 colon blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Stage 2 Colon Cancer Treatment in India: Surgery, Risk and Chemo");
  assert.match(post.seoDescription, /T3|T4|MSI|chemotherapy|high-risk/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent adult body with a teal colon and a gold tumour invading through the bowel wall used to explain Stage 2 colon cancer",
  );

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "heading") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "list") return block.items.join("\n");
      if (block.type === "image") return block.src;
      if (block.type === "html") return block.html;
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /The main treatment for Stage 2 colon cancer is surgery to completely remove the cancer and nearby lymph nodes/);
  assert.match(texts, /Low-risk Stage 2/);
  assert.match(texts, /High-risk Stage 2/);
  assert.match(texts, /dMMR\/MSI-H/);
  assert.match(texts, /\$7,000–\$18,000/);
  assert.match(texts, /\$1,500–\$8,000\+/);
  assert.match(texts, /\$2,000–\$7,000/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency department/);
  assert.match(texts, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/colon-cancer-surgery-in-india/);
  assert.match(texts, /\/blogs\/stage-1-colon-cancer-treatment-in-india/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Colectomy/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Chemotherapy/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Precision-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Colectomy",
    "/doctors/India/Mumbai/Surgical-Oncology/Colectomy",
    "/hospitals/India/Delhi-NCR/Surgical-Oncology",
    "/hospitals/India/Mumbai/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Colectomy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "colon-s2-anatomy.webp",
    "colon-s2-t4.webp",
    "colon-s2-clinic.webp",
    "colon-s2-nodes.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));

  const surgery = getPost("colon-cancer-surgery-in-india", "en");
  assert.ok(surgery?.relatedLinks.some((link) => link.href === `/blogs/${SLUG}`));
  const stage1 = getPost("stage-1-colon-cancer-treatment-in-india", "en");
  assert.ok(stage1?.relatedLinks.some((link) => link.href === `/blogs/${SLUG}`));
});
