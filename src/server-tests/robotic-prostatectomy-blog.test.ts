import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "robotic-prostatectomy-in-india";

test("the published robotic prostatectomy blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Robotic Prostatectomy in India: Procedure, Recovery & Cost");
  assert.match(post.seoDescription, /robot|nerve-sparing|recovery|cost/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent male body highlighting the lower abdomen and pelvis for robotic prostatectomy planning",
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
  assert.match(texts, /What is robotic prostatectomy\?/);
  assert.match(texts, /How much does robotic prostatectomy cost in India\?/);
  assert.match(texts, /₹2 lakh–₹4 lakh/);
  assert.match(texts, /\$7,000–\$18,000/);
  assert.match(texts, /Nerve-Sparing Robotic Prostatectomy/);
  assert.match(texts, /Robotic vs Open Prostatectomy/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/prostate-cancer-treatment-options-india/);
  assert.match(texts, /\/blogs\/prostate-cancer-treatment-without-surgery/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Radical-Prostatectomy/);
  assert.match(texts, /\/doctors\/India\/Surgical-Oncology\/Radical-Prostatectomy/);
  assert.match(texts, /\/hospitals\/India\/Surgical-Oncology\/Radical-Prostatectomy/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy",
    "/doctors/India/Mumbai/Surgical-Oncology/Radical-Prostatectomy",
    "/hospitals/India/Mumbai/Surgical-Oncology",
    "/hospitals/India/Delhi-NCR/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "rarp-anatomy.webp",
    "rarp-ports.webp",
    "rarp-nerves.webp",
    "rarp-recovery.webp",
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
