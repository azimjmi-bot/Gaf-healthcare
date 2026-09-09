"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CmsNewHospital({
  cities,
  specialties,
}: {
  cities: string[];
  specialties: { name: string }[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [city, setCity] = useState(cities[0] || "Delhi NCR");
  const [specialty, setSpecialty] = useState(specialties[0]?.name || "Radiation Oncology");
  const [accreditation, setAccreditation] = useState("NABH");
  const [established, setEstablished] = useState("");
  const [beds, setBeds] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function create() {
    setBusy(true);
    const res = await fetch("/api/cms/catalog/hospitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, city, specialty, accreditation, established, beds, bio }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error || "Could not add hospital.");
      return;
    }
    router.replace(`/cms/hospitals/${data.slug}`);
  }

  return (
    <div className="cms-form">
      <label>
        Campus name
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        City (India taxonomy)
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label>
        Primary specialty
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          {specialties.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Accreditation
        <Input value={accreditation} onChange={(e) => setAccreditation(e.target.value)} />
      </label>
      <label>
        Established
        <Input value={established} onChange={(e) => setEstablished(e.target.value)} />
      </label>
      <label>
        Beds
        <Input value={beds} onChange={(e) => setBeds(e.target.value)} />
      </label>
      <label>
        Bio
        <Textarea value={bio} rows={8} onChange={(e) => setBio(e.target.value)} />
      </label>
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" disabled={busy || !name.trim()} onClick={() => void create()}>
        Add hospital
      </Button>
    </div>
  );
}
