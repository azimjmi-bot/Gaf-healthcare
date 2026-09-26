"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/article-body";
import {
  CMS_IMAGE_ACCEPT,
  uploadCmsMediaMany,
} from "@/lib/cms/upload-client";
import type { MediaItem } from "@/lib/cms/types";

export function CmsImageUpload({
  label = "Photo",
  src,
  alt,
  onChange,
  onError,
  onUploaded,
  multiple = false,
  emptyHint = "No photo yet. The public page keeps the illustrated portrait until you upload one.",
  chooseLabel,
}: {
  label?: string;
  src: string;
  alt: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
  onUploaded?: (items: MediaItem[]) => void;
  multiple?: boolean;
  emptyHint?: string | null;
  chooseLabel?: string;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  async function takeFiles(list?: FileList | File[] | null) {
    const files = list ? [...list] : [];
    if (!files.length) return;
    setBusy(true);
    try {
      const items = await uploadCmsMediaMany(files);
      onUploaded?.(items);
      if (items[0]) onChange(items[0].url);
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  const action = chooseLabel
    ? chooseLabel
    : busy
      ? "Uploading…"
      : multiple
        ? src
          ? "Add more images"
          : "Upload images"
        : src
          ? "Replace photo"
          : "Upload photo";

  return (
    <div className="cms-upload">
      {label ? <p className="cms-upload__label">{label}</p> : null}
      {src ? (
        <CoverImage src={src} alt={alt} className="cms-cover" />
      ) : emptyHint ? (
        <p className="cms-muted">{emptyHint}</p>
      ) : null}
      <div
        className={`cms-drop${drag ? " is-drag" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          void takeFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={CMS_IMAGE_ACCEPT}
          multiple={multiple}
          hidden
          onChange={(e) => {
            void takeFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {action}
        </Button>
        {src ? (
          <Button type="button" variant="ghost" disabled={busy} onClick={() => onChange("")}>
            Remove
          </Button>
        ) : null}
        <p className="cms-muted">
          {multiple
            ? "Drop files here or choose several at once. WebP, JPG, PNG, GIF or SVG, under 8 MB each."
            : "Drop a file here or choose one. WebP, JPG, PNG, GIF or SVG, under 8 MB."}
        </p>
      </div>
    </div>
  );
}
