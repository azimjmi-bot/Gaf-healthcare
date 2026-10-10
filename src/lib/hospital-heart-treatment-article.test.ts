import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { getPost } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";

test("hospital-choice headings are anchors and the quick answer stays intact", () => {
  const post = getPost("how-to-choose-a-hospital-for-heart-treatment-in-india", "en");
  assert.ok(post);
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      blocks: post.blocks,
      title: post.title,
      whatsappCtas: true,
      ctaSubject: "How to Choose the Best Hospital for Heart Treatment",
      ctaPlace: "India",
    }),
  );
  assert.match(html, /article-quick-answer/);
  assert.match(html, /article-quick-answer__list/);
  assert.match(html, /complex congenital heart surgery/);
  assert.match(html, /US\$400–US\$1,200/);
  assert.match(html, /US\$3,200–US\$8,500/);
  assert.match(html, /1–3 nights typical/);
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
