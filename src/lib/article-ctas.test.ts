import assert from "node:assert/strict";
import test from "node:test";
import {
  extractCtaLinks,
  isCtaOnlyBlock,
  isCtaOnlyParagraph,
  stripCtaMarkdown,
} from "@/lib/article-ctas";

test("detects CTA-only paragraphs and leaves prose", () => {
  assert.equal(
    isCtaOnlyParagraph("[WhatsApp +91 90443 46292](https://wa.me/919044346292?text=Hello)"),
    true,
  );
  assert.equal(
    isCtaOnlyParagraph(
      "[Ask GAF](/consult?treatment=Breast%20Reconstruction) · [WhatsApp](https://wa.me/919044346292?text=Hi)",
    ),
    true,
  );
  assert.equal(
    isCtaOnlyParagraph("See the [cost guide](/blogs/cost) before you travel."),
    false,
  );
  assert.equal(
    stripCtaMarkdown("Read this [Ask GAF](/consult?treatment=X) first."),
    "Read this first.",
  );
  const links = extractCtaLinks(
    "[Ask](/consult?treatment=Breast%20Reconstruction) · [WhatsApp](https://wa.me/919044346292?text=Hi)",
  );
  assert.equal(links.length, 2);
  assert.match(links[0].href, /wa\.me\/919044346292/);
  assert.equal(
    isCtaOnlyBlock({
      id: "b",
      type: "button",
      label: "Ask GAF",
      href: "/consult?treatment=Breast%20Reconstruction",
    }),
    true,
  );
});
