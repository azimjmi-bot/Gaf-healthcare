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

const SLUG = "how-to-choose-a-tavr-tavi-specialist-in-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the TAVR specialist guide keeps the checklist and quotes published valve ranges", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.seoTitle, "TAVR/TAVI Specialist in India: How to Choose the Right Doctor");
  assert.match(post.seoDescription, /Learn how to choose a TAVR\/TAVI specialist in India/);
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
  assert.match(texts, /A suitable TAVR\/TAVI specialist should have relevant training/);
  assert.match(texts, /<strong>Relevant expertise:<\/strong>/);
  assert.match(texts, /<strong>Cost transparency:<\/strong>/);
  assert.match(texts, /No single doctor or hospital is the right choice for every patient/);
  assert.match(texts, /does not rank/);
  assert.match(texts, /does not publish a single price/);
  assert.match(texts, /not an India price/);

  const rows: Array<[string, { partner: string; stay: string }]> = [
    ["TAVR/TAVI (Transcatheter Aortic Valve Replacement)", CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"]],
    ["Aortic Valve Replacement", CARDIAC_SURGERY_COST["Aortic Valve Replacement"]],
    ["Heart Valve Replacement", CARDIAC_SURGERY_COST["Heart Valve Replacement"]],
    ["Pacemaker Implantation", CARDIOLOGY_COST["Pacemaker Implantation"]],
  ];
  for (const [name, row] of rows) {
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
  }
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["TAVR/TAVI (Transcatheter Aortic Valve Replacement)"].us))));
  assert.match(texts, new RegExp(escapeRe(asUs(CARDIAC_SURGERY_COST["Aortic Valve Replacement"].us))));

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:how-to-choose-an-angioplasty-specialist-in-india|interventional-cardiologist-vs-clinical-cardiologist|electrophysiologist-vs-cardiologist)/,
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
    "/hospitals/India/Cardiology",
    "/hospitals/India/Cardiac-Surgery",
    "/costs/India/Cardiac-Surgery/TAVR-TAVI-Transcatheter-Aortic-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/Aortic-Valve-Replacement",
    "/costs/India/Cardiac-Surgery/Heart-Valve-Replacement",
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/blogs/how-to-choose-a-hospital-for-heart-treatment-in-india",
    "/blogs/second-opinion-from-a-cardiologist-in-india",
    "/blogs/cardiologist-consultation-fees-in-india",
    "/blogs/questions-to-ask-before-heart-surgery",
    "/blogs/what-to-bring-to-a-cardiologist-appointment",
    "/blogs/heart-valve-replacement-cost-in-india",
    "/blogs/pacemaker-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const treatment of ["tavr-in-india", "heart-valve-replacement-in-india"]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }

  for (const file of ["tavr-stenosis.webp", "tavr-echo.webp", "tavr-catheter.webp", "tavr-vs-surgery.webp"]) {
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
