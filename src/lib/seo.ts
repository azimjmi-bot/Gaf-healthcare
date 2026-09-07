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
    d.specialtySlug === "bariatric-surgery"
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
  const title = `${h.name} — oncology, hematology, cardiac and bariatric hospital in ${h.city}, India`;
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
    else if (spec === "Bariatric Surgery") title = `Bariatric surgeons in ${place}`;
    else if (spec === "Cardiology") title = `Cardiologists in ${place}`;
    else if (spec === "Pediatric Cardiac Surgery") title = `Pediatric cardiac surgeons in ${place}`;
    else if (spec === "Cardiac Surgery") title = `Cardiac surgeons in ${place}`;
    else if (spec === "Pediatric Hematology") title = `Pediatric hematologists in ${place}`;
    else if (spec === "Hematology") title = `Hematologists in ${place}`;
    else if (spec) title = `${spec} doctors in ${place}`;
    else title = `Oncologists, cardiologists and bariatric surgeons in ${place}`;
    const citySlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "delhi-ncr";
    const example =
      spec === "Bariatric Surgery"
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
      `Named ${spec ? spec.toLowerCase() : "oncology, hematology, cardiac, cardiology and bariatric"} specialists in ${place} at JCI partner campuses. Filter by city, specialty and procedure for later pSEO routes such as ${example}.`,
    );
  } else if (entity === "hospitals") {
    title = spec ? `${spec} hospitals in ${place}` : `Oncology, cardiac and bariatric hospitals in ${place}`;
    if (proc) title = `Hospitals for ${proc} in ${place}`;
    description = clip(
      `Partner campuses in ${place} for ${spec ?? "oncology, hematology, cardiac care and bariatric surgery"}. ${proc ? `${proc} is listed where the house can quote it. ` : ""}Country, city, specialty and procedure tags are ready for pSEO.`,
    );
  } else {
    title = spec ? `${spec} cost in ${place}` : `Oncology, cardiac and bariatric treatment cost in ${place}`;
    if (proc) title = `${proc} cost in ${place}`;
    description = clip(
      `US cash-pay beside India partner ranges for ${spec ?? "oncology, hematology, cardiac care and bariatric surgery"} in ${place}. Planning figures, not quotes — a named consultant confirms the protocol after records review.`,
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
    a: "Yes. Named haematologists sit under Hematology. Named paediatric haematologists sit under Pediatric Hematology. Named cardiac surgeons sit under Cardiac Surgery. Named paediatric cardiac surgeons sit under Pediatric Cardiac Surgery. Named cardiologists sit under Cardiology. Bariatric Surgery covers sleeve, Roux-en-Y, OAGB, balloon, ESG and revisional work so later pSEO can mount /doctors/india/{city}/bariatric-surgery/{procedure}. Medical, radiation and surgical oncologists are listed separately.",
  },
  {
    q: "Can I meet the doctor before travelling to India?",
    a: "Yes. Travelling patients meet the named consultant on camera first. A date in that city is offered only after records review — not from a brochure price.",
  },
];

export const COST_FAQS = [
  {
    q: "Are the India cost ranges quotes?",
    a: "No. They are planning ranges beside typical US cash-pay figures. The named oncologist, haematologist, paediatric haematologist, cardiac surgeon, paediatric cardiac surgeon, cardiologist or bariatric surgeon confirms regimen, fractions, donor or the operation after reviewing records.",
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
