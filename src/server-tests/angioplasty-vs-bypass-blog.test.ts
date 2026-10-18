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

const SLUG = "angioplasty-vs-bypass-surgery-in-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the angioplasty versus bypass guide quotes published ranges and keeps the comparison answer", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "Angioplasty vs Bypass Surgery in India: Which Is Better?");
  assert.match(post.seoDescription, /Compare angioplasty and bypass surgery in India/);
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
    /Angioplasty treats selected narrowed coronary arteries from inside the blood vessel/,
  );
  assert.match(texts, /not an India price/);
  assert.match(texts, /two to three months/);

  const rows: Array<[string, { partner: string; stay: string }]> = [
    ["Coronary Angioplasty & Stenting", CARDIOLOGY_COST["Coronary Angioplasty & Stenting"]],
    ["Coronary Angiography", CARDIOLOGY_COST["Coronary Angiography"]],
    ["CTO Angioplasty (Chronic Total Occlusion)", CARDIOLOGY_COST["CTO Angioplasty (Chronic Total Occlusion)"]],
    ["CABG (Coronary Artery Bypass Grafting)", CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"]],
    ["Redo CABG", CARDIAC_SURGERY_COST["Redo CABG"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Coronary Angioplasty & Stenting"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"].us))));

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:how-to-choose-an-angioplasty-specialist-in-india|how-to-choose-a-hospital-for-heart-treatment-in-india|how-to-choose-the-right-cardiologist-in-india|how-to-choose-a-tavr-tavi-specialist-in-india|travelling-to-india-for-heart-treatment|questions-to-ask-before-heart-surgery|what-to-bring-to-a-cardiologist-appointment|second-opinion-from-a-cardiologist-in-india|cardiologist-consultation-fees-in-india)/,
  );
  assert.doesNotMatch(texts, /\/blog\//);

  for (const path of [
    "/costs/India/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Mumbai/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Cardiology/Coronary-Angiography",
    "/costs/India/Cardiology/CTO-Angioplasty-Chronic-Total-Occlusion",
    "/costs/India/Cardiac-Surgery/CABG-Coronary-Artery-Bypass-Grafting",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/CABG-Coronary-Artery-Bypass-Grafting",
    "/costs/India/Mumbai/Cardiac-Surgery/CABG-Coronary-Artery-Bypass-Grafting",
    "/costs/India/Cardiac-Surgery/Redo-CABG",
    "/doctors/India/Cardiology",
    "/doctors/India/Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Cardiology",
    "/doctors/India/Mumbai/Cardiology",
    "/doctors/India/Bengaluru/Cardiology",
    "/doctors/India/Chennai/Cardiology",
    "/doctors/India/Hyderabad/Cardiology",
    "/doctors/India/Delhi-NCR/Cardiac-Surgery",
    "/doctors/India/Mumbai/Cardiac-Surgery",
    "/doctors/India/Bengaluru/Cardiac-Surgery",
    "/doctors/India/Chennai/Cardiac-Surgery",
    "/doctors/India/Hyderabad/Cardiac-Surgery",
    "/hospitals/India/Cardiology",
    "/hospitals/India/Cardiac-Surgery",
    "/blogs/angioplasty-cost-in-india",
    "/blogs/bypass-surgery-cost-in-india",
    "/blogs/heart-surgery-recovery-in-india",
    "/blogs/heart-valve-replacement-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const treatment of ["coronary-angioplasty-in-india", "cabg-surgery-in-india"]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of [
    "pci-vs-cabg-overview.webp",
    "cad-focal-multivessel.webp",
    "stent-vs-graft-close.webp",
    "pci-cabg-recovery.webp",
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
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
