import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "radiation-therapy-for-breast-cancer";

test("the published radiation-therapy blog is complete, interlinked and indexed only in English", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.allowIndex, true);
  assert.equal(post.seoTitle, "Radiation Therapy for Breast Cancer in India | Cost & Sessions");
  assert.match(post.seoDescription, /session|side effect|cost|planning/i);
  assert.ok((post.keywords?.length ?? 0) >= 8);

  const texts = post.blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "image") return block.src;
      if (block.type === "html") return block.html;
      return "";
    })
    .join("\n");

  assert.match(texts, /article-quick-answer/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\+91 90443 46292/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.match(texts, /\/blogs\/chemotherapy-for-breast-cancer-in-india/);
  assert.match(texts, /\/blogs\/breast-reconstruction-after-mastectomy-india/);
  assert.match(texts, /\/blogs\/hormone-therapy-breast-cancer-india/);
  assert.match(texts, /\/blogs\/breast-cancer-treatment-cost-in-india/);
  for (const path of [
    "/doctors/India/Radiation-Oncology",
    "/hospitals/India/Radiation-Oncology",
    "/costs/India/Radiation-Oncology",
    "/costs/India/Radiation-Oncology/EBRT",
    "/doctors/India/Radiation-Oncology/EBRT",
    "/costs/India/Radiation-Oncology/IMRT",
    "/costs/India/Radiation-Oncology/3D-CRT",
    "/costs/India/Surgical-Oncology/Lumpectomy",
    "/costs/India/Surgical-Oncology/Mastectomy",
    "/doctors/India/Delhi-NCR/Radiation-Oncology",
    "/doctors/India/Mumbai",
    "/hospitals/India/Delhi-NCR",
    "/hospitals/India/Mumbai",
  ]) {
    assert.match(texts, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    const segments = path.split("/").slice(2);
    assert.ok(parsePrettyCatalogSegments(segments), path);
  }

  for (const file of [
    "radiation-breast-planning-visual.webp",
    "radiation-breast-session-visual.webp",
    "radiation-breast-breath-hold-visual.webp",
    "radiation-breast-followup-visual.webp",
  ]) {
    assert.match(texts, new RegExp(file.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", file)), file);
  }

  assert.ok(articleCtaCount(post.blocks) >= 7, `expected 7 CTAs, found ${articleCtaCount(post.blocks)}`);
  const whatsapp = (texts.match(/wa\.me\/919044346292/g) ?? []).length;
  assert.ok(whatsapp >= 3, `expected WhatsApp CTAs, found ${whatsapp}`);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 10);
  assert.equal(listPublishedPosts("ar").some((row) => row.slug === SLUG), false);

  const sitemap = buildLocaleSitemap("en").map((row) => row.url);
  assert.ok(sitemap.some((url) => url.endsWith(`/blogs/${SLUG}`)));
});
