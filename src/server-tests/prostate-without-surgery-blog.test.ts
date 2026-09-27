import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "prostate-cancer-treatment-without-surgery";

test("the published non-surgical prostate blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Prostate Cancer Treatment Without Surgery: Options");
  assert.match(post.seoDescription, /without surgery|active surveillance|radiation|hormone/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Sagittal male pelvis showing the bladder above the prostate, used to explain treatment that leaves the gland in place",
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
  assert.match(texts, /Can prostate cancer be treated without surgery\?/);
  assert.match(texts, /“without surgery” does not mean “without treatment.”/);
  assert.match(texts, /Active Surveillance/);
  assert.match(texts, /Watchful Waiting/);
  assert.match(texts, /External Beam Radiation Therapy/);
  assert.match(texts, /Brachytherapy/);
  assert.match(texts, /Hormone Therapy/);
  assert.match(texts, /Lutetium-177 PSMA/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/prostate-cancer-treatment-options-india/);
  assert.match(texts, /\/costs\/India\/Radiation-Oncology\/EBRT/);
  assert.match(texts, /\/costs\/India\/Radiation-Oncology\/Brachytherapy/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Hormone-Therapy/);
  assert.match(texts, /\/doctors\/India\/Radiation-Oncology/);
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
    "pca-nonsurg-anatomy.webp",
    "pca-nonsurg-surveillance.webp",
    "pca-nonsurg-radiation.webp",
    "pca-nonsurg-systemic.webp",
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
