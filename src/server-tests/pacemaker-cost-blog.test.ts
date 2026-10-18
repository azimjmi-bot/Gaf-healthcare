import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";
import { CARDIOLOGY_COST } from "@/lib/cardiology-costs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "pacemaker-cost-in-india";

function asUs(partner: string) {
  return partner.replaceAll("$", "US$");
}

function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("the pacemaker guide quotes published planning ranges and the Medanta procedure packages", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.category, "Cardiology");
  assert.equal(post.title, "Pacemaker Cost in India: A Complete Patient Guide");
  assert.equal(post.seoTitle, "Pacemaker Cost in India: Device Types, Surgery & Recovery");
  assert.match(post.seoDescription, /Understand pacemaker cost in India/);
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
  assert.match(texts, /article-quick-answer__list/);
  assert.match(texts, /not national averages and not complete all-inclusive patient prices/);
  assert.match(texts, /₹85,000–₹1,65,000/);
  assert.match(texts, /₹1,06,300–₹2,06,300/);
  assert.match(texts, /₹1,10,500–₹2,14,500/);

  const pacemaker = CARDIOLOGY_COST["Pacemaker Implantation"].partner;
  const leadless = CARDIOLOGY_COST["Leadless Pacemaker Implantation"].partner;
  const crt = CARDIOLOGY_COST["CRT/CRT-D Implantation"].partner;
  const icd = CARDIOLOGY_COST["ICD Implantation (Implantable Cardioverter-Defibrillator)"].partner;
  assert.match(texts, new RegExp(escapeRe(asUs(pacemaker))));
  assert.match(texts, new RegExp(escapeRe(asUs(leadless))));
  assert.match(texts, new RegExp(escapeRe(asUs(crt))));
  assert.match(texts, new RegExp(escapeRe(asUs(icd))));
  assert.doesNotMatch(texts, /US\$20,000–US\$50,000/);

  assert.doesNotMatch(
    texts,
    /\/blogs\/(?:electrophysiologist-vs-cardiologist|heart-surgery-recovery-in-india|how-to-choose-a-hospital-for-heart-treatment-in-india|travelling-to-india-for-heart-treatment|what-to-bring-to-a-cardiologist-appointment|best-cardiologists-for-atrial-fibrillation-in-india)/,
  );

  for (const path of [
    "/costs/India/Cardiology/Pacemaker-Implantation",
    "/costs/India/Delhi-NCR/Cardiology/Pacemaker-Implantation",
    "/costs/India/Cardiology/Leadless-Pacemaker-Implantation",
    "/costs/India/Cardiology/CRT-CRT-D-Implantation",
    "/costs/India/Cardiology/ICD-Implantation-Implantable-Cardioverter-Defibrillator",
    "/doctors/India/Cardiology",
    "/doctors/India/Delhi-NCR/Cardiology",
    "/doctors/India/Mumbai/Cardiology",
    "/doctors/India/Bengaluru/Cardiology",
    "/doctors/India/Chennai/Cardiology",
    "/doctors/India/Hyderabad/Cardiology",
    "/hospitals/India/Cardiology",
    "/blogs/icd-implantation-cost-in-india",
    "/blogs/cardiac-ablation-cost-in-india",
  ]) {
    assert.match(texts, new RegExp(escapeRe(path)));
    if (path.startsWith("/blogs/")) continue;
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "pacemaker-chest-lead.webp",
    "pacemaker-single-dual.webp",
    "leadless-pacemaker.webp",
    "pacemaker-follow-up.webp",
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
  const sitemap = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(sitemap.some((url) => url.endsWith(`/blogs/${SLUG}`)));
});
