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

const SLUG = "best-hospitals-pediatric-heart-surgery-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the pediatric hospital guide keeps the quick answer and the directory planning bands", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Pediatric Cardiac Surgery");
  assert.equal(
    post.title,
    "Best Hospitals for Pediatric Heart Surgery in India: How to Choose the Right Cardiac Centre for Your Child",
  );
  assert.equal(post.seoTitle, "Best Hospitals for Pediatric Heart Surgery in India | Parent's Guide");
  assert.equal(
    post.seoDescription,
    "Compare hospitals for pediatric heart surgery in India. Learn how to evaluate congenital heart specialists, pediatric cardiac ICUs, treatment costs and hospital facilities.",
  );
  assert.equal(post.canonical, "https://gaf.healthcare/blogs/best-hospitals-pediatric-heart-surgery-india");
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
  assert.match(texts, /not a definitive ranking of the best hospitals in India/);
  assert.match(texts, /AIIMS, New Delhi/);
  assert.match(texts, /Apollo Children's Hospitals, Chennai/);
  assert.match(texts, /Apollo Hospitals, Hyderabad/);
  assert.match(texts, /Apollo Hospitals, Delhi/);
  assert.match(texts, /Fortis Hospital, Mohali/);
  assert.match(texts, /experience with the proposed operation, pediatric cardiac intensive care/);
  assert.match(texts, /does not publish a single fee for pediatric heart surgery/);
  assert.match(texts, /not the GAF directory band/);
  assert.match(texts, /blue or grey lips or tongue/);
  assert.doesNotMatch(texts, /\/blog\//);

  for (const name of [
    "ASD Closure (Atrial Septal Defect)",
    "VSD Closure (Ventricular Septal Defect)",
    "TOF Repair (Tetralogy of Fallot)",
    "Arterial Switch Operation",
    "Fontan Procedure",
    "Norwood Procedure",
  ]) {
    const row = PEDIATRIC_CARDIAC_SURGERY_COST[name];
    assert.match(texts, new RegExp(escapeRe(asUs(row.partner))), name);
    assert.match(texts, new RegExp(escapeRe(row.stay)), name);
  }

  for (const path of [
    "/doctors/India/Pediatric-Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Pediatric-Cardiac-Surgery",
    "/doctors/India/Mumbai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Bengaluru/Pediatric-Cardiac-Surgery",
    "/doctors/India/Chennai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Hyderabad/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Delhi-NCR/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Chennai/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Hyderabad/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery/ASD-Closure-Atrial-Septal-Defect",
    "/costs/India/Pediatric-Cardiac-Surgery/TOF-Repair-Tetralogy-of-Fallot",
    "/costs/India/Pediatric-Cardiac-Surgery/Arterial-Switch-Operation",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Mumbai/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/blogs/pediatric-heart-surgery-cost-in-india",
    "/blogs/asd-closure-in-children",
    "/blogs/vsd-surgery-in-babies-and-children",
    "/blogs/pda-closure-in-babies",
    "/blogs/tetralogy-of-fallot-surgery-india",
    "/blogs/open-heart-surgery-vs-catheter-treatment-children",
    "/blogs/signs-of-congenital-heart-disease-in-babies",
    "/blogs/second-opinion-congenital-heart-surgery-india",
    "/blogs/heart-surgery-recovery-in-india",
    "/blogs/questions-to-ask-before-heart-surgery",
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
    "tof-repair-surgery-in-india",
    "arterial-switch-operation-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }
  const page = getPublishedCuratedTreatment("pediatric-heart-surgery-in-india", "en");
  assert.match(page?.translations.en?.editorialBody ?? "", new RegExp(`/blogs/${SLUG}`));

  for (const file of [
    "pediatric-hosp-checklist.webp",
    "pediatric-hosp-defects.webp",
    "pediatric-hosp-closure.webp",
    "pediatric-hosp-stages.webp",
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
