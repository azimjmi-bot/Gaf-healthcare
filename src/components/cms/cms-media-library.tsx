"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/article-body";
import type { MediaItem } from "@/lib/cms/types";

export function CmsMediaLibrary({ initial }: { initial: MediaItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [error, setError] = useState("");

  async function onFile(file: File) {
    setError("");
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/cms/media", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Upload failed.");
      return;
    }
    setItems((m) => [data, ...m]);
    router.refresh();
  }

  async function remove(id: string) {
    await fetch("/api/cms/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((m) => m.filter((i) => i.id !== id));
    router.refresh();
  }

  return (
    <div>
      {error ? <p className="cms-error">{error}</p> : null}
      <input
        type="file"
        accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onFile(file);
        }}
      />
      {items.length === 0 ? (
        <p className="cms-muted">No uploads yet. WebP, JPG, PNG, GIF or SVG.</p>
      ) : (
        <ul className="cms-media-grid cms-media-grid--page">
          {items.map((item) => (
            <li key={item.id}>
              <CoverImage src={item.url} alt={item.alt || item.name} />
              <p>{item.name}</p>
              <p className="cms-muted">{item.url}</p>
              <Button variant="outline" size="xs" type="button" onClick={() => remove(item.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
