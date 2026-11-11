import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { articleCtaCount, faqsFromArticleBlocks, getPost } from "@/lib/blogs";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

const SLUG = "breast-cancer-treatment-cost-in-india";

test("breast cancer cost blog refresh uses GAF USD sheets, FAQs and WebPs", () => {
  const post = getPost(SLUG, "en");
  assert.ok(post);
  assert.equal(post.status, "published");
  assert.equal(post.seoTitle, "Breast Cancer Treatment Cost in India: Complete Price Guide (2026)");
  assert.match(post.seoDescription, /breast cancer treatment costs in India/i);
  assert.equal(post.canonical, `https://gaf.healthcare/blogs/${SLUG}`);

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
  assert.match(texts, /\$3,500–\$8,000/);
  assert.match(texts, /\$4,500–\$10,000/);
  assert.match(texts, /\$1,500–\$8,000\+/);
  assert.doesNotMatch(texts, /₹/);
  assert.match(texts, /wa\.me\/919044346292/);
  assert.match(texts, /\/consult/);
  assert.match(texts, /\/treatments\/breast-cancer-treatment-in-india/);
  assert.ok(articleCtaCount(post.blocks) >= 5);
  assert.ok(faqsFromArticleBlocks(post.blocks).length >= 15);
  for (const f of [
    "breast-cancer-cost-stack.webp",
    "breast-cancer-cost-surgery.webp",
    "breast-cancer-cost-estimate.webp",
    "breast-cancer-cost-international.webp",
  ]) {
    assert.match(texts, new RegExp(f.replace(/\./g, "\\.")));
    assert.ok(existsSync(join(process.cwd(), "public/uploads/articles", f)));
  }
  assert.ok(buildLocaleSitemap("en").some((r) => r.url.endsWith(`/blogs/${SLUG}`)));
  assert.match(readFileSync(join(process.cwd(), "public/llms.txt"), "utf8"), /breast-cancer-treatment-cost-in-india/);
});
