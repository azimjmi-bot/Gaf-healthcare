import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBlocks } from "@/components/article-body";
import type { ArticleBlock } from "@/lib/cms/types";
import { localizeProseLinks } from "@/lib/i18n/path";

test("an Arabic blog block renders internal links under /ar", () => {
  const blocks: ArticleBlock[] = [
    {
      id: "p1",
      type: "paragraph",
      text: localizeProseLinks(
        "التفاصيل في [المرحلة](/blogs/breast-cancer-stages-0-1-2-3-4) و[الجراحة](/treatments/breast-cancer-treatment-in-india).",
        "ar",
      ),
    },
    {
      id: "l1",
      type: "list",
      style: "ul",
      items: [
        localizeProseLinks("[أطباء دلهي](/doctors/India/Delhi-NCR/Surgical-Oncology)", "ar"),
      ],
    },
  ];
  const html = renderToStaticMarkup(
    createElement(ArticleBlocks, { blocks, whatsappCtas: false }),
  );
  assert.match(html, /href="\/ar\/blogs\/breast-cancer-stages-0-1-2-3-4"/);
  assert.match(html, /href="\/ar\/treatments\/breast-cancer-treatment-in-india"/);
  assert.match(html, /href="\/ar\/doctors\/india\/delhi-ncr\/surgical-oncology"/);
  assert.doesNotMatch(html, /href="\/blogs\//);
  assert.doesNotMatch(html, /href="\/doctors\/India/);
  assert.doesNotMatch(html, /href="\/treatments\//);
});
