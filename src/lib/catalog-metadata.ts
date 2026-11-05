import type { Metadata } from "next";
import type { CatalogQuery } from "@/lib/catalog-options";
import { prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo-url";

function clip(text: string, max = 158) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max - 1).trimEnd()}…`;
}

export function catalogMetadata(
  entity: "doctors" | "hospitals" | "treatments",
  q: CatalogQuery,
): Metadata {
  const city = q.city;
  const country = q.destination || "India";
  const place = city ? `${city}, ${country}` : country;
  const spec = q.specialty;
  const proc = q.procedure;
  let title: string;
  let description: string;
  const path = entity === "doctors" ? "/doctors" : entity === "hospitals" ? "/hospitals" : "/costs";

  if (entity === "doctors") {
    if (spec === "Radiation Oncology" && proc) {
      title = `Best Radiation Oncologists for ${proc.replace(/\s*\([^)]+\)\s*/g, "").trim()} in ${place}`;
    } else if (proc) title = `${proc} specialists in ${place}`;
    else if (spec === "Radiation Oncology") title = `Best Radiation Oncologists in ${place}`;
    else if (spec === "Neurosurgery") title = `Neurosurgeons in ${place}`;
    else if (spec === "Neurology") title = `Neurologists in ${place}`;
    else if (spec === "Nephrology") title = `Nephrologists in ${place}`;
    else if (spec === "Gynecology") title = `Gynecologists in ${place}`;
    else if (spec === "Ophthalmology") title = `Ophthalmologists in ${place}`;
    else if (spec === "Orthopedics") title = `Orthopaedic surgeons in ${place}`;
    else if (spec === "Pediatric Orthopaedic") title = `Pediatric orthopaedic surgeons in ${place}`;
    else if (spec === "Pulmonology") title = `Pulmonologists in ${place}`;
    else if (spec === "Spine Surgery") title = `Spine surgeons in ${place}`;
    else if (spec === "Urology") title = `Urologists in ${place}`;
    else if (spec === "Surgical Gastroenterology") title = `Surgical gastroenterologists in ${place}`;
    else if (spec === "Gastroenterology") title = `Gastroenterologists in ${place}`;
    else if (spec === "ENT") title = `ENT surgeons in ${place}`;
    else if (spec === "Cosmetic Surgery") title = `Cosmetic surgeons in ${place}`;
    else if (spec === "Bariatric Surgery") title = `Bariatric surgeons in ${place}`;
    else if (spec === "Cardiology") title = `Cardiologists in ${place}`;
    else if (spec === "Pediatric Cardiac Surgery") title = `Pediatric cardiac surgeons in ${place}`;
    else if (spec === "Cardiac Surgery") title = `Cardiac surgeons in ${place}`;
    else if (spec === "Pediatric Hematology") title = `Pediatric hematologists in ${place}`;
    else if (spec === "Hematology") title = `Hematologists in ${place}`;
    else if (spec) title = `${spec} doctors in ${place}`;
    else title = `Oncologists, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists and paediatric orthopaedic surgeons in ${place}`;
    description = clip(
      `Named ${spec ? spec.toLowerCase() : "oncology, ENT and gastroenterology"} specialists in ${place} at JCI partner campuses. Filter by city, specialty and procedure to shortlist a consultant.`,
    );
  } else if (entity === "hospitals") {
    title = spec ? `${spec} hospitals in ${place}` : `Oncology, ENT and GI hospitals in ${place}`;
    if (proc) title = `Hospitals for ${proc} in ${place}`;
    description = clip(
      `Partner campuses in ${place} for ${spec ?? "oncology, ENT and gastroenterology"}. ${proc ? `${proc} is listed where the house can quote it. ` : ""}Filter by city, specialty and procedure to find the right house.`,
    );
  } else {
    title = spec ? `${spec} cost in ${place}` : `Oncology, ENT and GI treatment cost in ${place}`;
    if (proc) title = `${proc} cost in ${place}`;
    description = clip(
      `US cash-pay beside India partner ranges for ${spec ?? "oncology, ENT and gastroenterology"} in ${place}. Planning figures, not quotes — a named consultant confirms the protocol after records review.`,
    );
  }

  const url = absoluteUrl(prettyCatalogPath(path as "/costs" | "/doctors" | "/hospitals", q));
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_IN",
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

