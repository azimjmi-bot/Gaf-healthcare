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

const SLUG = "how-to-choose-an-angioplasty-specialist-in-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the angioplasty specialist guide keeps the checklist and quotes published ranges", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "How to Choose an Angioplasty Specialist in India");
  assert.match(post.seoDescription, /Learn how to choose an angioplasty specialist in India/);
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
  assert.match(texts, /To choose a suitable angioplasty specialist/);
  assert.match(texts, /<strong>Verify qualifications:<\/strong>/);
  assert.match(texts, /<strong>Consider a second opinion:<\/strong>/);
  assert.match(texts, /No single factor establishes that a specialist is the best choice for every patient/);
  assert.match(texts, /seek emergency medical care immediately/i);
  assert.match(texts, /does not rank/);
  assert.match(texts, /does not publish a single price/);
  assert.match(texts, /does not publish a single fee/);
  assert.match(texts, /not an India price/);
  assert.match(texts, /They are the stent, not the angioplasty/);
  assert.match(texts, /₹10,692\.69/);
  assert.match(texts, /₹38,933\.14/);
  assert.match(texts, /17 March 2026/);

  const rows: Array<[string, { partner: string; stay: string; us?: string }]> = [
    ["Coronary Angioplasty & Stenting", CARDIOLOGY_COST["Coronary Angioplasty & Stenting"]],
    ["Coronary Angiography", CARDIOLOGY_COST["Coronary Angiography"]],
    ["CTO Angioplasty (Chronic Total Occlusion)", CARDIOLOGY_COST["CTO Angioplasty (Chronic Total Occlusion)"]],
    ["CABG (Coronary Artery Bypass Grafting)", CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
    if (row.us) assert.match(texts, new RegExp(escapeRe(asUs(row.us))), `${name} us`);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Coronary Angioplasty & Stenting"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["Coronary Angiography"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIOLOGY_COST["CTO Angioplasty (Chronic Total Occlusion)"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"].us))));

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:interventional-cardiologist-vs-clinical-cardiologist|electrophysiologist-vs-cardiologist|how-to-choose-the-right-cardiologist-in-india)/,
  );
  assert.doesNotMatch(texts, /\/blog\//);

  for (const path of [
    "/doctors/India/Cardiology",
    "/doctors/India/Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Cardiology",
    "/doctors/India/Mumbai/Cardiology",
    "/doctors/India/Chennai/Cardiology",
    "/doctors/India/Bengaluru/Cardiology",
    "/doctors/India/Hyderabad/Cardiology",
    "/doctors/India/Delhi-NCR/Cardiac-Surgery",
    "/doctors/India/Mumbai/Cardiac-Surgery",
    "/doctors/India/Chennai/Cardiac-Surgery",
    "/doctors/India/Bengaluru/Cardiac-Surgery",
    "/doctors/India/Hyderabad/Cardiac-Surgery",
    "/hospitals/India/Cardiology",
    "/hospitals/India/Cardiac-Surgery",
    "/costs/India/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Mumbai/Cardiology/Coronary-Angioplasty-Stenting",
    "/costs/India/Cardiology/Coronary-Angiography",
    "/costs/India/Cardiology/CTO-Angioplasty-(Chronic-Total-Occlusion)",
    "/costs/India/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/costs/India/Mumbai/Cardiac-Surgery/CABG-(Coronary-Artery-Bypass-Grafting)",
    "/blogs/angioplasty-cost-in-india",
    "/blogs/bypass-surgery-cost-in-india",
    "/blogs/angioplasty-vs-bypass-surgery-in-india",
    "/blogs/how-to-choose-a-hospital-for-heart-treatment-in-india",
    "/blogs/second-opinion-from-a-cardiologist-in-india",
    "/blogs/cardiologist-consultation-fees-in-india",
    "/blogs/questions-to-ask-before-heart-surgery",
    "/blogs/what-to-bring-to-a-cardiologist-appointment",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const treatment of ["coronary-angioplasty-in-india", "cabg-surgery-in-india"]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of ["pci-plaque.webp", "pci-stent.webp", "pci-vs-graft.webp", "pci-stent-count.webp"]) {
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
