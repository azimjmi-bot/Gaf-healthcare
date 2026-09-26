"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/article-body";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
import type { MediaItem } from "@/lib/cms/types";

export function CmsMediaLibrary({ initial }: { initial: MediaItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [error, setError] = useState("");

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
      <CmsImageUpload
        label="Upload images"
        src=""
        alt=""
        emptyHint={null}
        multiple
        chooseLabel="Upload images"
        onChange={() => {}}
        onUploaded={(next) => {
          setItems((m) => [...next, ...m]);
          router.refresh();
        }}
        onError={setError}
      />
      {items.length === 0 ? (
        <p className="cms-muted">No uploads yet. WebP, JPG, PNG, GIF or SVG, under 8 MB each.</p>
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
