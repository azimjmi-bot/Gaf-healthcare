import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost } from "@/lib/blogs";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SERIES = [
  {
    slug: "breast-cancer-symptoms",
    seoTitle: "Breast Cancer Symptoms: 12 Early Warning Signs You Should Know",
    images: [
      "breast-cancer-symptoms-signs.webp",
      "breast-cancer-symptoms-inflammatory.webp",
      "breast-cancer-symptoms-diagnosis.webp",
      "breast-cancer-symptoms-when-to-see.webp",
    ],
  },
  {
    slug: "breast-cancer-diagnosis",
    seoTitle: "Breast Cancer Diagnosis: Tests, Mammography, Biopsy & Staging",
    images: [
      "breast-cancer-diagnosis-triple.webp",
      "breast-cancer-diagnosis-imaging.webp",
      "breast-cancer-diagnosis-biopsy.webp",
      "breast-cancer-diagnosis-staging.webp",
    ],
  },
  {
    slug: "breast-cancer-stages",
    seoTitle: "Breast Cancer Stages 0 to 4: Symptoms, Treatment and Survival",
    images: [
      "breast-cancer-stages-overview.webp",
      "breast-cancer-stages-tnm.webp",
      "breast-cancer-stages-local-advanced.webp",
      "breast-cancer-stages-metastatic.webp",
    ],
  },
  {
    slug: "breast-cancer-treatment-options",
    seoTitle: "Breast Cancer Treatment Options: Surgery, Chemo & Advanced Therapies",
    images: [
      "breast-cancer-treatment-options-modalities.webp",
      "breast-cancer-treatment-options-surgery.webp",
      "breast-cancer-treatment-options-systemic.webp",
      "breast-cancer-treatment-options-by-stage.webp",
    ],
  },
] as const;

for (const item of SERIES) {
  test(`${item.slug} publishes with SEO, quick answer, FAQs, CTAs and WebPs`, () => {
    const post = getPost(item.slug, "en");
    assert.ok(post, item.slug);
    assert.equal(post.status, "published");
    assert.equal(post.seoTitle, item.seoTitle);
    assert.ok((post.seoDescription || "").length > 50);
    assert.equal(post.canonical, `https://gaf.healthcare/blogs/${item.slug}`);
    assert.ok((post.keywords || []).length >= 5);

    const texts = post.blocks
      .map((b) => {
        if (b.type === "paragraph" || b.type === "heading") return b.text;
        if (b.type === "button") return `[${b.label}](${b.href})`;
        if (b.type === "list") return b.items.join("\n");
        if (b.type === "image") return b.src;
        if (b.type === "html") return b.html;
        return "";
      })
      .join("\n");

    assert.match(texts, /article-quick-answer/);
    assert.doesNotMatch(texts, /₹/);
    assert.match(texts, /wa\.me\/919044346292/);
    assert.match(texts, /\/consult/);
    assert.ok(articleCtaCount(post.blocks) >= 5);
    assert.ok(faqsFromArticleBlocks(post.blocks).length >= 15);
    for (const f of item.images) {
      assert.match(texts, new RegExp(f.replace(/\./g, "\\.")));
      assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", f)), f);
    }
    assert.ok(buildLocaleSitemap("en").some((r) => r.url.endsWith(`/blogs/${item.slug}`)));
    assert.match(readFileSync(join(process.cwd(), "public/llms.txt"), "utf8"), new RegExp(item.slug));
  });
}

test("cost blog remains published alongside the four new guides", () => {
  const post = getPost("breast-cancer-treatment-cost-in-india", "en");
  assert.ok(post);
  assert.equal(post.status, "published");
});
