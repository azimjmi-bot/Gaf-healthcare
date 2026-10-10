import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "lutetium-177-psma-therapy-in-india";

test("the published Lu-177 PSMA blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Lutetium-177 PSMA Therapy in India: Eligibility, Cost, Side Effects");
  assert.match(post.seoDescription, /Lu-177|PSMA|radioligand/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent male body with a gold prostate, teal pelvic nodes and gold traces along the spine used to explain PSMA-targeted radioligand therapy",
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
  assert.match(texts, /7\.4 GBq \(200 mCi\) every 6 weeks/);
  assert.match(texts, /₹3\.5 lakh–₹7 lakh per cycle/);
  assert.match(texts, /VISION/);
  assert.match(texts, /\$7,000–\$18,000/);
  assert.match(texts, /\$1,000–\$6,000\+/);
  assert.match(texts, /\$6,500–\$14,500/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/prostate-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet/);
  assert.match(texts, /\/blogs\/prostate-cancer-stages-1-to-4/);
  assert.match(texts, /\/blogs\/prostate-cancer-treatment-without-surgery/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Hormone-Therapy/);
  assert.match(texts, /\/doctors\/India\/Medical-Oncology/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Medical-Oncology",
    "/doctors/India/Mumbai/Medical-Oncology",
    "/hospitals/India/Delhi-NCR/Medical-Oncology",
    "/hospitals/India/Mumbai/Medical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of ["pca-lu-anatomy.webp", "pca-lu-infusion.webp", "pca-lu-organs.webp", "pca-lu-bones.webp"]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
