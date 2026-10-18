import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";
import { getPublishedCuratedTreatment } from "@/lib/cms/curated-treatment-store";
import { PEDIATRIC_CARDIAC_SURGERY_COST } from "@/lib/pediatric-cardiac-surgery-costs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "pda-closure-in-babies";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the PDA closure in babies guide keeps the quick answer and the pediatric planning band", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Pediatric Cardiac Surgery");
  assert.equal(post.title, "PDA Closure in Babies: Treatment Options, Procedure, Cost and Recovery in India");
  assert.equal(post.seoTitle, "PDA Closure in Babies: Procedure, Cost and Recovery in India");
  assert.equal(
    post.seoDescription,
    "Learn about PDA in babies, symptoms, diagnosis, when closure is needed, catheter treatment vs surgery, estimated costs in India and recovery after treatment.",
  );
  assert.equal(post.canonical, "https://gaf.healthcare/blogs/pda-closure-in-babies");
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
  assert.match(
    texts,
    /Patent ductus arteriosus \(PDA\) is a condition in which a normal fetal blood vessel called the ductus arteriosus remains open after birth/,
  );
  assert.match(texts, /A PDA does not always require immediate closure/);
  assert.match(texts, /Parents must never give ibuprofen, indomethacin/);
  assert.match(texts, /does not publish a single fee for PDA closure/);
  assert.match(texts, /blue or grey lips or tongue/);
  assert.doesNotMatch(texts, /₹|lakh/i);
  assert.doesNotMatch(texts, /\/blog\//);

  const row = PEDIATRIC_CARDIAC_SURGERY_COST["PDA Closure (Patent Ductus Arteriosus)"];
  assert.match(texts, new RegExp(escapeRe(asUs(row.partner))));
  assert.match(texts, new RegExp(escapeRe(row.stay)));
  assert.match(texts, new RegExp(escapeRe(asUs(row.us))));
  for (const name of [
    "ASD Closure (Atrial Septal Defect)",
    "VSD Closure (Ventricular Septal Defect)",
    "TOF Repair (Tetralogy of Fallot)",
  ]) {
    const other = PEDIATRIC_CARDIAC_SURGERY_COST[name];
    assert.match(texts, new RegExp(escapeRe(asUs(other.partner))), name);
  }

  for (const path of [
    "/doctors/India/Pediatric-Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Pediatric-Cardiac-Surgery",
    "/doctors/India/Mumbai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Bengaluru/Pediatric-Cardiac-Surgery",
    "/doctors/India/Chennai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Hyderabad/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Mumbai/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery/PDA-Closure-Patent-Ductus-Arteriosus",
    "/costs/India/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Mumbai/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/blogs/second-opinion-congenital-heart-surgery-india",
    "/blogs/questions-to-ask-before-heart-surgery",
    "/blogs/heart-surgery-recovery-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.doesNotMatch(texts, /\/(?:doctors|hospitals|costs)\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);

  for (const treatment of [
    "pediatric-heart-surgery-in-india",
    "pda-closure-surgery-in-india",
    "asd-closure-surgery-in-india",
    "ventricular-septal-defect-surgery-in-india",
    "tof-repair-surgery-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }
  const hub = getPublishedCuratedTreatment("pediatric-heart-surgery-in-india", "en");
  const pdaPage = getPublishedCuratedTreatment("pda-closure-surgery-in-india", "en");
  assert.match(hub?.translations.en?.editorialBody ?? "", new RegExp(`/blogs/${SLUG}`));
  assert.match(pdaPage?.translations.en?.editorialBody ?? "", new RegExp(`/blogs/${SLUG}`));

  for (const file of [
    "pda-babies-anatomy.webp",
    "pda-babies-options.webp",
    "pda-babies-device.webp",
    "pda-babies-followup.webp",
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
    const anchor = seen === 0 ? base : `${base}-${seen + 1}`;
    assert.match(toc.html, new RegExp(`href="#${anchor}"`));
  }

  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
