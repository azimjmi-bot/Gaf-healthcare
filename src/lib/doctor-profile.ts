import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { displayBio } from "@/lib/hospital-profile";
import type { AppLocale } from "@/lib/i18n/languages";
import { containsPlace, joinPlaceParts } from "@/lib/i18n/place-labels";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

function clip(text: string, max = 46) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function campusLine(
  doctor: Doctor,
  hospital: Hospital | undefined,
  locale: AppLocale = "en",
) {
  const name = hospital?.name || doctor.hospitalName;
  const city = taxonomyLabel(doctor.city, locale);
  const country = taxonomyLabel(doctor.country, locale);
  const sep = locale === "ar" ? "، " : ", ";
  if (!name) return joinPlaceParts([city, country], sep);
  if (containsPlace(name, city)) return name;
  return joinPlaceParts([name, city], sep);
}

/** Second line on a doctor card: city and country, omitting either already in the hospital name. English keeps the historical "City, Country" pair. */
export function campusLocation(
  doctor: Doctor,
  hospital: Hospital | undefined,
  locale: AppLocale = "en",
) {
  const name = hospital?.name || doctor.hospitalName || "";
  const city = taxonomyLabel(doctor.city, locale);
  const country = taxonomyLabel(doctor.country, locale);
  if (locale !== "ar") return `${city}, ${country}`;
  return joinPlaceParts([
    containsPlace(name, city) ? undefined : city,
    containsPlace(name, country) ? undefined : country,
  ]);
}

export function campusChip(
  doctor: Doctor,
  hospital: Hospital | undefined,
  locale: AppLocale = "en",
) {
  const name = hospital?.name || doctor.hospitalName || "Partner campus";
  const short = name.split(/[,،]/)[0]?.trim() || name;
  const city = taxonomyLabel(doctor.city, locale);
  const sep = locale === "ar" ? "، " : ", ";
  if (containsPlace(short, city)) return short;
  return joinPlaceParts([short, city], sep);
}

export function experienceBadge(doctor: Doctor) {
  return doctor.experience.replace(/\s+/g, " ").trim();
}

export function heroHighlights(doctor: Doctor, consultsIn?: string) {
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

  if (doctor.languages) push(consultsIn || `Consults in ${doctor.languages}`);

  return items.slice(0, 4);
}

export function educationStat(doctor: Doctor) {
  const q = doctor.qualifications.replace(/\s+/g, " ").trim();
  if (!q) return "Qualifications listed on the profile";
  return q;
}

export function listingBio(doctor: Doctor, max = 220) {
  const t = displayBio(doctor.bio);
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function designationLabel(doctor: Doctor) {
  const part = doctor.title.split(",")[0]?.trim();
  return part || doctor.title;
}

export function keyProcedureLabels(doctor: Doctor) {
  const seen = new Set<string>();
  const labels: string[] = [];
  for (const item of [...doctor.proceduresExpertise, ...doctor.procedures]) {
    const label = item.replace(/\s+/g, " ").trim();
    const key = label.toLowerCase();
    if (!label || seen.has(key)) continue;
    seen.add(key);
    labels.push(clip(label, 42));
  }
  return labels;
}
