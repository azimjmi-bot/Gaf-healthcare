import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { getPost } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";

test("cardiac ablation headings are anchor targets for the table of contents", () => {
  const post = getPost("cardiac-ablation-cost-in-india", "en");
  assert.ok(post);
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      blocks: post.blocks,
      title: post.title,
      whatsappCtas: true,
      ctaSubject: "Cardiac Ablation",
      ctaPlace: "India",
    }),
  );
  assert.match(html, /article-quick-answer__list/);
  assert.match(html, /Do not compare quotations/);
  assert.ok((html.match(/wa\.me\/919044346292/g) || []).length >= 5);

  const used = new Map<string, number>();
  for (const block of post.blocks) {
    if (block.type !== "heading") continue;
    const base = slugify(block.text) || "section";
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    const id = seen === 0 ? base : `${base}-${seen + 1}`;
    assert.match(html, new RegExp(`id="${id}"`));
  }
});
