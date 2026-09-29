import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "knee-replacement-surgery-in-india";

test("the published knee replacement blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Knee Replacement Surgery in India: Cost, Hospitals & Recovery");
  assert.match(post.seoDescription, /types|cost|implants|robotic|hospitals|recovery/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);
  assert.equal(
    post.imageAlt,
    "Close-up of an osteoarthritic adult knee showing worn cartilage and exposed bone on the femur, tibia and patella",
  );

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "heading") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "list") return block.items.join("\n");
      if (block.type === "image") return block.src;
      if (block.type === "html") return block.html;
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /<table>/);
  assert.match(texts, /What is knee replacement surgery\?/);
  assert.match(texts, /Total Knee Replacement \(TKR\/TKA\)/);
  assert.match(texts, /\$5,500–\$12,000/);
  assert.match(texts, /\$7,000–\$15,000/);
  assert.match(texts, /\$4,500–\$10,000/);
  assert.match(texts, /\$9,000–\$18,000/);
  assert.match(texts, /\$6,000–\$13,000/);
  assert.match(texts, /4–7 nights/);
  assert.doesNotMatch(texts, /₹/);
  assert.doesNotMatch(texts, /\blakh\b/i);
  assert.match(texts, /How GAF Healthcare Can Help/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /local emergency department/);
  assert.match(texts, /\/costs\/India\/Orthopedics\/Total-Knee-Replacement/);
  assert.match(texts, /\/costs\/India\/Orthopedics\/Robotic-Knee-Replacement/);
  assert.match(texts, /\/costs\/India\/Orthopedics\/Partial-Knee-Replacement/);
  assert.match(texts, /\/costs\/India\/Orthopedics\/Revision-Knee-Replacement/);
  assert.match(texts, /\/costs\/India\/Orthopedics\/Total-Hip-Replacement/);
  assert.match(texts, /\/doctors\/India\/Orthopedics/);
  assert.doesNotMatch(texts, /\/blogs\/total-knee-replacement-in-india/);
  assert.doesNotMatch(texts, /\/blogs\/robotic-knee-replacement-in-india/);
  assert.doesNotMatch(texts, /\/treatments\/india\/knee-replacement-surgery/);
  for (const path of [
    "/doctors/India/Delhi-NCR/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Mumbai/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Bengaluru/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Chennai/Orthopedics/Total-Knee-Replacement",
    "/doctors/India/Hyderabad/Orthopedics/Total-Knee-Replacement",
    "/hospitals/India/Delhi-NCR/Orthopedics",
    "/hospitals/India/Mumbai/Orthopedics",
    "/hospitals/India/Bengaluru/Orthopedics",
    "/costs/India/Delhi-NCR/Orthopedics/Total-Knee-Replacement",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(parsePrettyCatalogSegments(path.split("/").slice(2)), path);
  }

  for (const file of [
    "knee-oa-anatomy.webp",
    "knee-tkr-implants.webp",
    "knee-robotic.webp",
    "knee-physio.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  assert.ok((texts.match(/wa\.me\/919044346292/g) ?? []).length >= 3);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);
  assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${SLUG}`)));
});
