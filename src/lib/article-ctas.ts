import type { ArticleBlock } from "@/lib/cms/types";
import { consultToWhatsappHref } from "@/lib/site";

const CTA_MARKDOWN =
  /\[([^\]]+)\]\(((?:\/consult\?|https:\/\/wa\.me\/)[^)]+)\)/gi;

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
