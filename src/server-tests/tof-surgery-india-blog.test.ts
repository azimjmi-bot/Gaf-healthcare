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

const SLUG = "tetralogy-of-fallot-surgery-india";

function asUs(value: string) {
  return value.replaceAll("$", "US$");
}
function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the Tetralogy of Fallot guide keeps the quick answer and the directory planning band", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Pediatric Cardiac Surgery");
  assert.equal(
    post.title,
    "Tetralogy of Fallot Surgery in India: Treatment, Cost, Best Age for Surgery and Recovery",
  );
  assert.equal(post.seoTitle, "Tetralogy of Fallot Surgery in India: Cost, Timing & Recovery");
  assert.equal(
    post.seoDescription,
    "Learn about Tetralogy of Fallot surgery in India, symptoms, diagnosis, best age for repair, treatment options, estimated costs, recovery and follow-up.",
  );
  assert.equal(post.canonical, "https://gaf.healthcare/blogs/tetralogy-of-fallot-surgery-india");
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
  assert.match(
    texts,
    /Tetralogy of Fallot \(TOF\) is a congenital heart defect involving four abnormalities in the heart/,
  );
  assert.match(texts, /often around 6–12 months of age under Indian consensus guidance/);
  assert.match(texts, /approximately ₹2 lakh–₹5 lakh/);
  assert.match(texts, /does not publish a single fee for Tetralogy of Fallot surgery/);
  assert.match(texts, /not the GAF directory band/);
  assert.match(texts, /blue or grey/);
  assert.doesNotMatch(texts, /\/blog\//);

  const row = PEDIATRIC_CARDIAC_SURGERY_COST["TOF Repair (Tetralogy of Fallot)"];
  assert.match(texts, new RegExp(escapeRe(asUs(row.partner))));
  assert.match(texts, new RegExp(escapeRe(row.stay)));
  assert.match(texts, new RegExp(escapeRe(asUs(row.us))));
  for (const name of ["VSD Closure (Ventricular Septal Defect)", "Arterial Switch Operation", "PDA Closure (Patent Ductus Arteriosus)"]) {
    const other = PEDIATRIC_CARDIAC_SURGERY_COST[name];
    assert.match(texts, new RegExp(escapeRe(asUs(other.partner))), name);
    assert.match(texts, new RegExp(escapeRe(other.stay)), `${name} stay`);
  }

  for (const path of [
    "/doctors/India/Pediatric-Cardiac-Surgery",
    "/doctors/India/Delhi-NCR/Pediatric-Cardiac-Surgery",
    "/doctors/India/Mumbai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Bengaluru/Pediatric-Cardiac-Surgery",
    "/doctors/India/Chennai/Pediatric-Cardiac-Surgery",
    "/doctors/India/Hyderabad/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Pediatric-Cardiac-Surgery",
    "/hospitals/India/Bengaluru/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery",
    "/costs/India/Pediatric-Cardiac-Surgery/TOF-Repair-(Tetralogy-of-Fallot)",
    "/costs/India/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Delhi-NCR/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/costs/India/Mumbai/Cardiac-Surgery/Congenital-Heart-Surgery",
    "/blogs/signs-of-congenital-heart-disease-in-babies",
    "/blogs/open-heart-surgery-vs-catheter-treatment-children",
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
    "tof-repair-surgery-in-india",
    "ventricular-septal-defect-surgery-in-india",
  ]) {
    assert.match(texts, new RegExp(`/treatments/${treatment}`));
    assert.ok(getPublishedCuratedTreatment(treatment, "en"), treatment);
  }
  const tofPage = getPublishedCuratedTreatment("tof-repair-surgery-in-india", "en");
  assert.match(tofPage?.translations.en?.editorialBody ?? "", new RegExp(`/blogs/${SLUG}`));

  for (const file of ["tof-four-defects.webp", "tof-repair.webp", "tof-timing.webp", "tof-recovery.webp"]) {
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
