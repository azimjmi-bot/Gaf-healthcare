"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/article-body";

export function CmsImageUpload({
  label = "Photo",
  src,
  alt,
  onChange,
  onError,
}: {
  label?: string;
  src: string;
  alt: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/cms/media", { method: "POST", body: form });
    const item = await res.json();
    setBusy(false);
    if (!res.ok) {
      onError?.(item.error || "Upload failed.");
      return;
    }
    onChange(item.url);
  }

  function takeFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError?.("Choose a WebP, JPG, PNG or GIF.");
      return;
    }
    void upload(file);
  }

  return (
    <div className="cms-upload">
      <p className="cms-upload__label">{label}</p>
      {src ? (
        <CoverImage src={src} alt={alt} className="cms-cover" />
      ) : (
        <p className="cms-muted">No photo yet. The public page keeps the illustrated portrait until you upload one.</p>
      )}
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
          takeFile(e.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/webp,image/png,image/jpeg,image/gif"
          hidden
          onChange={(e) => {
            takeFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? "Uploading…" : src ? "Replace photo" : "Upload photo"}
        </Button>
        {src ? (
          <Button type="button" variant="ghost" disabled={busy} onClick={() => onChange("")}>
            Remove
          </Button>
        ) : null}
        <p className="cms-muted">Drop a file here or choose one. WebP, JPG, PNG or GIF.</p>
      </div>
    </div>
  );
}
