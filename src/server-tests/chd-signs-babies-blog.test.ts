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

const SLUG = "signs-of-congenital-heart-disease-in-babies";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the congenital heart warning-signs guide keeps the quick answer and named planning bands", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Pediatric Cardiac Surgery");
  assert.equal(
    post.title,
    "Signs of Congenital Heart Disease in Babies: Warning Signs, Symptoms and When to See a Doctor",
  );
  assert.equal(post.seoTitle, "Signs of Congenital Heart Disease in Babies: Symptoms");
  assert.equal(
    post.seoDescription,
    "Learn the warning signs of congenital heart disease in babies, including blue lips, fast breathing, feeding difficulties and poor weight gain. Know when to seek urgent medical care.",
  );
  assert.equal(post.canonical, "https://gaf.healthcare/blogs/signs-of-congenital-heart-disease-in-babies");
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
    /Congenital heart disease \(CHD\) refers to a structural problem with the heart or major blood vessels that is present from birth/,
  );
  assert.match(texts, /Seek emergency medical care immediately/);
  assert.match(texts, /does not publish one price for congenital heart disease/);
  assert.match(texts, /blue or grey lips or tongue/);
  assert.doesNotMatch(texts, /₹|lakh/i);
  assert.doesNotMatch(texts, /\/blog\//);

  for (const name of [
    "PDA Closure (Patent Ductus Arteriosus)",
    "ASD Closure (Atrial Septal Defect)",
    "VSD Closure (Ventricular Septal Defect)",
    "Coarctation Repair",
    "TOF Repair (Tetralogy of Fallot)",
    "Arterial Switch Operation",
    "Norwood Procedure",
  ]) {
    const row = PEDIATRIC_CARDIAC_SURGERY_COST[name];
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), `${name} stay`);
    assert.match(texts, new RegExp(escapeRe(asUs(row.us))), `${name} us`);
  }

  for (const path of [
    "/doctors/India/Pediatric-Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Pediatric-Cardiac-Surgery",
    "/doctors/India/Mumbai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Bengaluru/Pediatric-Cardiac-Surgery",
    "/doctors/India/Chennai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Hyderabad/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Hyderabad/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery/PDA-Closure-Patent-Ductus-Arteriosus",
    "/costs/India/Pediatric-Cardiac-Surgery/ASD-Closure-Atrial-Septal-Defect",
    "/costs/India/Pediatric-Cardiac-Surgery/VSD-Closure-Ventricular-Septal-Defect",
    "/costs/India/Pediatric-Cardiac-Surgery/Coarctation-Repair",
    "/costs/India/Pediatric-Cardiac-Surgery/TOF-Repair-Tetralogy-of-Fallot",
    "/costs/India/Pediatric-Cardiac-Surgery/Arterial-Switch-Operation",
    "/costs/India/Pediatric-Cardiac-Surgery/Norwood-Procedure",
    "/costs/India/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Mumbai/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/blogs/open-heart-surgery-vs-catheter-treatment-children",
    "/blogs/pda-closure-in-babies",
    "/blogs/second-opinion-congenital-heart-surgery-india",
    "/blogs/heart-surgery-recovery-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }
  assert.doesNotMatch(texts, /\/(?:doctors|hospitals|costs)\/India\/(?:Kolkata|Ahmedabad|Pune|Vellore)\//);

  for (const treatment of [
    "pediatric-heart-surgery-in-india",
    "asd-closure-surgery-in-india",
    "ventricular-septal-defect-surgery-in-india",
    "pda-closure-surgery-in-india",
    "tof-repair-surgery-in-india",
    "coarctation-repair-surgery-in-india",
    "arterial-switch-operation-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }
  const hub = getPublishedCuratedTreatment("pediatric-heart-surgery-in-india", "en");
  assert.match(hub?.translations.en?.editorialBody ?? "", new RegExp(`/blogs/${SLUG}`));

  for (const file of [
    "chd-signs-heart.webp",
    "chd-signs-warnings.webp",
    "chd-signs-tests.webp",
    "chd-signs-urgency.webp",
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
