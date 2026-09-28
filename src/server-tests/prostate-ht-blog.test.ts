import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "hormone-therapy-for-prostate-cancer";

test("the published hormone therapy blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Hormone Therapy for Prostate Cancer: ADT, Medicines, Side Effects");
  assert.match(post.seoDescription, /ADT|ARPI|abiraterone/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent male body with teal adrenal glands, teal bladder, gold prostate and modest gold testicular overlay used to explain androgen deprivation",
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
  assert.match(texts, /Leuprolide/);
  assert.match(texts, /Goserelin/);
  assert.match(texts, /Triptorelin/);
  assert.match(texts, /Degarelix/);
  assert.match(texts, /Relugolix/);
  assert.match(texts, /Abiraterone/);
  assert.match(texts, /Enzalutamide/);
  assert.match(texts, /Apalutamide/);
  assert.match(texts, /Darolutamide/);
  assert.match(texts, /18–36 months/);
  assert.match(texts, /Hormone therapy alone usually does not cure prostate cancer/);
  assert.match(texts, /\$1,000–\$4,500/);
  assert.match(texts, /\$7,000–\$18,000/);
  assert.match(texts, /\$1,000–\$6,000\+/);
  assert.match(texts, /\$6,500–\$14,500/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency department/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/radiation-therapy-for-prostate-cancer/);
  assert.match(texts, /\/blogs\/lutetium-177-psma-therapy-in-india/);
  assert.match(texts, /\/blogs\/psma-pet-scan-for-prostate-cancer/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Hormone-Therapy/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Radical-Prostatectomy/);
  assert.match(texts, /\/doctors\/India\/Medical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Medical-Oncology",
    "/doctors/India/Mumbai/Medical-Oncology",
    "/hospitals/India/Delhi-NCR/Medical-Oncology",
    "/hospitals/India/Mumbai/Medical-Oncology",
    "/costs/India/Delhi-NCR/Medical-Oncology/Hormone-Therapy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of ["pca-ht-anatomy.webp", "pca-ht-clinic.webp", "pca-ht-bones.webp", "pca-ht-heart.webp"]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
