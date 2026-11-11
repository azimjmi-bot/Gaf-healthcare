import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";

const SLUG = "appendix-cancer-treatment-hipec-india";

test("the published appendix cancer HIPEC blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Appendix Cancer Treatment in India: Symptoms, HIPEC Surgery and Cost");
  assert.match(post.seoDescription, /appendix cancer|HIPEC|India/i);
  assert.ok((post.keywords?.length ?? 0) >= 10);
  assert.equal(post.canonical, `https://gaf.healthcare/blogs/${SLUG}`);

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
  assert.match(texts, /\$18,000–\$40,000/);
  assert.match(texts, /\$10,000–\$24,000/);
  assert.match(texts, /10–21 nights/);
  assert.doesNotMatch(texts, /₹/);
  assert.doesNotMatch(texts, /Insert the published URL/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency/);
  assert.match(texts, /\/treatments\/hipec-surgery-in-india/);
  assert.match(texts, /\/blogs\/pseudomyxoma-peritonei-treatment/);
  assert.match(texts, /\/blogs\/peritoneal-cancer-index-pci/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.match(texts, /\/doctors\/India\/Delhi-NCR\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.ok(parsePrettyCatalogSegments("India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC".split("/")));

  for (const file of [
    "appendix-cancer-anatomy.webp",
    "appendix-peritoneal-spread.webp",
    "appendix-crs-hipec.webp",
    "appendix-pci-assessment.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 5);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 15);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
  assert.match(readFileSync(join(process.cwd(), "public/llms.txt"), "utf8"), new RegExp(SLUG));

  const arabicPost = listPublishedPosts("ar").find((row) => row.slug === SLUG);
  if (arabicPost) assert.match(arabicPost.title, /[\u0600-\u06FF]/);

  const store = loadCuratedTreatments();
  assert.match(
    store.treatments.find((row) => row.slug === "hipec-surgery-in-india")?.translations.en?.editorialBody ?? "",
    new RegExp(`/blogs/${SLUG}`),
  );
});
