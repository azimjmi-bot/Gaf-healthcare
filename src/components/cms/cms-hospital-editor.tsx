"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CoverImage } from "@/components/article-body";
import type { Hospital } from "@/lib/hospitals";

export function CmsHospitalEditor({
  initial,
}: {
  initial: Hospital & { deleted?: boolean; added?: boolean };
}) {
  const [row, setRow] = useState(initial);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    const res = await fetch(`/api/cms/catalog/hospitals/${row.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio: row.bio,
        image: row.image,
        imageAlt: row.imageAlt,
        name: row.name,
      }),
    });
    const data = await res.json();
    setBusy(false);
    setMessage(res.ok ? "Saved. Public campus pages use this bio and image." : data.error || "Save failed.");
  }

  async function upload(file: File) {
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/cms/media", { method: "POST", body: form });
    const item = await res.json();
    if (res.ok) setRow((r) => ({ ...r, image: item.url }));
    else setMessage(item.error || "Upload failed.");
  }

  return (
    <div className="cms-form">
      <p className="cms-muted">
        {row.name} · {row.city}, {row.country}
      </p>
      <label>
        Name
        <Input value={row.name} onChange={(e) => setRow({ ...row, name: e.target.value })} />
      </label>
      <label>
        Bio
        <Textarea value={row.bio} rows={10} onChange={(e) => setRow({ ...row, bio: e.target.value })} />
      </label>
      <label>
        Image URL
        <Input value={row.image || ""} onChange={(e) => setRow({ ...row, image: e.target.value })} />
      </label>
      <label>
        Image alt
        <Input value={row.imageAlt || ""} onChange={(e) => setRow({ ...row, imageAlt: e.target.value })} />
      </label>
      {row.image ? <CoverImage src={row.image} alt={row.imageAlt || row.name} className="cms-cover" /> : null}
      <input
        type="file"
        accept="image/webp,image/png,image/jpeg,image/gif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" disabled={busy} onClick={() => void save()}>
        Save hospital
      </Button>
    </div>
  );
}
