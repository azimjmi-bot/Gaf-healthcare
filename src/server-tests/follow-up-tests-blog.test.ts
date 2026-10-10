import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-follow-up-tests";

test("the published follow-up tests blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Breast Cancer Follow-Up Tests: Mammogram, MRI, Blood Tests & Scans");
  assert.match(post.seoDescription, /mammogram|MRI|PET-CT|blood/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Breast cancer follow-up tests including mammogram MRI PET CT and blood tests after treatment",
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
  assert.match(texts, /What tests are usually done after breast cancer treatment\?/);
  assert.match(texts, /Why Is Follow-Up Needed After Breast Cancer Treatment\?/);
  assert.match(texts, /What About CA 15-3 and CEA\?/);
  assert.match(texts, /Do I Need a PET-CT, CT or Bone Scan\?/);
  assert.doesNotMatch(texts, /Your doctor may ask about:/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/breast-cancer-diagnosis-tests-biopsy-er-pr-her2/);
  assert.match(texts, /\/blogs\/breast-cancer-recurrence-treatment-india/);
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
    "followup-tests-mammogram-visual.webp",
    "followup-tests-consult-visual.webp",
    "followup-tests-mri-visual.webp",
    "followup-tests-blood-visual.webp",
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
