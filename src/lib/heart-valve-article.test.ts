import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { getPost } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";

test("heart valve headings are anchor targets and the quick answer keeps the Medanta package", () => {
  const post = getPost("heart-valve-replacement-cost-in-india", "en");
  assert.ok(post);
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      blocks: post.blocks,
      title: post.title,
      whatsappCtas: true,
      ctaSubject: "Heart Valve Replacement",
      ctaPlace: "India",
    }),
  );
  assert.match(html, /article-quick-answer/);
  assert.match(html, /₹3\.19 lakh to ₹8\.07 lakh/);
  assert.match(html, /not a current national average or a guaranteed all-inclusive quotation/);
  assert.match(html, /TAVR\/TAVI costs require a separate quotation/);
  assert.match(html, /US\$7,000–US\$18,000/);
  assert.match(html, /US\$18,000–US\$42,000/);
  assert.ok((html.match(/wa\.me\/919044346292/g) || []).length >= 5);
  const used = new Map<string, number>();
  for (const block of post.blocks) {
    if (block.type !== "heading") continue;
    const base = slugify(block.text) || "section";
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    assert.match(html, new RegExp(`id="${seen === 0 ? base : `${base}-${seen + 1}`}"`));
  }
});
