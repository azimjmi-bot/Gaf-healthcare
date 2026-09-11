"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
import type { Doctor } from "@/lib/doctors";

export function CmsDoctorEditor({ initial }: { initial: Doctor & { deleted?: boolean; added?: boolean } }) {
  const [row, setRow] = useState(initial);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    const res = await fetch(`/api/cms/catalog/doctors/${row.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio: row.bio,
        image: row.image,
        imageAlt: row.imageAlt,
        name: row.name,
        title: row.title,
        qualifications: row.qualifications,
        experience: row.experience,
      }),
    });
    const data = await res.json();
    setBusy(false);
    setMessage(res.ok ? "Saved. Public profile uses this bio and image." : data.error || "Save failed.");
  }

  return (
    <div className="cms-form">
      <p className="cms-muted">
        {row.name} · {row.specialty} · {row.hospitalName}, {row.city}
      </p>
      <label>
        Name
        <Input value={row.name} onChange={(e) => setRow({ ...row, name: e.target.value })} />
      </label>
      <label>
        Title
        <Input value={row.title} onChange={(e) => setRow({ ...row, title: e.target.value })} />
      </label>
      <label>
        Qualifications
        <Input value={row.qualifications} onChange={(e) => setRow({ ...row, qualifications: e.target.value })} />
      </label>
      <label>
        Experience
        <Input value={row.experience} onChange={(e) => setRow({ ...row, experience: e.target.value })} />
      </label>
      <label>
        Bio
        <Textarea value={row.bio} rows={10} onChange={(e) => setRow({ ...row, bio: e.target.value })} />
      </label>
      <CmsImageUpload
        label="Photo"
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
        Save doctor
      </Button>
    </div>
  );
}
