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

const SLUG = "asd-closure-in-children";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the ASD closure guide keeps the quick answer and the directory planning band", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.title, "ASD Closure in Children: Surgery, Device Closure, Cost in India and Recovery");
  assert.equal(post.seoTitle, "ASD Closure in Children: Surgery, Cost & Recovery in India");
  assert.equal(
    post.seoDescription,
    "Learn about ASD in children, symptoms, device closure vs surgery, treatment timing, ASD closure cost in India, recovery and follow-up.",
  );
  assert.equal(post.canonical, "https://gaf.healthcare/blogs/asd-closure-in-children");
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
  assert.match(texts, /Some small ASDs do not require treatment and may close naturally/);
  assert.match(texts, /Transcatheter device closure/);
  assert.match(texts, /₹80,000–₹1,75,000/);
  assert.match(texts, /₹1,30,000–₹3,05,000/);
  assert.match(texts, /₹65,000–₹2,00,000/);
  assert.match(texts, /₹2,20,000–₹4,50,000/);
  assert.match(texts, /These are research figures, not current hospital quotations/);
  assert.match(texts, /Only a pediatric cardiologist and congenital heart team/);
  assert.match(texts, /does not publish a single fee for ASD closure/);
  assert.match(texts, /not the GAF directory band/);
  assert.match(texts, /blue or grey lips or tongue/);
  assert.doesNotMatch(texts, /\/blog\//);

  const row = PEDIATRIC_CARDIAC_SURGERY_COST["ASD Closure (Atrial Septal Defect)"];
  assert.match(texts, new RegExp(escapeRe(asUs(row.partner))));
  assert.match(texts, new RegExp(escapeRe(row.stay)));
  assert.match(texts, new RegExp(escapeRe(asUs(row.us))));
  for (const name of ["VSD Closure (Ventricular Septal Defect)", "PDA Closure (Patent Ductus Arteriosus)"]) {
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
    "/hospitals/India/Chennai/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery/ASD-Closure-(Atrial-Septal-Defect)",
    "/costs/India/Pediatric-Cardiac-Surgery/VSD-Closure-(Ventricular-Septal-Defect)",
    "/costs/India/Pediatric-Cardiac-Surgery/PDA-Closure-(Patent-Ductus-Arteriosus)",
    "/costs/India/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Mumbai/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/blogs/vsd-surgery-in-babies-and-children",
    "/blogs/open-heart-surgery-vs-catheter-treatment-children",
    "/blogs/signs-of-congenital-heart-disease-in-babies",
    "/blogs/tetralogy-of-fallot-surgery-india",
    "/blogs/pda-closure-in-babies",
    "/blogs/pediatric-heart-surgery-cost-in-india",
    "/blogs/best-hospitals-pediatric-heart-surgery-india",
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
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }
  const page = getPublishedCuratedTreatment("asd-closure-surgery-in-india", "en");
  assert.match(page?.translations.en?.editorialBody ?? "", new RegExp(`/blogs/${SLUG}`));

  for (const file of [
    "asd-children-anatomy.webp",
    "asd-children-types.webp",
    "asd-children-closure.webp",
    "asd-children-timing.webp",
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
