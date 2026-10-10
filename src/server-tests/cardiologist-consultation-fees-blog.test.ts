import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";
import { CARDIAC_SURGERY_COST } from "@/lib/cardiac-surgery-costs";
import { CARDIOLOGY_COST } from "@/lib/cardiology-costs";
import { getPublishedCuratedTreatment } from "@/lib/cms/curated-treatment-store";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "cardiologist-consultation-fees-in-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the consultation-fee guide keeps the quick answer and quotes published procedure ranges", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "Cardiologist Consultation Fees in India: Cost & Tests");
  assert.match(post.seoDescription, /Learn about cardiologist consultation fees in India/);
  assert.ok((post.keywords?.length ?? 0) >= 13);

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
  assert.match(texts, /₹1,200–₹1,500/);
  assert.match(texts, /₹2,700 or ₹3,800/);
  assert.match(texts, /not a national average/);
  assert.match(texts, /does not publish a single fee for a cardiologist consultation/);
  assert.match(texts, /not an India price/);
  assert.match(texts, /does not publish an ECG price/);
  assert.match(texts, /does not publish an echocardiogram price/);

  const rows: Array<[string, { partner: string; stay: string }]> = [
    ["Coronary Angiography", CARDIOLOGY_COST["Coronary Angiography"]],
    ["Coronary Angioplasty & Stenting", CARDIOLOGY_COST["Coronary Angioplasty & Stenting"]],
    ["CABG (Coronary Artery Bypass Grafting)", CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"]],
    ["Heart Valve Replacement", CARDIAC_SURGERY_COST["Heart Valve Replacement"]],
    ["TAVR/TAVI (Transcatheter Aortic Valve Replacement)", CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"]],
    ["Pacemaker Implantation", CARDIOLOGY_COST["Pacemaker Implantation"]],
    ["Atrial Fibrillation Ablation", CARDIOLOGY_COST["Atrial Fibrillation Ablation"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Coronary Angioplasty & Stenting"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["Heart Valve Replacement"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"].us))));

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:how-to-choose-an-angioplasty-specialist-in-india|how-to-choose-a-tavr-tavi-specialist-in-india|how-to-choose-the-right-cardiologist-in-india|interventional-cardiologist-vs-clinical-cardiologist|electrophysiologist-vs-cardiologist|best-cardiologists-for-atrial-fibrillation-in-india|travelling-to-india-for-heart-treatment)/,
  );
  assert.doesNotMatch(texts, /\/blog\//);

  for (const path of [
    "/doctors/India/Cardiology",
    "/doctors/India/Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Cardiology",
    "/doctors/India/Mumbai/Cardiology",
    "/doctors/India/Bengaluru/Cardiology",
    "/doctors/India/Chennai/Cardiology",
    "/doctors/India/Hyderabad/Cardiology",
    "/hospitals/India/Cardiology",
    "/hospitals/India/Cardiac-Surgery",
    "/costs/India/Cardiology/Coronary-Angiography",
    "/costs/India/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Mumbai/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/costs/India/Cardiology/Atrial-Fibrillation-Ablation",
    "/blogs/what-to-bring-to-a-cardiologist-appointment",
    "/blogs/second-opinion-from-a-cardiologist-in-india",
    "/blogs/questions-to-ask-before-heart-surgery",
    "/blogs/angioplasty-vs-bypass-surgery-in-india",
    "/blogs/angioplasty-cost-in-india",
    "/blogs/bypass-surgery-cost-in-india",
    "/blogs/heart-valve-replacement-cost-in-india",
    "/blogs/heart-surgery-recovery-in-india",
    "/blogs/cardiac-ablation-cost-in-india",
    "/blogs/pacemaker-cost-in-india",
    "/blogs/icd-implantation-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const treatment of [
    "coronary-angioplasty-in-india",
    "cabg-surgery-in-india",
    "heart-valve-replacement-in-india",
    "tavr-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of [
    "consult-ecg.webp",
    "consult-echo.webp",
    "consult-holter.webp",
    "consult-vs-angiogram.webp",
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

  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
