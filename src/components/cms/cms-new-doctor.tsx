"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CmsNewDoctor({
  hospitals,
  specialties,
}: {
  hospitals: { slug: string; name: string; city: string }[];
  specialties: { name: string }[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [hospitalSlug, setHospitalSlug] = useState(hospitals[0]?.slug || "");
  const [specialty, setSpecialty] = useState(specialties[0]?.name || "");
  const [title, setTitle] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function create() {
    setBusy(true);
    const res = await fetch("/api/cms/catalog/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, hospitalSlug, specialty, title, qualifications, experience, bio }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error || "Could not add doctor.");
      return;
    }
    router.replace(`/cms/doctors/${data.slug}`);
  }

  return (
    <div className="cms-form">
      <label>
        Name
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Hospital
        <select value={hospitalSlug} onChange={(e) => setHospitalSlug(e.target.value)}>
          {hospitals.map((h) => (
            <option key={h.slug} value={h.slug}>
              {h.name} · {h.city}
            </option>
          ))}
        </select>
      </label>
      <label>
        Specialty
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          {specialties.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Title (optional)
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Qualifications
        <Input value={qualifications} onChange={(e) => setQualifications(e.target.value)} />
      </label>
      <label>
        Experience
        <Input value={experience} onChange={(e) => setExperience(e.target.value)} />
      </label>
      <label>
        Bio
        <Textarea value={bio} rows={8} onChange={(e) => setBio(e.target.value)} />
      </label>
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" disabled={busy || !name.trim()} onClick={() => void create()}>
        Add doctor
      </Button>
    </div>
  );
}
