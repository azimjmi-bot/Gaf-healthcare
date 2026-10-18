import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { getPublishedCuratedTreatment } from "@/lib/cms/curated-treatment-store";

const SLUG = "cardiac-ablation-cost-in-india";

test("the cardiac ablation cost guide is published, quoted without a price range, and indexed in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "Cardiac Ablation Cost in India: Types, Procedure & Recovery");
  assert.match(post.seoDescription, /cardiac ablation cost in India/i);
  assert.ok((post.keywords?.length ?? 0) >= 12);

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph" || block.type === "heading" || block.type === "quote") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "image") return `${block.src} ${block.alt}`;
      if (block.type === "html") return block.html;
      if (block.type === "list") return block.items.join("\n");
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /Do not compare quotations based only on the words/);
  assert.doesNotMatch(texts, /₹|\$\s?\d|Rs\.?\s?\d|INR\s?\d/);
  assert.doesNotMatch(texts, /\/blogs\/(?:electrophysiologist-vs-cardiologist|pacemaker-cost-in-india|icd-implantation-cost-in-india|heart-surgery-recovery-in-india|travelling-to-india-for-heart-treatment|best-cardiologists-for-atrial-fibrillation)/);

  for (const path of [
    "/costs/India/Cardiology/Atrial-Fibrillation-Ablation",
    "/costs/India/Cardiology/Radiofrequency-Ablation",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/costs/India/Cardiology/ICD-Implantation-Implantable-Cardioverter-Defibrillator",
    "/doctors/India/Cardiology",
    "/doctors/India/Delhi-NCR/Cardiology",
    "/doctors/India/Mumbai/Cardiology",
    "/doctors/India/Bengaluru/Cardiology",
    "/doctors/India/Chennai/Cardiology",
    "/doctors/India/Hyderabad/Cardiology",
    "/hospitals/India/Cardiology",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  for (const treatment of [
    "cabg-surgery-in-india",
    "heart-bypass-surgery-cost-in-india",
    "heart-valve-replacement-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of [
    "cardiac-ablation-catheter.webp",
    "afib-pulmonary-vein-isolation.webp",
    "ablation-energy-types.webp",
    "ablation-recovery-pathway.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/\./g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 5, `expected at least 5 WhatsApp CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok(texts.split("919044346292").length - 1 >= 5);
  const faqs = faqsFromArticleBlocks(post.blocks);
  assert.ok(faqs.length >= 15, `expected at least 15 FAQs, found ${faqs.length}`);

  const toc = post.blocks.find((block) => block.type === "html" && block.html.includes("article-toc"));
  assert.ok(toc && toc.type === "html");
  const used = new Map<string, number>();
  for (const block of post.blocks) {
    if (block.type !== "heading") continue;
    const base = slugify(block.text) || "section";
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    if (block.level !== 2) continue;
    const id = seen === 0 ? base : `${base}-${seen + 1}`;
    assert.match(toc.html, new RegExp(`href="#${id}"`));
  }

  const arabicPost = listPublishedPosts("ar").find((row) => row.slug === SLUG);
  if (arabicPost) assert.match(arabicPost.title, /[\u0600-\u06FF]/);
  const sitemap = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(sitemap.some((url) => url.endsWith(`/blogs/${SLUG}`)));
});
