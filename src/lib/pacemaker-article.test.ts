import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { getPost } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";

test("pacemaker headings are anchor targets and the quick answer keeps the procedure packages", () => {
  const post = getPost("pacemaker-cost-in-india", "en");
  assert.ok(post);
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      blocks: post.blocks,
      title: post.title,
      whatsappCtas: true,
      ctaSubject: "Pacemaker Cost",
      ctaPlace: "India",
    }),
  );
  assert.match(html, /article-quick-answer__list/);
  assert.match(html, /₹85,000–₹1,65,000/);
  assert.match(html, /₹1,06,300–₹2,06,300/);
  assert.match(html, /₹1,10,500–₹2,14,500/);
  assert.match(html, /not national averages and not complete all-inclusive patient prices/);
  assert.match(html, /US\$3,500–US\$9,000/);
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
