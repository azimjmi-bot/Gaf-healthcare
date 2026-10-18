import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";
import { CARDIOLOGY_COST } from "@/lib/cardiology-costs";
import { getPublishedCuratedTreatment } from "@/lib/cms/curated-treatment-store";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "icd-implantation-cost-in-india";

function asUs(partner: string) {
  return partner.replaceAll("$", "US$");
}

test("the ICD implantation guide quotes the published planning ranges and is indexed in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "ICD Implantation Cost in India: Device Types & Recovery");
  assert.match(post.seoDescription, /ICD implantation cost in India/);
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
  assert.match(texts, /should not be treated as a confirmed quotation/);
  const icd = CARDIOLOGY_COST["ICD Implantation (Implantable Cardioverter-Defibrillator)"].partner;
  const crt = CARDIOLOGY_COST["CRT/CRT-D Implantation"].partner;
  const pacemaker = CARDIOLOGY_COST["Pacemaker Implantation"].partner;
  assert.match(texts, new RegExp(asUs(icd).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(texts, new RegExp(asUs(crt).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(texts, new RegExp(asUs(pacemaker).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:pacemaker-cost-in-india|electrophysiologist-vs-cardiologist|heart-surgery-recovery-in-india|how-to-choose-a-hospital-for-heart-treatment-in-india|travelling-to-india-for-heart-treatment)/,
  );

  for (const path of [
    "/costs/India/Cardiology/ICD-Implantation-Implantable-Cardioverter-Defibrillator",
    "/costs/India/Delhi-NCR/Cardiology/ICD-Implantation-Implantable-Cardioverter-Defibrillator",
    "/costs/India/Cardiology/CRT-CRT-D-Implantation",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/doctors/India/Cardiology",
    "/hospitals/India/Cardiology",
    "/blogs/cardiac-ablation-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  for (const treatment of ["cabg-surgery-in-india", "heart-valve-replacement-in-india"]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }
  for (const file of [
    "icd-generator-lead.webp",
    "icd-vs-pacemaker.webp",
    "icd-device-types.webp",
    "icd-follow-up.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/\./g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 5);
  assert.ok(texts.split("919044346292").length - 1 >= 5);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 15);

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
