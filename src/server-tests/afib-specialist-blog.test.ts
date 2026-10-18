import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";
import { CARDIOLOGY_COST } from "@/lib/cardiology-costs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "best-cardiologists-for-atrial-fibrillation-in-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the AFib specialist guide keeps the quick answer and quotes published ablation ranges", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "Atrial Fibrillation Specialist in India: How to Choose");
  assert.match(post.seoDescription, /Learn how to choose an atrial fibrillation specialist in India/);
  assert.ok((post.keywords?.length ?? 0) >= 11);

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
  assert.match(texts, /The right specialist for atrial fibrillation \(AFib\) depends on your symptoms/);
  assert.match(texts, /a cardiac electrophysiologist may be particularly relevant/);
  assert.match(texts, /does not rank/);
  assert.match(texts, /does not publish a single fee/);
  assert.match(texts, /not an India price/);

  const rows: Array<[string, { partner: string; stay: string; us?: string }]> = [
    ["Atrial Fibrillation Ablation", CARDIOLOGY_COST["Atrial Fibrillation Ablation"]],
    ["Radiofrequency Ablation", CARDIOLOGY_COST["Radiofrequency Ablation"]],
    ["Pacemaker Implantation", CARDIOLOGY_COST["Pacemaker Implantation"]],
    ["ICD Implantation (Implantable Cardioverter-Defibrillator)", CARDIOLOGY_COST["ICD Implantation (Implantable Cardioverter-Defibrillator)"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Atrial Fibrillation Ablation"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Radiofrequency Ablation"].us))));

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:how-to-choose-an-angioplasty-specialist-in-india|how-to-choose-a-tavr-tavi-specialist-in-india|interventional-cardiologist-vs-clinical-cardiologist|electrophysiologist-vs-cardiologist)/,
  );
  assert.doesNotMatch(texts, /\/blog\//);

  for (const path of [
    "/doctors/India/Cardiology",
    "/doctors/India/Delhi-NCR/Cardiology",
    "/doctors/India/Mumbai/Cardiology",
    "/doctors/India/Bengaluru/Cardiology",
    "/doctors/India/Chennai/Cardiology",
    "/doctors/India/Hyderabad/Cardiology",
    "/hospitals/India/Cardiology",
    "/costs/India/Cardiology/Atrial-Fibrillation-Ablation",
    "/costs/India/Cardiology/Radiofrequency-Ablation",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/costs/India/Cardiology/ICD-Implantation-Implantable-Cardioverter-Defibrillator",
    "/blogs/cardiac-ablation-cost-in-india",
    "/blogs/how-to-choose-a-hospital-for-heart-treatment-in-india",
    "/blogs/cardiologist-consultation-fees-in-india",
    "/blogs/second-opinion-from-a-cardiologist-in-india",
    "/blogs/what-to-bring-to-a-cardiologist-appointment",
    "/blogs/questions-to-ask-before-heart-surgery",
    "/blogs/pacemaker-cost-in-india",
    "/blogs/icd-implantation-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of ["afib-chambers.webp", "afib-tracing.webp", "afib-appendage.webp", "afib-pvi.webp"]) {
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

  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
