import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { getPost } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";

test("angioplasty specialist headings are anchors and the checklist stays intact", () => {
  const post = getPost("how-to-choose-an-angioplasty-specialist-in-india", "en");
  assert.ok(post);
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      blocks: post.blocks,
      title: post.title,
      whatsappCtas: true,
      ctaSubject: "How to Choose an Angioplasty Specialist",
      ctaPlace: "India",
    }),
  );
  assert.match(html, /article-quick-answer__list/);
  assert.match(html, /Verify qualifications/);
  assert.match(html, /Consider a second opinion/);
  assert.match(html, /US\$3,200–US\$8,500/);
  assert.match(html, /1–3 nights typical/);
  assert.match(html, /US\$5,500–US\$14,000/);
  assert.match(html, /7–14 nights, then nearby recovery/);
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
