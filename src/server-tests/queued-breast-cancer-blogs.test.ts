import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost, listPublishedPosts } from "@/lib/blogs";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const ARTICLES = [
  {
    slug: "breast-cancer-radiation-side-effects",
    seoTitle: "Breast Cancer Radiation Side Effects: Skin, Fatigue & Recovery",
    image: "radiation-side-effects-planning-visual.webp",
  },
  {
    slug: "breast-cancer-follow-up-tests",
    seoTitle: "Breast Cancer Follow-Up Tests: Mammogram, MRI, Blood Tests & Scans",
    image: "followup-tests-mammogram-visual.webp",
  },
  {
    slug: "breast-cancer-neoadjuvant-therapy",
    seoTitle: "Breast Cancer Neoadjuvant Therapy: Treatment Before Surgery in India",
    image: "neoadjuvant-infusion-visual.webp",
  },
  {
    slug: "breast-cancer-lymphedema",
    seoTitle: "Breast Cancer and Lymphedema: Symptoms, Prevention & Treatment in India",
    image: "lymphedema-measure-visual.webp",
  },
  {
    slug: "breast-cancer-pathology-report-explained",
    seoTitle: "Breast Cancer Pathology Report Explained: Grade, Margins, Ki-67 & More",
    image: "pathology-lab-visual.webp",
  },
  {
    slug: "breast-cancer-recurrence-treatment-india",
    seoTitle: "Breast Cancer Recurrence: Signs, Types, Treatment & Cost in India",
    image: "recurrence-consult-visual.webp",
  },
  {
    slug: "breast-cancer-in-young-women-treatment-india",
    seoTitle: "Breast Cancer in Young Women: Symptoms, Treatment & Cost in India",
    image: "young-women-consult-visual.webp",
  },
  {
    slug: "invasive-lobular-carcinoma-treatment-india",
    seoTitle: "Invasive Lobular Carcinoma: Treatment & Cost in India",
    image: "ilc-consult-visual.webp",
  },
  {
    slug: "breast-cancer-during-pregnancy-treatment-india",
    seoTitle: "Breast Cancer During Pregnancy | Treatment & Safety in India",
    image: "pregnancy-consult-visual.webp",
  },
];

test("queued breast-cancer blogs are published, interlinked and indexed only in English", () => {
  for (const item of ARTICLES) {
    const post = getPost(item.slug, "en");
    assert.ok(post, item.slug);
    assert.equal(post.status, "published");
    assert.equal(post.allowIndex, true);
    assert.equal(post.seoTitle, item.seoTitle);
    assert.ok((post.keywords?.length ?? 0) >= 6, item.slug);

    const texts = post.blocks
      .map((block) => {
        if (block.type === "paragraph") return block.text;
        if (block.type === "button") return `[${block.label}](${block.href})`;
        if (block.type === "image") return block.src;
        if (block.type === "html") return block.html;
        return "";
      })
      .join("\n");

    assert.match(texts, /article-quick-answer/, item.slug);
    assert.match(texts, /wa\.me\/919044346292/, item.slug);
    assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/, item.slug);
    assert.match(texts, /\/doctors\/India\/Delhi-NCR/, item.slug);
    assert.match(texts, /\/hospitals\/India\/Mumbai/, item.slug);
    assert.ok(parsePrettyCatalogSegments("India/Delhi-NCR".split("/")));
    assert.match(texts, new RegExp(item.image.replace(/[.]/g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", item.image)), item.image);
    assert.ok(articleCtaCount(post.blocks) >= 7, `${item.slug} ctas ${articleCtaCount(post.blocks)}`);
    assert.ok(faqsFromArticleBlocks(post.blocks).length >= 8, item.slug);
    assert.equal(listPublishedPosts("ar").some((row) => row.slug === item.slug), false);
    assert.ok(buildLocaleSitemap("en").some((row) => row.url.endsWith(`/blogs/${item.slug}`)));
  }
});
