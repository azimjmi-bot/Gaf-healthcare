import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { getPost } from "@/lib/blogs";
import { slugify } from "@/lib/cms/types";

test("appointment checklist headings are anchors and the records list stays intact", () => {
  const post = getPost("what-to-bring-to-a-cardiologist-appointment", "en");
  assert.ok(post);
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      blocks: post.blocks,
      title: post.title,
      whatsappCtas: true,
      ctaSubject: "What to Bring to a Cardiologist Appointment",
      ctaPlace: "India",
    }),
  );
  assert.match(html, /article-quick-answer__list/);
  assert.match(html, /ECG reports and tracings, if available\./);
  assert.match(html, /Echocardiogram reports and images, if available\./);
  assert.match(html, /US\$400–US\$1,200/);
  assert.match(html, /Day-care or overnight/);
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
