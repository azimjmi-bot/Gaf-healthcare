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

const SLUG = "bypass-surgery-cost-in-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the bypass cost guide quotes published CABG ranges and the institutional package", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "Bypass Surgery Cost in India: CABG Packages & Recovery");
  assert.match(post.seoDescription, /Explore bypass surgery cost in India/);
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

  assert.match(texts, /article-quick-answer__list/);
  assert.match(texts, /The complexity of the coronary artery disease/);
  assert.match(texts, /Follow-up consultations and rehabilitation/);
  assert.match(texts, /₹3\.98 lakh to ₹7\.57 lakh/);
  assert.match(texts, /not an India price/);

  const rows: Array<[string, { partner: string; stay: string; us?: string }]> = [
    ["CABG (Coronary Artery Bypass Grafting)", CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"]],
    ["Redo CABG", CARDIAC_SURGERY_COST["Redo CABG"]],
    ["Minimally Invasive Cardiac Surgery", CARDIAC_SURGERY_COST["Minimally Invasive Cardiac Surgery"]],
    ["Robotic Cardiac Surgery", CARDIAC_SURGERY_COST["Robotic Cardiac Surgery"]],
    ["Heart Valve Replacement", CARDIAC_SURGERY_COST["Heart Valve Replacement"]],
    ["Coronary Angioplasty & Stenting", CARDIOLOGY_COST["Coronary Angioplasty & Stenting"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"].us))));

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:angioplasty-cost-in-india|angioplasty-vs-bypass-surgery-in-india|how-to-choose-a-hospital-for-heart-treatment-in-india|questions-to-ask-before-heart-surgery|travelling-to-india-for-heart-treatment|second-opinion-from-a-cardiologist-in-india)/,
  );

  for (const path of [
    "/costs/India/Cardiac-Surgery/CABG-Coronary-Artery-Bypass-Grafting",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/CABG-Coronary-Artery-Bypass-Grafting",
    "/costs/India/Mumbai/Cardiac-Surgery/CABG-Coronary-Artery-Bypass-Grafting",
    "/costs/India/Cardiac-Surgery/Redo-CABG",
    "/costs/India/Cardiac-Surgery/Minimally-Invasive-Cardiac-Surgery",
    "/costs/India/Cardiac-Surgery/Robotic-Cardiac-Surgery",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Cardiology/Coronary-Angiography",
    "/doctors/India/Cardiac-Surgery",
    "/doctors/India/Cardiology",
    "/doctors/India/Delhi-NCR/Cardiac-Surgery",
    "/doctors/India/Mumbai/Cardiac-Surgery",
    "/doctors/India/Bengaluru/Cardiac-Surgery",
    "/doctors/India/Chennai/Cardiac-Surgery",
    "/doctors/India/Hyderabad/Cardiac-Surgery",
    "/hospitals/India/Cardiac-Surgery",
    "/blogs/heart-surgery-recovery-in-india",
    "/blogs/heart-valve-replacement-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const treatment of [
    "cabg-surgery-in-india",
    "heart-bypass-surgery-cost-in-india",
    "coronary-angioplasty-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of ["cabg-bypass-graft.webp", "cabg-graft-sources.webp", "cabg-on-off-pump.webp", "cabg-recovery-path.webp"]) {
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
