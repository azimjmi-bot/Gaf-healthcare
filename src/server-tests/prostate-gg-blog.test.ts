import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "gleason-score-grade-group-prostate-cancer";

test("the published Gleason Grade Group blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Gleason Score and Grade Group in Prostate Cancer");
  assert.match(post.seoDescription, /Gleason|Grade Group|3\+4/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent male body with a teal bladder above a gold-highlighted prostate in the pelvis",
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
  assert.match(texts, /Gleason score is not the same as prostate cancer stage/);
  assert.match(texts, /3\+4=7/);
  assert.match(texts, /4\+3=7/);
  assert.match(texts, /Grade Group 1/);
  assert.match(texts, /\$7,000–\$18,000/);
  assert.match(texts, /\$1,000–\$6,000\+/);
  assert.match(texts, /\$6,500–\$14,500/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/active-surveillance-prostate-cancer/);
  assert.match(texts, /\/blogs\/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet/);
  assert.match(texts, /\/blogs\/robotic-prostatectomy-in-india/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Radical-Prostatectomy/);
  assert.match(texts, /\/doctors\/India\/Surgical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology",
    "/doctors/India/Mumbai/Radiation-Oncology",
    "/hospitals/India/Delhi-NCR/Surgical-Oncology",
    "/hospitals/India/Mumbai/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of ["pca-gg-anatomy.webp", "pca-gg-pathology.webp", "pca-gg-localized.webp", "pca-gg-stage.webp"]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
