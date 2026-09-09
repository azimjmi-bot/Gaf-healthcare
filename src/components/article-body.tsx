import type { Article, ArticleBlock } from "@/lib/cms/types";

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

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="article-body">
      {blocks.map((block) => {
        if (block.type === "paragraph") {
          return block.text.trim() ? <p key={block.id}>{block.text}</p> : null;
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
          return (
            <p key={block.id}>
              <a href={block.href}>{block.label}</a>
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
