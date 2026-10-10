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

const SLUG = "questions-to-ask-before-heart-surgery";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the pre-procedure question guide quotes published ranges and keeps the reminder", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "Questions to Ask Before Heart Surgery or a Cardiac Procedure");
  assert.match(post.seoDescription, /Learn what to ask before heart surgery/);
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
  assert.match(
    texts,
    /The right questions can help you make an informed decision, but they cannot replace an individual medical assessment/,
  );
  assert.match(texts, /not an India price/);

  const rows: Array<[string, { partner: string; stay: string }]> = [
    ["Coronary Angioplasty & Stenting", CARDIOLOGY_COST["Coronary Angioplasty & Stenting"]],
    ["Coronary Angiography", CARDIOLOGY_COST["Coronary Angiography"]],
    ["CTO Angioplasty (Chronic Total Occlusion)", CARDIOLOGY_COST["CTO Angioplasty (Chronic Total Occlusion)"]],
    ["Pacemaker Implantation", CARDIOLOGY_COST["Pacemaker Implantation"]],
    ["Leadless Pacemaker Implantation", CARDIOLOGY_COST["Leadless Pacemaker Implantation"]],
    ["ICD Implantation (Implantable Cardioverter-Defibrillator)", CARDIOLOGY_COST["ICD Implantation (Implantable Cardioverter-Defibrillator)"]],
    ["Atrial Fibrillation Ablation", CARDIOLOGY_COST["Atrial Fibrillation Ablation"]],
    ["Radiofrequency Ablation", CARDIOLOGY_COST["Radiofrequency Ablation"]],
    ["CABG (Coronary Artery Bypass Grafting)", CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"]],
    ["Redo CABG", CARDIAC_SURGERY_COST["Redo CABG"]],
    ["Heart Valve Replacement", CARDIAC_SURGERY_COST["Heart Valve Replacement"]],
    ["Heart Valve Repair", CARDIAC_SURGERY_COST["Heart Valve Repair"]],
    ["Aortic Valve Replacement", CARDIAC_SURGERY_COST["Aortic Valve Replacement"]],
    ["TAVR/TAVI (Transcatheter Aortic Valve Replacement)", CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Coronary Angioplasty & Stenting"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["Heart Valve Replacement"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Pacemaker Implantation"].us))));

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:how-to-choose-an-angioplasty-specialist-in-india|how-to-choose-a-hospital-for-heart-treatment-in-india|how-to-choose-the-right-cardiologist-in-india|interventional-cardiologist-vs-clinical-cardiologist|electrophysiologist-vs-cardiologist|travelling-to-india-for-heart-treatment|second-opinion-from-a-cardiologist-in-india|what-to-bring-to-a-cardiologist-appointment|cardiologist-consultation-fees-in-india)/,
  );
  assert.doesNotMatch(texts, /\/blog\//);

  for (const path of [
    "/costs/India/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Mumbai/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Cardiology/Coronary-Angiography",
    "/costs/India/Cardiology/CTO-Angioplasty-(Chronic-Total-Occlusion)",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/costs/India/Cardiology/Leadless-Pacemaker-Implantation",
    "/costs/India/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
    "/costs/India/Cardiology/Atrial-Fibrillation-Ablation",
    "/costs/India/Cardiology/Radiofrequency-Ablation",
    "/costs/India/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Mumbai/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Cardiac-Surgery/Redo-CABG",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Repair",
    "/costs/India/Cardiac-Surgery/Aortic-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/doctors/India/Cardiology",
    "/doctors/India/Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Cardiology",
    "/doctors/India/Mumbai/Cardiac-Surgery",
    "/hospitals/India/Cardiology",
    "/hospitals/India/Cardiac-Surgery",
    "/blogs/angioplasty-vs-bypass-surgery-in-india",
    "/blogs/angioplasty-cost-in-india",
    "/blogs/bypass-surgery-cost-in-india",
    "/blogs/heart-valve-replacement-cost-in-india",
    "/blogs/heart-surgery-recovery-in-india",
    "/blogs/pacemaker-cost-in-india",
    "/blogs/icd-implantation-cost-in-india",
    "/blogs/cardiac-ablation-cost-in-india",
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
    "questions-three-procedures.webp",
    "questions-aortic-valve.webp",
    "questions-pacemaker.webp",
    "questions-records-prep.webp",
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
