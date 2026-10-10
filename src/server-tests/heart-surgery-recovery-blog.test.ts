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

const SLUG = "heart-surgery-recovery-in-india";

function asUs(partner: string) {
  return partner.replaceAll("$", "US$");
}

function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the heart surgery recovery guide uses published stays and does not invent a recovery fee", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.title, "Heart Surgery Recovery in India: A Complete Guide for Patients and Families");
  assert.equal(post.seoTitle, "Heart Surgery Recovery in India: Timeline, Tips & Follow-Up");
  assert.match(post.seoDescription, /Learn what to expect after heart surgery in India/);
  assert.ok((post.keywords?.length ?? 0) >= 10);

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
  assert.match(texts, /Follow your own surgeon's instructions rather than using a general timeline as permission to resume activities/);
  assert.match(texts, /no single national price/);

  const rows: Array<[string, { partner: string; stay: string }]> = [
    ["CABG (Coronary Artery Bypass Grafting)", CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"]],
    ["Heart Valve Replacement", CARDIAC_SURGERY_COST["Heart Valve Replacement"]],
    ["Heart Valve Repair", CARDIAC_SURGERY_COST["Heart Valve Repair"]],
    ["TAVR/TAVI (Transcatheter Aortic Valve Replacement)", CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"]],
    ["Coronary Angioplasty & Stenting", CARDIOLOGY_COST["Coronary Angioplasty & Stenting"]],
    ["Pacemaker Implantation", CARDIOLOGY_COST["Pacemaker Implantation"]],
    ["ICD Implantation (Implantable Cardioverter-Defibrillator)", CARDIOLOGY_COST["ICD Implantation (Implantable Cardioverter-Defibrillator)"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
  }

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:bypass-surgery-cost-in-india|angioplasty-cost-in-india|cardiologist-consultation-fees-in-india|how-to-choose-a-hospital-for-heart-treatment-in-india|how-to-choose-a-tavr-tavi-specialist-in-india|what-to-bring-to-a-cardiologist-appointment|travelling-to-india-for-heart-treatment|angioplasty-vs-bypass-surgery-in-india)/,
  );

  for (const path of [
    "/costs/India/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Repair",
    "/costs/India/Cardiac-Surgery/TAVR-TAVI-(Transcatheter-Aortic-Valve-Replacement)",
    "/costs/India/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/costs/India/Cardiology/ICD-Implantation-(Implantable-Cardioverter-Defibrillator)",
    "/doctors/India/Cardiology",
    "/doctors/India/Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Cardiac-Surgery",
    "/doctors/India/Mumbai/Cardiac-Surgery",
    "/doctors/India/Bengaluru/Cardiac-Surgery",
    "/doctors/India/Chennai/Cardiac-Surgery",
    "/doctors/India/Hyderabad/Cardiac-Surgery",
    "/hospitals/India/Cardiac-Surgery",
    "/blogs/heart-valve-replacement-cost-in-india",
    "/blogs/pacemaker-cost-in-india",
    "/blogs/icd-implantation-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const treatment of [
    "cabg-surgery-in-india",
    "heart-bypass-surgery-cost-in-india",
    "coronary-angioplasty-in-india",
    "heart-valve-replacement-in-india",
    "tavr-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of [
    "heart-surgery-walking.webp",
    "recovery-by-procedure.webp",
    "cardiac-rehab-walk.webp",
    "recovery-follow-up.webp",
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
  const sitemap = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(sitemap.some((url) => url.endsWith(`/blogs/${SLUG}`)));
});
