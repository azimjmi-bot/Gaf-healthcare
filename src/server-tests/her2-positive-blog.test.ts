import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "her2-positive-breast-cancer-treatment-india";

test("the published HER2-positive blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(
    post.seoTitle,
    "HER2-Positive Breast Cancer Treatment in India | Targeted Therapy & Cost",
  );
  assert.match(post.seoDescription, /trastuzumab|HER2|targeted/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "image") return block.src;
      if (block.type === "html") return block.html;
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/er-pr-her2-breast-cancer-treatment-india/);
  assert.match(texts, /\/blogs\/breast-cancer-diagnosis-tests-biopsy-er-pr-her2/);
  assert.match(texts, /\/blogs\/breast-cancer-treatment-cost-in-india/);
  assert.match(texts, /\/blogs\/breast-cancer-treatment-india-international-patients/);
  for (const path of [
    "/costs/India/Medical-Oncology/Targeted-Therapy",
    "/doctors/India/Medical-Oncology/Targeted-Therapy",
    "/costs/India/Medical-Oncology/Chemotherapy",
    "/doctors/India/Medical-Oncology/Chemotherapy",
    "/costs/India/Medical-Oncology/Hormone-Therapy",
    "/doctors/India/Medical-Oncology/Hormone-Therapy",
    "/costs/India/Surgical-Oncology/Lumpectomy",
    "/doctors/India/Surgical-Oncology/Mastectomy",
    "/doctors/India/Delhi-NCR",
    "/doctors/India/Mumbai",
    "/doctors/India/Bengaluru",
    "/doctors/India/Chennai",
    "/doctors/India/Hyderabad",
    "/hospitals/India/Delhi-NCR",
    "/hospitals/India/Mumbai",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    const segments = path.split("/").slice(2);
    assert.ok(parsePrettyCatalogSegments(segments), path);
  }

  for (const file of [
    "her2-positive-receptors-visual.webp",
    "her2-positive-infusion-visual.webp",
    "her2-positive-team-visual.webp",
    "her2-positive-heart-monitor-visual.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  const whatsapp = (texts.match(/wa\.me\/919044346292/g) ?? []).length;
  assert.ok(whatsapp >= 3, `expected WhatsApp CTAs, found ${whatsapp}`);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 10);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);

  const sitemap = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(sitemap.some((url) => url.endsWith(`/blogs/${SLUG}`)));
});
