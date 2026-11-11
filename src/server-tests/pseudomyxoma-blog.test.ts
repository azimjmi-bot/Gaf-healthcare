import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";

const SLUG = "pseudomyxoma-peritonei-treatment";

test("the published PMP blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(
    post.seoTitle,
    "Pseudomyxoma Peritonei Treatment in India: CRS-HIPEC, Symptoms and Cost",
  );
  assert.match(post.seoDescription, /pseudomyxoma peritonei|PMP|CRS-HIPEC|India/i);
  assert.ok((post.keywords?.length ?? 0) >= 10);
  assert.equal(post.canonical, `https://gaf.healthcare/blogs/${SLUG}`);
  assert.match(
    post.imageAlt ?? "",
    /mucin accumulating inside the abdominal cavity/i,
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
  assert.match(texts, /<table>/);
  assert.match(texts, /What is pseudomyxoma peritonei\?/i);
  assert.match(texts, /\$18,000–\$40,000/);
  assert.match(texts, /\$10,000–\$24,000/);
  assert.match(texts, /\$7,000–\$16,000/);
  assert.match(texts, /10–21 nights/);
  assert.doesNotMatch(texts, /₹/);
  assert.doesNotMatch(texts, /\blakh\b/i);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency department/i);
  assert.match(texts, /\/treatments\/hipec-surgery-in-india/);
  assert.match(texts, /\/treatments\/intraperitoneal-chemotherapy-in-india/);
  assert.match(texts, /\/treatments\/colon-cancer-treatment-in-india/);
  assert.match(texts, /\/treatments\/ovarian-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/stage-4-colon-cancer-treatment-in-india/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Cytoreductive-Surgery-with-HIPEC/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/Cytoreductive-Surgery/);
  assert.match(texts, /\/costs\/India\/Surgical-Oncology\/PIPAC/);
  assert.match(texts, /\/doctors\/India\/Surgical-Oncology/);
  assert.doesNotMatch(texts, /\/blog\/pseudomyxoma/);
  assert.doesNotMatch(texts, /Insert the published URL/);

  for (const path of [
    "/doctors/India/Delhi-NCR/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/doctors/India/Mumbai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/doctors/India/Bengaluru/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/doctors/India/Chennai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/doctors/India/Hyderabad/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/hospitals/India/Delhi-NCR/Surgical-Oncology",
    "/hospitals/India/Mumbai/Surgical-Oncology",
    "/costs/India/Delhi-NCR/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
    "/costs/India/Mumbai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "pmp-mucin-abdomen.webp",
    "pmp-appendix-spread.webp",
    "pmp-crs-hipec.webp",
    "pmp-pci-regions.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 5, `expected >=5 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 15);

  const arabicPost = listPublishedPosts("ar").find((row) => row.slug === SLUG);
  if (arabicPost) assert.match(arabicPost.title, /[\u0600-\u06FF]/);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));

  const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
  assert.match(llms, /pseudomyxoma-peritonei-treatment/);

  const store = loadCuratedTreatments();
  const hipec = store.treatments.find((row) => row.slug === "hipec-surgery-in-india");
  assert.match(
    hipec?.translations.en?.editorialBody ?? "",
    /\/blogs\/pseudomyxoma-peritonei-treatment/,
  );

  const ip = store.treatments.find((row) => row.slug === "intraperitoneal-chemotherapy-in-india");
  assert.match(
    ip?.translations.en?.editorialBody ?? "",
    /\/blogs\/pseudomyxoma-peritonei-treatment/,
  );
});
