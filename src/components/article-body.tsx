import type { Article, ArticleBlock } from "@/lib/cms/types";
import { MarkdownBody } from "@/components/markdown-body";
import { consultToWhatsappHref } from "@/lib/site";

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

export function ArticleBlocks({
  blocks,
  title,
  whatsappCtas = false,
}: {
  blocks: ArticleBlock[];
  title?: string;
  whatsappCtas?: boolean;
}) {
  return (
    <div className="article-body">
      {blocks.map((block) => {
        if (block.type === "paragraph") {
          const source = withoutDuplicateTitle(block.text, title);
          return source.trim() ? (
            <MarkdownBody key={block.id} source={source} whatsappCtas={whatsappCtas} />
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
          const href = whatsappCtas ? consultToWhatsappHref(block.href) : block.href;
          const cta =
            /^\/consult(?:\?|$)/.test(href) || /^https:\/\/wa\.me\//i.test(href);
          return (
            <p key={block.id}>
              <a
                href={href}
                className={cta ? "md-cta" : undefined}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              >
                {block.label}
              </a>
            </p>
          );
        }
        return null;
      })}
    </div>
  );
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
