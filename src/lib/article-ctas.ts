import type { ArticleBlock } from "@/lib/cms/types";
import { consultToWhatsappHref } from "@/lib/site";

const CTA_MARKDOWN =
  /\[([^\]]+)\]\(((?:\/consult(?:\?[^)]*)?|https:\/\/wa\.me\/[^)]+))\)/gi;

export function isCtaHref(href: string) {
  return /^(?:\/consult(?:\?|$)|https:\/\/wa\.me\/)/i.test(href);
}

export function extractCtaLinks(text: string) {
  const links: { label: string; href: string }[] = [];
  const pattern = new RegExp(CTA_MARKDOWN.source, CTA_MARKDOWN.flags);
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    links.push({
      label: match[1].trim(),
      href: consultToWhatsappHref(match[2]),
    });
  }
  return links;
}

export function stripCtaMarkdown(text: string) {
  return text
    .replace(new RegExp(CTA_MARKDOWN.source, CTA_MARKDOWN.flags), "")
    .replace(/\s*[·•|]\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function isCtaOnlyParagraph(text: string) {
  return extractCtaLinks(text).length > 0 && stripCtaMarkdown(text).length === 0;
}

export function isCtaOnlyBlock(block: ArticleBlock) {
  if (block.type === "button") return isCtaHref(block.href);
  if (block.type === "paragraph") return isCtaOnlyParagraph(block.text);
  return false;
}

export function ctaLinksFromBlock(block: ArticleBlock) {
  if (block.type === "button" && isCtaHref(block.href)) {
    return [{ label: block.label, href: consultToWhatsappHref(block.href) }];
  }
  if (block.type === "paragraph") return extractCtaLinks(block.text);
  return [];
}

export const BLOG_CTA_VARIANTS = ["records", "options", "hospital", "travel", "plan"] as const;
export type BlogCtaVariant = (typeof BLOG_CTA_VARIANTS)[number];

export type MarkdownCtaChunk =
  | { type: "markdown"; source: string }
  | { type: "cta"; links: { label: string; href: string }[] };

/** Split editorial Markdown so CTA-only paragraphs become estimate-card slots. */
export function splitMarkdownByCtas(source: string): MarkdownCtaChunk[] {
  const text = source.trim();
  if (!text) return [];
  const blocks = text.split(/\n{2,}/);
  const chunks: MarkdownCtaChunk[] = [];
  let markdown: string[] = [];
  const flushMarkdown = () => {
    if (!markdown.length) return;
    chunks.push({ type: "markdown", source: markdown.join("\n\n") });
    markdown = [];
  };
  let index = 0;
  while (index < blocks.length) {
    if (isCtaOnlyParagraph(blocks[index])) {
      flushMarkdown();
      const links = extractCtaLinks(blocks[index]);
      index += 1;
      while (index < blocks.length && isCtaOnlyParagraph(blocks[index])) {
        links.push(...extractCtaLinks(blocks[index]));
        index += 1;
      }
      chunks.push({ type: "cta", links });
      continue;
    }
    markdown.push(blocks[index]);
    index += 1;
  }
  flushMarkdown();
  return chunks;
}
