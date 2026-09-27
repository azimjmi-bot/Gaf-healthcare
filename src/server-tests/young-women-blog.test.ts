import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-in-young-women-treatment-india";

test("the published young-women blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Breast Cancer in Young Women: Symptoms, Treatment & Cost in India");
  assert.match(post.seoDescription, /fertility|symptoms|young/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Breast cancer awareness and treatment in a young woman with multidisciplinary cancer care",
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
  assert.match(texts, /Can young women get breast cancer\?/);
  assert.match(texts, /What Age Is Considered "Young" for Breast Cancer\?/);
  assert.match(texts, /Breast Cancer and Fertility/);
  assert.match(texts, /What Fertility Preservation Options Are Available\?/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.doesNotMatch(texts, /Doctors still need to determine:/);
  assert.doesNotMatch(texts, /A woman may notice:/);
  assert.doesNotMatch(texts, /Imaging may then include:/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/breast-cancer-during-pregnancy-treatment-india/);
  assert.match(texts, /\/doctors\/India\/Surgical-Oncology\/Mastectomy/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Chemotherapy/);
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
    "young-women-consult-visual.webp",
    "young-women-imaging-visual.webp",
    "young-women-fertility-visual.webp",
    "young-women-followup-visual.webp",
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
