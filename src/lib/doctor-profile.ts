import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";

function clip(text: string, max = 46) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function campusLine(doctor: Doctor, hospital: Hospital | undefined) {
  const name = hospital?.name || doctor.hospitalName;
  if (!name) return `${doctor.city}, ${doctor.country}`;
  if (name.toLowerCase().includes(doctor.city.toLowerCase())) return name;
  return `${name}, ${doctor.city}`;
}

export function campusChip(doctor: Doctor, hospital: Hospital | undefined) {
  const name = hospital?.name || doctor.hospitalName || "Partner campus";
  const short = name.split(",")[0]?.trim() || name;
  if (short.toLowerCase().includes(doctor.city.toLowerCase())) return short;
  return `${short}, ${doctor.city}`;
}

export function experienceBadge(doctor: Doctor) {
  return doctor.experience.replace(/\s+/g, " ").trim();
}

export function heroHighlights(doctor: Doctor) {
  const seen = new Set<string>();
  const items: string[] = [];

  const push = (raw: string | undefined) => {
    const label = clip(raw ?? "");
    const key = label.toLowerCase();
    if (!label || seen.has(key)) return;
    seen.add(key);
    items.push(label);
  };

  push(doctor.title || doctor.specialty);

  for (const spec of doctor.specializations) {
    if (spec.toLowerCase() === doctor.specialty.toLowerCase()) continue;
    push(spec);
    if (items.length >= 3) break;
  }

  for (const proc of doctor.proceduresExpertise) {
    if (items.length >= 3) break;
    push(proc);
  }

  if (doctor.languages) push(`Consults in ${doctor.languages}`);

  return items.slice(0, 4);
}

export function educationStat(doctor: Doctor) {
  const q = doctor.qualifications.replace(/\s+/g, " ").trim();
  if (!q) return "Qualifications listed on the profile";
  return q;
}
