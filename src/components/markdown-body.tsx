import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "cn";
import { consultToWhatsappHref } from "@/lib/site";

const ALLOWED = [
  "p",
  "strong",
  "em",
  "del",
  "a",
  "img",
  "ul",
  "ol",
  "li",
  "input",
  "h1",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "br",
  "hr",
  "pre",
  "code",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

function markdownComponents(whatsappCtas?: boolean): Components {
  return {
  h1: ({ children }) => <h2>{children}</h2>,
  a: ({ href, children }) => {
    const raw = typeof href === "string" && /^(https?:|mailto:|\/|#)/i.test(href) ? href : undefined;
    const safe = raw && whatsappCtas ? consultToWhatsappHref(raw) : raw;
    const cta =
      typeof safe === "string" &&
      (/^\/consult(?:\?|$)/.test(safe) || /^https:\/\/wa\.me\//i.test(safe));
    return (
      <a
        href={safe}
        className={cta ? "md-cta" : undefined}
        target={safe?.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    const safe =
      typeof src === "string" && /^(https?:|\/)/i.test(src) ? src : undefined;
    if (!safe) return null;
    // CMS Markdown can reference either uploaded paths or remote editorial images.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={safe} alt={alt || ""} loading="lazy" />;
  },
  };
}

export function MarkdownBody({
  source,
  className,
  whatsappCtas = false,
}: {
  source: string;
  className?: string;
  whatsappCtas?: boolean;
}) {
  const text = source.trim();
  if (!text) return null;
  return (
    <div className={cn("md-body", className)}>
      <ReactMarkdown
        allowedElements={ALLOWED}
        unwrapDisallowed
        components={markdownComponents(whatsappCtas)}
        remarkPlugins={[remarkGfm]}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
