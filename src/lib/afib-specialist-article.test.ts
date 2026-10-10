import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { getPost } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";

test("AFib specialist headings are anchors and the quick answer stays intact", () => {
  const post = getPost("best-cardiologists-for-atrial-fibrillation-in-india", "en");
  assert.ok(post);
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      blocks: post.blocks,
      title: post.title,
      whatsappCtas: true,
      ctaSubject: "Best Cardiologists for Atrial Fibrillation",
      ctaPlace: "India",
    }),
  );
  assert.match(html, /article-quick-answer/);
  assert.match(html, /cardiac electrophysiologist may be particularly relevant/);
  assert.match(html, /Preventing stroke is also a central part of AFib management/);
  assert.match(html, /US\$6,500–US\$16,000/);
  assert.match(html, /US\$40,000–US\$90,000/);
  assert.match(html, /1–3 nights/);
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
