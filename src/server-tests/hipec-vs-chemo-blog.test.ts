import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";

const SLUG = "hipec-vs-conventional-chemotherapy";

test("the published HIPEC vs chemotherapy blog is complete, interlinked and indexed", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "HIPEC vs Chemotherapy: Differences, Benefits, Risks and Treatment in India");
  assert.match(post.seoDescription, /HIPEC|chemotherapy|India/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
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
  assert.match(texts, /\$1,500–\$8,000\+/);
  assert.match(texts, /10–21 nights/);
  assert.match(texts, /PRODIGE 7|ASCO/);
  assert.doesNotMatch(texts, /₹/);
  assert.doesNotMatch(texts, /Insert the published URL|live GAF Healthcare URL/i);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency/);
  assert.match(texts, /\/treatments\/hipec-surgery-in-india/);
  assert.match(texts, /\/treatments\/chemotherapy-in-india/);
  assert.match(texts, /\/blogs\/what-is-hipec-surgery/);
  assert.match(texts, /\/blogs\/peritoneal-cancer-index-pci/);
  assert.match(texts, /\/blogs\/appendix-cancer-treatment-hipec-india/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.match(texts, /\/consult/);
  assert.ok(parsePrettyCatalogSegments("India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC".split("/")));

  for (const file of [
    "hipec-vs-chemo-compare.webp",
    "hipec-vs-chemo-systemic.webp",
    "hipec-vs-chemo-hipec.webp",
    "hipec-vs-chemo-decision.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 5);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 15);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
  assert.match(readFileSync(join(process.cwd(), "public/llms.txt"), "utf8"), new RegExp(SLUG));

  const store = loadCuratedTreatments();
  assert.match(
    store.treatments.find((row) => row.slug === "hipec-surgery-in-india")?.translations.en?.editorialBody ?? "",
    new RegExp(`/blogs/${SLUG}`),
  );
  assert.match(
    store.treatments.find((row) => row.slug === "chemotherapy-in-india")?.translations.en?.editorialBody ?? "",
    new RegExp(`/blogs/${SLUG}`),
  );
});
