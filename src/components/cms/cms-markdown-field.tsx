"use client";

import { useRef, useState } from "react";
import { Bold, Heading2, Italic, Link2, List } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownBody } from "@/components/markdown-body";

type Props = {
  label: string;
  value: string;
  rows?: number;
  hint?: string;
  onChange: (value: string) => void;
};

export function CmsMarkdownField({
  label,
  value,
  rows = 12,
  hint = "Markdown: **bold**, *italic*, lists, links and headings.",
  onChange,
}: Props) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);

  function wrap(before: string, after = before, placeholder = "text") {
    const el = ref.current;
    if (!el) {
      onChange(`${value}${before}${placeholder}${after}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const from = start + before.length;
      el.setSelectionRange(from, from + selected.length);
    });
  }

  function prefixLines(marker: string) {
    const el = ref.current;
    if (!el) {
      onChange(`${value}${value && !value.endsWith("\n") ? "\n" : ""}${marker} `);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const blockStart = value.lastIndexOf("\n", start - 1) + 1;
    const chunk = value.slice(blockStart, end);
    const lined = chunk
      .split("\n")
      .map((line) => (line.startsWith(marker) ? line : `${marker}${line || " "}`))
      .join("\n");
    onChange(`${value.slice(0, blockStart)}${lined}${value.slice(end)}`);
  }

  return (
    <div className="cms-md">
      <div className="cms-md__head">
        <span>{label}</span>
        <div className="cms-md__tabs" role="tablist" aria-label={`${label} editor`}>
          <button type="button" role="tab" aria-selected={tab === "write"} className={tab === "write" ? "is-active" : undefined} onClick={() => setTab("write")}>
            Write
          </button>
          <button type="button" role="tab" aria-selected={tab === "preview"} className={tab === "preview" ? "is-active" : undefined} onClick={() => setTab("preview")}>
            Preview
          </button>
        </div>
      </div>
      {tab === "write" ? (
        <>
          <div className="cms-md__bar">
            <button type="button" title="Bold" onClick={() => wrap("**")}>
              <Bold className="size-3.5" />
            </button>
            <button type="button" title="Italic" onClick={() => wrap("*")}>
              <Italic className="size-3.5" />
            </button>
            <button type="button" title="Heading" onClick={() => prefixLines("## ")}>
              <Heading2 className="size-3.5" />
            </button>
            <button type="button" title="List" onClick={() => prefixLines("- ")}>
              <List className="size-3.5" />
            </button>
            <button type="button" title="Link" onClick={() => wrap("[", "](https://)")}>
              <Link2 className="size-3.5" />
            </button>
          </div>
          <Textarea
            ref={ref}
            value={value}
            rows={rows}
            className="cms-md__input"
            onChange={(e) => onChange(e.target.value)}
          />
        </>
      ) : (
        <div className="cms-md__preview">
          {value.trim() ? <MarkdownBody source={value} /> : <p className="cms-muted">Nothing to preview yet.</p>}
        </div>
      )}
      <p className="cms-muted">{hint}</p>
    </div>
  );
}
