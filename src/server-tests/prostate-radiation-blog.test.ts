import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "radiation-therapy-for-prostate-cancer";

test("the published prostate radiation blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Radiation Therapy for Prostate Cancer: Types & Cost");
  assert.match(post.seoDescription, /IMRT|SBRT|brachytherapy|cost/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent male body highlighting the prostate in the pelvis as the target for radiation planning",
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
  assert.match(texts, /What is radiation therapy for prostate cancer\?/);
  assert.match(texts, /How much does prostate cancer radiation therapy cost in India\?/);
  assert.match(texts, /₹2\.56 lakh–₹3\.33 lakh/);
  assert.match(texts, /\$6,500–\$14,500/);
  assert.match(texts, /IMRT for Prostate Cancer/);
  assert.match(texts, /SBRT for Prostate Cancer/);
  assert.match(texts, /Brachytherapy for Prostate Cancer/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/prostate-cancer-treatment-without-surgery/);
  assert.match(texts, /\/blogs\/robotic-prostatectomy-in-india/);
  assert.match(texts, /\/costs\/India\/Radiation-Oncology\/EBRT/);
  assert.match(texts, /\/costs\/India\/Radiation-Oncology\/IMRT/);
  assert.match(texts, /\/costs\/India\/Radiation-Oncology\/SBRT/);
  assert.match(texts, /\/costs\/India\/Radiation-Oncology\/Brachytherapy/);
  assert.match(texts, /\/doctors\/India\/Radiation-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Radiation-Oncology",
    "/doctors/India/Mumbai/Radiation-Oncology",
    "/hospitals/India/Mumbai/Radiation-Oncology",
    "/hospitals/India/Delhi-NCR/Radiation-Oncology",
    "/costs/India/Delhi-NCR/Radiation-Oncology/EBRT",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "pca-rad-anatomy.webp",
    "pca-rad-ebrt.webp",
    "pca-rad-brachy.webp",
    "pca-rad-followup.webp",
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
