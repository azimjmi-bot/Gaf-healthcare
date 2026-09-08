import type { Metadata } from "next";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import type { CatalogQuery } from "@/lib/catalog";
import { site } from "@/lib/site";

export const SITE_URL = "https://velora.health";

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) path = `/${path}`;
  return new URL(path, SITE_URL).toString();
}

function clip(text: string, max = 158) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max - 1).trimEnd()}…`;
}

export function doctorMetadata(d: Doctor): Metadata {
  const role =
    d.specialtySlug === "pulmonology"
      ? "pulmonologist"
      : d.specialtySlug === "spine-surgery"
      ? "spine surgeon"
      : d.specialtySlug === "urology"
      ? "urologist"
      : d.specialtySlug === "surgical-gastroenterology"
      ? "surgical gastroenterologist"
      : d.specialtySlug === "gastroenterology"
      ? "gastroenterologist"
      : d.specialtySlug === "ent"
      ? "ENT surgeon"
      : d.specialtySlug === "cosmetic-surgery"
      ? "cosmetic surgeon"
      : d.specialtySlug === "bariatric-surgery"
      ? "bariatric surgeon"
      : d.specialtySlug === "cardiology"
      ? "cardiologist"
      : d.specialtySlug === "pediatric-cardiac-surgery"
      ? "pediatric cardiac surgeon"
      : d.specialtySlug === "cardiac-surgery"
      ? "cardiac surgeon"
      : d.specialtySlug === "pediatric-hematology"
      ? "pediatric hematologist"
      : d.specialtySlug === "hematology"
      ? "hematologist"
      : d.specialtySlug === "medical-oncology"
        ? "medical oncologist"
        : d.specialtySlug === "surgical-oncology"
          ? "surgical oncologist"
          : "radiation oncologist";
  const title = `${d.name}, ${role} in ${d.city}, India`;
  const description = clip(
    `${d.name} is a ${role} at ${d.hospitalName} in ${d.city}, India. ${d.procedures.slice(0, 3).join(", ")}. Meet on camera before travel. ${d.bio}`,
  );
  const url = absoluteUrl(`/doctors/${d.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      locale: "en_IN",
      siteName: site.name,
    },
    twitter: { card: "summary", title, description },
  };
}

