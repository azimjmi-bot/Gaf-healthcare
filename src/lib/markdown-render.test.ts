import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import { MarkdownBody } from "@/components/markdown-body";

test("renders CMS Markdown with GFM elements", () => {
  const html = renderToStaticMarkup(
    createElement(MarkdownBody, {
      source: [
        "## Early signs",
        "",
        "**Important** and *emphasized* with [guidance](/consult).",
        "",
        "- First",
        "- Second",
        "",
        "| Test | Purpose |",
        "| --- | --- |",
        "| MRI | Imaging |",
        "",
        "~~Outdated~~",
      ].join("\n"),
    }),
  );
  assert.match(html, /<h2>Early signs<\/h2>/);
  assert.match(html, /<strong>Important<\/strong>/);
  assert.match(html, /<ul>/);
  assert.match(html, /<table>/);
  assert.match(html, /<del>Outdated<\/del>/);
  assert.match(html, /href="\/consult"/);
});

test("removes a duplicate Markdown title from a blog body", () => {
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      title: "Breast Cancer Symptoms",
      blocks: [
        {
          id: "body",
          type: "paragraph" as const,
          text: "# Breast Cancer Symptoms\n\nBody paragraph.",
        },
      ],
    }),
  );
  assert.doesNotMatch(html, /<h2>Breast Cancer Symptoms<\/h2>/);
  assert.match(html, /<p>Body paragraph.<\/p>/);
});

test("drops unsafe Markdown link and image destinations", () => {
  const html = renderToStaticMarkup(
    createElement(MarkdownBody, {
      source: "[unsafe](javascript:alert(1)) ![unsafe](data:text/html,bad)",
    }),
  );
  assert.doesNotMatch(html, /javascript:|data:text\/html/);
});
