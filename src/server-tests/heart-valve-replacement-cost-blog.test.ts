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

const SLUG = "heart-valve-replacement-cost-in-india";

function asUs(partner: string) {
  return partner.replaceAll("$", "US$");
}

function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the heart valve guide quotes published planning ranges and the Medanta package", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.title, "Heart Valve Replacement Cost in India: A Complete Patient Guide");
  assert.equal(post.seoTitle, "Heart Valve Replacement Cost in India: Surgery & TAVR Prices");
  assert.match(post.seoDescription, /Explore heart valve replacement cost in India/);
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
  assert.match(texts, /₹3\.19 lakh to ₹8\.07 lakh/);
  assert.match(texts, /not a current national average or a guaranteed all-inclusive quotation/);
  assert.match(texts, /not an India price/);

  const ranges: Array<[string, string]> = [
    ["Heart Valve Replacement", CARDIAC_SURGERY_COST["Heart Valve Replacement"].partner],
    ["Aortic Valve Replacement", CARDIAC_SURGERY_COST["Aortic Valve Replacement"].partner],
    ["Heart Valve Repair", CARDIAC_SURGERY_COST["Heart Valve Repair"].partner],
    ["Mitral Valve Repair", CARDIAC_SURGERY_COST["Mitral Valve Repair"].partner],
    ["Double Valve Replacement", CARDIAC_SURGERY_COST["Double Valve Replacement"].partner],
    ["TAVR/TAVI (Transcatheter Aortic Valve Replacement)", CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"].partner],
    ["Minimally Invasive Cardiac Surgery", CARDIAC_SURGERY_COST["Minimally Invasive Cardiac Surgery"].partner],
    ["Robotic Cardiac Surgery", CARDIAC_SURGERY_COST["Robotic Cardiac Surgery"].partner],
    ["CABG (Coronary Artery Bypass Grafting)", CARDIAC_SURGERY_COST["CABG (Coronary Artery Bypass Grafting)"].partner],
    ["Aortic Root Replacement", CARDIAC_SURGERY_COST["Aortic Root Replacement"].partner],
    ["Pacemaker Implantation", CARDIOLOGY_COST["Pacemaker Implantation"].partner],
  ];
  for (const [name, partner] of ranges) {
    assert.match(texts, new RegExp(escapeRe(asUs(partner))), name);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["Heart Valve Replacement"].us))));
  assert.match(texts, /8–16 nights/);
  assert.match(texts, /3–7 nights typical/);
  assert.match(texts, /10–18 nights/);

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:bypass-surgery-cost-in-india|heart-surgery-recovery-in-india|how-to-choose-a-hospital-for-heart-treatment-in-india|angioplasty-cost-in-india|how-to-choose-a-tavr-tavi-specialist-in-india|travelling-to-india-for-heart-treatment)/,
  );

  for (const path of [
    "/costs/India/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Mumbai/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/Aortic-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Repair",
    "/costs/India/Cardiac-Surgery/Mitral-Valve-Repair",
    "/costs/India/Cardiac-Surgery/Double-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/TAVR-TAVI-Transcatheter-Aortic-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/Minimally-Invasive-Cardiac-Surgery",
    "/costs/India/Cardiac-Surgery/Robotic-Cardiac-Surgery",
    "/costs/India/Cardiac-Surgery/CABG-Coronary-Artery-Bypass-Grafting",
    "/costs/India/Cardiac-Surgery/Aortic-Root-Replacement",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/costs/India/Cardiology/Coronary-Angiography",
    "/doctors/India/Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Mumbai/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Bengaluru/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Chennai/Cardiac-Surgery/Heart-Valve-Replacement",
    "/doctors/India/Hyderabad/Cardiac-Surgery/Heart-Valve-Replacement",
    "/hospitals/India/Cardiac-Surgery",
    "/hospitals/India/Delhi-NCR/Cardiac-Surgery",
    "/hospitals/India/Mumbai/Cardiac-Surgery",
    "/hospitals/India/Bengaluru/Cardiac-Surgery",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const treatment of [
    "heart-valve-replacement-in-india",
    "tavr-in-india",
    "cabg-surgery-in-india",
    "heart-bypass-surgery-cost-in-india",
    "mitral-valve-replacement-surgery-in-india",
    "tricuspid-valve-replacement-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of [
    "valve-surgical-chest.webp",
    "mechanical-tissue-valve.webp",
    "tavr-delivery.webp",
    "valve-recovery.webp",
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