export function hospitalMetadata(h: Hospital): Metadata {
  const title = `${h.name} — oncology, ENT and GI hospital in ${h.city}, India`;
  const description = clip(
    `${h.name} in ${h.city}, India lists ${h.specialties.join(", ")}. ${h.accreditation}. ${h.bio}`,
  );
  const url = absoluteUrl(`/hospitals/${h.slug}`);
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

export function treatmentMetadata(t: Treatment): Metadata {
  const title = `${t.name} cost in India`;
  const description = clip(
    `${t.name} (${t.category}) in India: partner range ${t.partnerRange} beside typical US cash ${t.usRange}. ${t.summary}`,
  );
  const url = absoluteUrl(`/costs/${t.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: "en_IN",
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function catalogMetadata(
  entity: "doctors" | "hospitals" | "treatments",
  q: CatalogQuery,
): Metadata {
  const city = q.city;
  const place = city ? `${city}, India` : "India";
  const spec = q.specialty;
  const proc = q.procedure;
  let title: string;
  let description: string;
  let path = entity === "doctors" ? "/doctors" : entity === "hospitals" ? "/hospitals" : "/costs";

  if (entity === "doctors") {
    if (proc) title = `${proc} specialists in ${place}`;
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
    else title = `Oncologists, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists and spine surgeons in ${place}`;
    const citySlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "delhi-ncr";
    const example =
      spec === "Pulmonology"
        ? `/doctors/india/${citySlug}/pulmonology/bronchoscopy`
        : spec === "Spine Surgery"
        ? `/doctors/india/${citySlug}/spine-surgery/spinal-fusion`
        : spec === "Urology"
        ? `/doctors/india/${citySlug}/urology/kidney-transplantation`
        : spec === "Surgical Gastroenterology"
        ? `/doctors/india/${citySlug}/surgical-gastroenterology/liver-transplantation`
        : spec === "Gastroenterology"
        ? `/doctors/india/${citySlug}/gastroenterology/upper-gi-endoscopy-gastroscopy`
        : spec === "ENT"
        ? `/doctors/india/${citySlug}/ent/cochlear-implantation`
        : spec === "Cosmetic Surgery"
        ? `/doctors/india/${citySlug}/cosmetic-surgery/rhinoplasty`
        : spec === "Bariatric Surgery"
        ? `/doctors/india/${citySlug}/bariatric-surgery/sleeve-gastrectomy`
        : spec === "Cardiology"
        ? `/doctors/india/${citySlug}/cardiology/coronary-angioplasty-stenting`
        : spec === "Pediatric Cardiac Surgery"
        ? `/doctors/india/${citySlug}/pediatric-cardiac-surgery/asd-closure-atrial-septal-defect`
        : spec === "Cardiac Surgery"
        ? `/doctors/india/${citySlug}/cardiac-surgery/cabg-coronary-artery-bypass-grafting`
        : spec === "Pediatric Hematology"
        ? `/doctors/india/${citySlug}/pediatric-hematology/pediatric-bone-marrow-transplantation`
        : spec === "Hematology"
          ? `/doctors/india/${citySlug}/hematology/bone-marrow-transplantation`
          : `/doctors/india/${citySlug}/radiation-oncology/external-beam-radiotherapy-ebrt`;
    description = clip(
      `Named ${spec ? spec.toLowerCase() : "oncology, ENT and gastroenterology"} specialists in ${place} at JCI partner campuses. Filter by city, specialty and procedure for later pSEO routes such as ${example}.`,
    );
  } else if (entity === "hospitals") {
    title = spec ? `${spec} hospitals in ${place}` : `Oncology, ENT and GI hospitals in ${place}`;
    if (proc) title = `Hospitals for ${proc} in ${place}`;
    description = clip(
      `Partner campuses in ${place} for ${spec ?? "oncology, ENT and gastroenterology"}. ${proc ? `${proc} is listed where the house can quote it. ` : ""}Country, city, specialty and procedure tags are ready for pSEO.`,
    );
  } else {
    title = spec ? `${spec} cost in ${place}` : `Oncology, ENT and GI treatment cost in ${place}`;
    if (proc) title = `${proc} cost in ${place}`;
    description = clip(
      `US cash-pay beside India partner ranges for ${spec ?? "oncology, ENT and gastroenterology"} in ${place}. Planning figures, not quotes — a named consultant confirms the protocol after records review.`,
    );
  }

  const params = new URLSearchParams();
  if (q.destination) params.set("destination", q.destination);
  if (q.city) params.set("city", q.city);
  if (q.specialty) params.set("specialty", q.specialty);
  if (q.procedure) params.set("procedure", q.procedure);
  const qs = params.toString();
  const url = absoluteUrl(qs ? `${path}?${qs}` : path);
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

export function physicianJsonLd(d: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: d.name,
    url: absoluteUrl(`/doctors/${d.slug}`),
    jobTitle: d.title,
    description: clip(d.bio, 240),
    medicalSpecialty: d.specialty,
    knowsAbout: d.procedures,
    address: {
      "@type": "PostalAddress",
      addressLocality: d.city,
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: d.city,
      containedInPlace: { "@type": "Country", name: "India" },
    },
    worksFor: {
      "@type": "Hospital",
      name: d.hospitalName,
      url: absoluteUrl(`/hospitals/${d.hospitalSlug}`),
      address: {
        "@type": "PostalAddress",
        addressLocality: d.city,
        addressCountry: "IN",
      },
    },
  };
}

export function hospitalJsonLd(h: Hospital) {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: h.name,
    url: absoluteUrl(`/hospitals/${h.slug}`),
    description: clip(h.bio, 240),
    medicalSpecialty: h.specialties,
    address: {
      "@type": "PostalAddress",
      addressLocality: h.city,
      addressCountry: "IN",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(rows: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rows.map((row) => ({
      "@type": "Question",
      name: row.q,
      acceptedAnswer: { "@type": "Answer", text: row.a },
    })),
  };
}

export const DOCTOR_FAQS = [
  {
    q: "Which Indian cities does Velora list specialists in?",
    a: "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Every profile is tagged with country (India), city, specialty and procedure so later pages can be generated without remapping the catalog.",
  },
  {
    q: "Do you list haematologists as well as oncologists?",
    a: "Yes. Named haematologists sit under Hematology. Named cardiac surgeons sit under Cardiac Surgery. Named cardiologists sit under Cardiology. Named bariatric surgeons sit under Bariatric Surgery. Named cosmetic surgeons sit under Cosmetic Surgery. Named ENT surgeons sit under ENT. Named gastroenterologists sit under Gastroenterology. Named surgical gastroenterologists sit under Surgical Gastroenterology. Named urologists sit under Urology. Named spine surgeons sit under Spine Surgery. Pulmonology lists bronchoscopy, EBUS, thoracoscopy and lung transplant — named pulmonologists will sit there once a listing is matched. Later pSEO can mount /doctors/india/{city}/pulmonology/{procedure} without remapping the catalog.",
  },
  {
    q: "Can I meet the doctor before travelling to India?",
    a: "Yes. Travelling patients meet the named consultant on camera first. A date in that city is offered only after records review — not from a brochure price.",
  },
];

export const COST_FAQS = [
  {
    q: "Are the India cost ranges quotes?",
    a: "No. They are planning ranges beside typical US cash-pay figures. The named oncologist, cardiologist, bariatric surgeon, cosmetic surgeon, ENT surgeon, gastroenterologist, surgical gastroenterologist, urologist, spine surgeon or pulmonologist confirms regimen, fractions, donor, endoscopy, graft, laser, levels, airway or the operation after reviewing records.",
  },
  {
    q: "What does liver transplantation typically cost in India versus the US?",
    a: "Velora’s Liver Transplantation sheet lists a partner planning range of about $28,000–$55,000 against typical US cash of $150,000–$400,000, depending on living versus deceased donor, ICU stay and campus. Living-donor, paediatric and retransplant sit on separate Surgical Gastroenterology sheets. Hepatectomy remains on the shared surgical-oncology slug.",
  },
  {
    q: "What does kidney transplantation typically cost in India versus the US?",
    a: "Velora’s Kidney Transplantation sheet lists a partner planning range of about $13,000–$25,000 against typical US cash of $150,000–$400,000, depending on living versus deceased donor, ABO work and campus. Living-donor, deceased-donor and ABO-incompatible sit on separate Urology sheets. Radical prostatectomy, partial nephrectomy and radical cystectomy remain on the shared surgical-oncology slugs.",
  },
  {
    q: "What does spinal fusion typically cost in India versus the US?",
    a: "Velora’s Spinal Fusion sheet lists a partner planning range of about $8,000–$18,000 against typical US cash of $80,000–$150,000, depending on levels, approach and campus. PLIF, TLIF, ALIF and ACDF sit on separate Spine Surgery sheets. Disc replacement is a different slug when motion-preservation is still honest.",
  },
  {
    q: "What does EBUS typically cost in India versus the US?",
    a: "Velora’s EBUS sheet lists a partner planning range of about $800–$2,500 against typical US cash of $4,000–$12,000, depending on nodal stations and campus. Bronchoscopy, TBNA, cryo-biopsy and lung transplantation sit on separate Pulmonology sheets. Gastroenterology’s ingested foreign-body sheet is a different slug from bronchoscopic removal.",
  },
  {
    q: "What does ERCP typically cost in India versus the US?",
    a: "Velora’s ERCP sheet lists a partner planning range of about $1,500–$4,200 against typical US cash of $8,000–$22,000, depending on sphincterotomy, stent and campus. Colonoscopy, EUS, POEM and PTBD sit on separate Gastroenterology sheets. Endoscopic sleeve gastroplasty remains on the bariatric sheet.",
  },
  {
    q: "What does cochlear implantation typically cost in India versus the US?",
    a: "Velora’s Cochlear Implantation sheet lists a partner planning range of about $15,000–$32,000 against typical US cash of $50,000–$100,000, depending on device, mapping and campus. FESS, septoplasty and BAHA sit on separate sheets. Rhinoplasty remains on the cosmetic sheet with a shared slug.",
  },
  {
    q: "What does rhinoplasty typically cost in India versus the US?",
    a: "Velora’s Rhinoplasty sheet lists a partner planning range of about $2,500–$5,500 against typical US cash of $8,000–$18,000, depending on open versus closed work and campus. Facelift, blepharoplasty and hair transplant sit on separate sheets.",
  },
  {
    q: "What does sleeve gastrectomy typically cost in India versus the US?",
    a: "Velora’s Sleeve Gastrectomy sheet lists a partner planning range of about $4,500–$8,500 against typical US cash of $15,000–$28,000, depending on BMI, leak protocol and campus. Bypass, ESG and revisional work sit on separate sheets.",
  },
  {
    q: "What does CABG typically cost in India versus the US?",
    a: "Velora’s CABG sheet lists a partner planning range of about $5,500–$14,000 against typical US cash of $70,000–$200,000, depending on conduits, ICU stay and campus. Valve work, TAVR and LVAD sit on separate sheets.",
  },
  {
    q: "What does chemotherapy typically cost in India versus the US?",
    a: "Velora’s Chemotherapy sheet lists a partner planning range of about $1,500–$8,000+ against typical US cash of $10,000–$50,000, depending on protocol, cycles and campus. Immunotherapy, ADCs and CAR-T sit on separate sheets.",
  },
];
