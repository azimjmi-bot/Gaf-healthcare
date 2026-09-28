import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "prostate-cancer-diet";

test("the published prostate diet blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Prostate Cancer Diet: What to Eat During Treatment");
  assert.match(post.seoDescription, /eat|ADT|protein|diet/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent male body with the digestive tract in teal and a gold highlight on the prostate in the pelvis",
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
  assert.match(texts, /no single prostate cancer diet that can cure cancer or replace medical treatment/);
  assert.match(texts, /more calories and protein/);
  assert.match(texts, /hormone therapy \(ADT\)/);
  assert.match(texts, /\$1,000–\$4,500/);
  assert.match(texts, /\$1,000–\$6,000\+/);
  assert.match(texts, /\$7,000–\$18,000/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/radiation-therapy-for-prostate-cancer/);
  assert.match(texts, /\/blogs\/brachytherapy-for-prostate-cancer/);
  assert.match(texts, /\/blogs\/robotic-prostatectomy-in-india/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Hormone-Therapy/);
  assert.match(texts, /\/doctors\/India\/Radiation-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Radiation-Oncology",
    "/doctors/India/Mumbai/Medical-Oncology",
    "/hospitals/India/Mumbai/Radiation-Oncology",
    "/hospitals/India/Delhi-NCR/Radiation-Oncology",
    "/costs/India/Delhi-NCR/Medical-Oncology/Hormone-Therapy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "pca-diet-anatomy.webp",
    "pca-diet-adt.webp",
    "pca-diet-radiation.webp",
    "pca-diet-protein.webp",
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
