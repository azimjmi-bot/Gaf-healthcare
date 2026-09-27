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

test("rewrites consult CTAs to WhatsApp when requested", () => {
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, {
      whatsappCtas: true,
      ctaSubject: "Breast Reconstruction After Mastectomy",
      blocks: [
        {
          id: "p",
          type: "paragraph" as const,
          text: "[Ask GAF](/consult?treatment=Lumpectomy)",
        },
        {
          id: "b",
          type: "button" as const,
          label: "Request a quote",
          href: "/consult?treatment=Mastectomy",
        },
      ],
    }),
  );
  assert.match(html, /cost-panel/);
  assert.match(html, /Need a case-specific Breast Reconstruction After Mastectomy estimate/);
  assert.match(html, /Request a personalized treatment estimate/);
  assert.match(html, /https:\/\/wa\.me\/919044346292\?text=/);
  assert.doesNotMatch(html, /href="\/consult/);
  assert.doesNotMatch(html, /md-cta/);
});

test("drops unsafe Markdown link and image destinations", () => {
  const html = renderToStaticMarkup(
    createElement(MarkdownBody, {
      source: "[unsafe](javascript:alert(1)) ![unsafe](data:text/html,bad)",
    }),
  );
  assert.doesNotMatch(html, /javascript:|data:text\/html/);
});
