import "@/styles/article.css";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "cn";
import { WhatsAppCtaLabel } from "@/components/whatsapp-icon";
import type { AppLocale } from "@/lib/i18n/languages";
import { isInternalHref, localePath } from "@/lib/i18n/path";

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

function markdownComponents(inline = false, locale: AppLocale = "en"): Components {
  return {
  h1: ({ children }) => <h2>{children}</h2>,
  ...(inline ? { p: ({ children }) => <>{children}</> } : {}),
  a: ({ href, children }) => {
    const raw = typeof href === "string" && /^(https?:|mailto:|tel:|\/|#)/i.test(href) ? href : undefined;
    const safe = raw && isInternalHref(raw) ? localePath(raw, locale) : raw;
    const cta = typeof safe === "string" && /^https:\/\/wa\.me\//i.test(safe);
    const external = typeof safe === "string" && /^https?:\/\//i.test(safe);
    return (
      <a
        href={safe}
        className={cta ? "md-cta" : undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {cta ? <WhatsAppCtaLabel>{children}</WhatsAppCtaLabel> : children}
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
  inline = false,
  locale = "en",
}: {
  source: string;
  className?: string;
  /** Render without a paragraph wrapper, for links inside a list item or caption. */
  inline?: boolean;
  locale?: AppLocale;
}) {
  const text = source.trim();
  if (!text) return null;
  return (
    <div className={cn("md-body", inline && "md-body--inline", className)}>
      <ReactMarkdown
        allowedElements={ALLOWED}
        unwrapDisallowed
        components={markdownComponents(inline, locale)}
        remarkPlugins={[remarkGfm]}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
