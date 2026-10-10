import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "colon-cancer-immunotherapy-in-india";

test("the published colon immunotherapy blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Colon Cancer Immunotherapy in India: MSI-H, Pembrolizumab and Nivolumab");
  assert.match(post.seoDescription, /MSI-H|pembrolizumab|nivolumab/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Transparent adult body with a teal colon and a gold tumour used to explain MSI-H/dMMR colon cancer immunotherapy",
  );

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "heading") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "list") return block.items.join("\n");
      if (block.type === "image") return block.src;
      if (block.type === "html") return block.html;
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /Immunotherapy is most clearly established in colon cancer when the tumor is MSI-H or dMMR/);
  assert.match(texts, /not routinely recommended outside appropriate clinical trials/);
  assert.match(texts, /Is the colon cancer MSI-H\/dMMR or MSS\/pMMR\?/);
  assert.match(texts, /Pembrolizumab/);
  assert.match(texts, /Nivolumab/);
  assert.match(texts, /CheckMate-8HW/);
  assert.match(texts, /KEYNOTE-177/);
  assert.match(texts, /ATOMIC/);
  assert.match(texts, /\$15,000–\$45,000/);
  assert.match(texts, /\$2,000–\$7,000/);
  assert.match(texts, /\$1,500–\$8,000\+/);
  assert.match(texts, /\$8,000–\$30,000/);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency department/);
  assert.match(texts, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/colon-cancer-surgery-in-india/);
  assert.match(texts, /\/blogs\/colon-cancer-chemotherapy-in-india/);
  assert.match(texts, /\/blogs\/stage-4-colon-cancer-treatment-in-india/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Immunotherapy/);
  assert.match(texts, /\/costs\/India\/Medical-Oncology\/Precision-Oncology/);
  assert.doesNotMatch(texts, /₹|lakh|Kolkata|Ahmedabad|Pune|Kochi/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Medical-Oncology/Immunotherapy",
    "/doctors/India/Mumbai/Medical-Oncology/Immunotherapy",
    "/hospitals/India/Delhi-NCR/Medical-Oncology",
    "/hospitals/India/Mumbai/Medical-Oncology",
    "/costs/India/Delhi-NCR/Medical-Oncology/Immunotherapy",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "colon-io-anatomy.webp",
    "colon-io-immune.webp",
    "colon-io-infusion.webp",
    "colon-io-clinic.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));

  const surgery = getPost("colon-cancer-surgery-in-india", "en");
  assert.ok(surgery?.relatedLinks.some((link) => link.href === `/blogs/${SLUG}`));
  const chemo = getPost("colon-cancer-chemotherapy-in-india", "en");
  assert.ok(chemo?.relatedLinks.some((link) => link.href === `/blogs/${SLUG}`));
  const stage4 = getPost("stage-4-colon-cancer-treatment-in-india", "en");
  assert.ok(stage4?.relatedLinks.some((link) => link.href === `/blogs/${SLUG}`));
});
