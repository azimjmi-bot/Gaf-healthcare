import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "stage-1-colon-cancer-treatment-in-india";

test("the published Stage 1 colon blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Stage 1 Colon Cancer Treatment in India: Surgery, Pathology and Cost");
  assert.match(post.seoDescription, /T1|T2|colonoscopy|colectomy/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent adult body with a teal colon and a small gold tumour confined to the bowel wall used to explain Stage 1 colon cancer",
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
  assert.match(texts, /The main treatment for Stage 1 colon cancer is complete removal of the cancer/);
  assert.match(texts, /partial colectomy/);
  assert.match(texts, /T1 or T2/);
  assert.match(texts, /chemotherapy is generally not routinely recommended/i);
  assert.match(texts, /\$200–\$550/);
  assert.match(texts, /\$7,000–\$18,000/);
  assert.match(texts, /\$8,000–\$20,000/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency department/);
  assert.match(texts, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/colon-cancer-surgery-in-india/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Colectomy/);
  assert.match(texts, /\/costs\/India\/Gastroenterology\/Colonoscopy/);
  assert.match(texts, /\/doctors\/India\/Surgical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Colectomy",
    "/doctors/India/Mumbai/Surgical-Oncology/Colectomy",
    "/hospitals/India/Delhi-NCR/Surgical-Oncology",
    "/hospitals/India/Mumbai/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Colectomy",
    "/costs/India/Delhi-NCR/Gastroenterology/Colonoscopy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "colon-s1-anatomy.webp",
    "colon-s1-polyp.webp",
    "colon-s1-clinic.webp",
    "colon-s1-nodes.webp",
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
});
