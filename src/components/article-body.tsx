import type { ReactNode } from "react";
import type { Article, ArticleBlock } from "@/lib/cms/types";
import { MarkdownBody } from "@/components/markdown-body";
import { PseoEstimateCta } from "@/components/pseo-estimate-cta";
import { WhatsAppCtaLabel } from "@/components/whatsapp-icon";
import {
  BLOG_CTA_VARIANTS,
  ctaLinksFromBlock,
  extractCtaLinks,
  isCtaOnlyBlock,
  stripCtaMarkdown,
} from "@/lib/article-ctas";
import { blogEstimateWhatsapp, consultToWhatsappHref } from "@/lib/site";

export function CoverImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return <div className={className} style={{ background: "#dce8ee" }} />;
  }
  return (
    // CMS covers may be remote or local uploads.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}

function withoutDuplicateTitle(source: string, title?: string) {
  if (!title) return source;
  const match = source.match(/^\s*#\s+(.+?)\s*(?:\n+|$)/);
  if (!match) return source;
  const normalize = (value: string) =>
    value.trim().toLocaleLowerCase().replace(/\s+/g, " ");
  return normalize(match[1]) === normalize(title)
    ? source.slice(match[0].length)
    : source;
}

function BlogEstimatePanel({
  blocks,
  index,
  subject,
  place,
}: {
  blocks: ArticleBlock[];
  index: number;
  subject: string;
  place: string;
}) {
  const found = blocks.flatMap(ctaLinksFromBlock);
  const fallback = blogEstimateWhatsapp(subject, place);
  const primary = found[0]?.href || fallback.primary;
  const secondary = found[1]?.href || fallback.secondary;
  return (
    <PseoEstimateCta
      subject={subject}
      place={place}
      consultHref={primary}
      secondaryHref={secondary}
      variant={BLOG_CTA_VARIANTS[index % BLOG_CTA_VARIANTS.length]}
      className="article-estimate-cta"
    />
  );
}

function renderStandardBlock(
  block: ArticleBlock,
  title?: string,
) {
  if (block.type === "paragraph") {
    const source = withoutDuplicateTitle(block.text, title);
    return source.trim() ? (
      <MarkdownBody key={block.id} source={source} />
    ) : null;
  }
  if (block.type === "heading") {
    if (block.level === 3) return <h3 key={block.id}>{block.text}</h3>;
    if (block.level === 4) return <h4 key={block.id}>{block.text}</h4>;
    return <h2 key={block.id}>{block.text}</h2>;
  }
  if (block.type === "quote") {
    return (
      <blockquote key={block.id}>
        <p>{block.text}</p>
        {block.cite ? <cite>{block.cite}</cite> : null}
      </blockquote>
    );
  }
  if (block.type === "list") {
    const Tag = block.style === "ol" ? "ol" : "ul";
    return (
      <Tag key={block.id}>
        {block.items.filter(Boolean).map((item, i) => (
          <li key={`${block.id}-${i}`}>{item}</li>
        ))}
      </Tag>
    );
  }
  if (block.type === "image") {
    return (
      <figure key={block.id}>
        <CoverImage src={block.src} alt={block.alt} />
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </figure>
    );
  }
  if (block.type === "html") {
    return <div key={block.id} dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
  if (block.type === "separator") {
    return <hr key={block.id} />;
  }
  if (block.type === "button") {
    const href = consultToWhatsappHref(block.href);
    const cta = /^https:\/\/wa\.me\//i.test(href);
    return (
      <p key={block.id}>
        <a
          href={href}
          className={cta ? "md-cta" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        >
          {cta ? <WhatsAppCtaLabel>{block.label}</WhatsAppCtaLabel> : block.label}
        </a>
      </p>
    );
  }
  return null;
}

export function ArticleBlocks({
  blocks,
  title,
  whatsappCtas = true,
  ctaSubject,
  ctaPlace = "India",
}: {
  blocks: ArticleBlock[];
  title?: string;
  whatsappCtas?: boolean;
  ctaSubject?: string;
  ctaPlace?: string;
}) {
  const subject = ctaSubject || title?.split(":")[0]?.trim() || "treatment";

  if (!whatsappCtas) {
    return (
      <div className="article-body">
        {blocks.map((block) => renderStandardBlock(block, title))}
      </div>
    );
  }

  const rendered: ReactNode[] = [];
  let index = 0;
  let panel = 0;
  while (index < blocks.length) {
    const block = blocks[index];
    if (block.type === "paragraph") {
      const source = withoutDuplicateTitle(block.text, title);
      const links = extractCtaLinks(source);
      const rest = stripCtaMarkdown(source);
      if (links.length) {
        if (rest) {
          rendered.push(<MarkdownBody key={`${block.id}-copy`} source={rest} />);
        }
        const group: ArticleBlock[] = [block];
        index += 1;
        while (index < blocks.length && isCtaOnlyBlock(blocks[index])) {
          group.push(blocks[index]);
          index += 1;
        }
        rendered.push(
          <BlogEstimatePanel
            key={`${block.id}-cta`}
            blocks={group}
            index={panel}
            subject={subject}
            place={ctaPlace}
          />,
        );
        panel += 1;
        continue;
      }
    }
    if (isCtaOnlyBlock(block)) {
      const group: ArticleBlock[] = [block];
      const startId = block.id;
      index += 1;
      while (index < blocks.length && isCtaOnlyBlock(blocks[index])) {
        group.push(blocks[index]);
        index += 1;
      }
      rendered.push(
        <BlogEstimatePanel
          key={`${startId}-cta`}
          blocks={group}
          index={panel}
          subject={subject}
          place={ctaPlace}
        />,
      );
      panel += 1;
      continue;
    }
    rendered.push(renderStandardBlock(block, title));
    index += 1;
  }

  return <div className="article-body">{rendered}</div>;
}

export function ArticleRelated({ links }: { links: Article["relatedLinks"] }) {
  if (!links.length) return null;
  return (
    <ul className="mt-8 flex flex-col gap-2">
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <a href={link.href} className="underline-offset-4 hover:underline">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
