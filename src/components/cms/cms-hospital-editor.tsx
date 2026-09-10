"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
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
      }),
    });
    const data = await res.json();
    setBusy(false);
    setMessage(
      res.ok
        ? "Saved. The public hospital page uses this bio and photo. URLs, city, country, specialties and procedures are unchanged."
        : data.error || "Save failed.",
    );
  }

  return (
    <div className="cms-form">
      <p className="cms-muted">
        Bio and campus photo only. This save cannot change the hospital URL, listing filters, or pSEO
        matching (city, country, specialty, and procedure slugs stay on the seed record).
      </p>
      <p className="cms-muted">
        {row.name} · {row.city}, {row.country} · <code>/hospitals/{row.slug}</code>
      </p>
      <label>
        Name
        <Input value={row.name} readOnly disabled />
      </label>
      <label>
        Bio
        <Textarea value={row.bio} rows={12} onChange={(e) => setRow({ ...row, bio: e.target.value })} />
      </label>
      <CmsImageUpload
        label="Campus photo"
        src={row.image || ""}
        alt={row.imageAlt || row.name}
        onChange={(image) => setRow((r) => ({ ...r, image }))}
        onError={setMessage}
      />
      <label>
        Image alt
        <Input value={row.imageAlt || ""} onChange={(e) => setRow({ ...row, imageAlt: e.target.value })} />
      </label>
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" disabled={busy} onClick={() => void save()}>
        Save hospital
      </Button>
    </div>
  );
}
