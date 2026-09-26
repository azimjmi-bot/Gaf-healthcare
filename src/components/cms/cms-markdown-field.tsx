"use client";

import { useRef, useState } from "react";
import {
  Bold,
  Code2,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownBody } from "@/components/markdown-body";
import {
  CMS_IMAGE_ACCEPT,
  isCmsImageFile,
  uploadCmsMediaMany,
} from "@/lib/cms/upload-client";
import type { MediaItem } from "@/lib/cms/types";

type Props = {
  label: string;
  value: string;
  rows?: number;
  hint?: string;
  onChange: (value: string) => void;
  onMedia?: (items: MediaItem[]) => void;
  onError?: (message: string) => void;
};

function markdownFor(items: MediaItem[]) {
  return items.map((item) => `![${item.alt || item.name}](${item.url})`).join("\n\n");
}

export function CmsMarkdownField({
  label,
  value,
  rows = 12,
  hint = "Markdown: **bold**, *italic*, lists, links, headings and uploaded images.",
  onChange,
  onMedia,
  onError,
}: Props) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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

  function insertAtCursor(snippet: string) {
    const el = ref.current;
    if (!el) {
      onChange(`${value}${value && !value.endsWith("\n") ? "\n\n" : ""}${snippet}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const lead = before && !before.endsWith("\n") ? "\n\n" : before.endsWith("\n") && !before.endsWith("\n\n") ? "\n" : "";
    const trail = after && !after.startsWith("\n") ? "\n\n" : "";
    const next = `${before}${lead}${snippet}${trail}${after}`;
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const caret = (before + lead + snippet + trail).length;
      el.setSelectionRange(caret, caret);
    });
  }

  async function insertFiles(list?: FileList | File[] | null) {
    const files = list ? [...list].filter(isCmsImageFile) : [];
    if (!files.length) return;
    setBusy(true);
    try {
      const items = await uploadCmsMediaMany(files);
      onMedia?.(items);
      insertAtCursor(markdownFor(items));
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
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
            <button type="button" title="Numbered list" onClick={() => prefixLines("1. ")}>
              <ListOrdered className="size-3.5" />
            </button>
            <button type="button" title="Quote" onClick={() => prefixLines("> ")}>
              <Quote className="size-3.5" />
            </button>
            <button type="button" title="Link" onClick={() => wrap("[", "](https://)")}>
              <Link2 className="size-3.5" />
            </button>
            <button
              type="button"
              title="Upload images"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
            >
              <ImageIcon className="size-3.5" />
            </button>
            <button type="button" title="Code block" onClick={() => wrap("```\n", "\n```", "code")}>
              <Code2 className="size-3.5" />
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={CMS_IMAGE_ACCEPT}
            multiple
            hidden
            onChange={(e) => {
              void insertFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <div
            className={`cms-md__write${drag ? " is-drag" : ""}`}
            onDragOver={(e) => {
              if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
                e.preventDefault();
                setDrag(true);
              }
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              const files = [...e.dataTransfer.files].filter(isCmsImageFile);
              if (!files.length) return;
              e.preventDefault();
              setDrag(false);
              void insertFiles(files);
            }}
          >
            <Textarea
              ref={ref}
              value={value}
              rows={rows}
              className="cms-md__input"
              onChange={(e) => onChange(e.target.value)}
              onPaste={(e) => {
                const files = [...e.clipboardData.files].filter(isCmsImageFile);
                if (!files.length) return;
                e.preventDefault();
                void insertFiles(files);
              }}
            />
          </div>
          {busy ? <p className="cms-muted">Uploading images…</p> : null}
        </>
      ) : (
        <div className="cms-md__preview">
          {value.trim() ? <MarkdownBody source={value} /> : <p className="cms-muted">Nothing to preview yet.</p>}
        </div>
      )}
      <p className="cms-muted">
        {hint} The image button uploads one or more files and drops them at the cursor.
      </p>
    </div>
  );
}
