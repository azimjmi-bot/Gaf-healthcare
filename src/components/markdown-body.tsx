import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { cn } from "cn";

const ALLOWED = ["p", "strong", "em", "a", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "br"];

const components: Components = {
  a: ({ href, children }) => {
    const safe = typeof href === "string" && /^(https?:|mailto:|\/|#)/i.test(href) ? href : undefined;
    return (
      <a href={safe} target={safe?.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener">
        {children}
      </a>
    );
  },
};

export function MarkdownBody({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const text = source.trim();
  if (!text) return null;
  return (
    <div className={cn("md-body", className)}>
      <ReactMarkdown allowedElements={ALLOWED} unwrapDisallowed components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
