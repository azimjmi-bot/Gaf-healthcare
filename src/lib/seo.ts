import type { Metadata } from "next";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import type { CatalogQuery } from "@/lib/catalog";
import { site } from "@/lib/site";

export const SITE_URL = "https://gaf.healthcare";

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
    d.specialtySlug === "nephrology"
      ? "nephrologist"
      : d.specialtySlug === "neurology"
      ? "neurologist"
      : d.specialtySlug === "neurosurgery"
      ? "neurosurgeon"
      : d.specialtySlug === "gynecology"
      ? "gynecologist"
      : d.specialtySlug === "ophthalmology"
      ? "ophthalmologist"
      : d.specialtySlug === "orthopedics"
      ? "orthopaedic surgeon"
      : d.specialtySlug === "pediatric-orthopaedic"
      ? "pediatric orthopaedic surgeon"
      : d.specialtySlug === "pulmonology"
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
  const title =
    h.specialtySlug === "ophthalmology" && h.specialtySlugs.length === 1
      ? `${h.name} — eye hospital in ${h.city}, India`
      : `${h.name} — oncology, ENT and GI hospital in ${h.city}, India`;
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
  const path = entity === "doctors" ? "/doctors" : entity === "hospitals" ? "/hospitals" : "/costs";

  if (entity === "doctors") {
    if (proc) title = `${proc} specialists in ${place}`;
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
    const citySlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "delhi-ncr";
    const example =
      spec === "Nephrology"
        ? `/doctors/india/${citySlug}/nephrology/hemodialysis`
        : spec === "Neurology"
        ? `/doctors/india/${citySlug}/neurology/eeg`
        : spec === "Neurosurgery"
        ? `/doctors/india/${citySlug}/neurosurgery/brain-tumor-surgery`
        : spec === "Gynecology"
        ? `/doctors/india/${citySlug}/gynecology/laparoscopic-hysterectomy`
        : spec === "Ophthalmology"
        ? `/doctors/india/${citySlug}/ophthalmology/cataract-surgery`
        : spec === "Orthopedics"
        ? `/doctors/india/${citySlug}/orthopedics/total-knee-replacement`
        : spec === "Pediatric Orthopaedic"
        ? `/doctors/india/${citySlug}/pediatric-orthopaedic/clubfoot-correction-surgery`
        : spec === "Pulmonology"
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

export function medicalWebPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  lastReviewed: string;
  procedureName: string;
  specialty: string;
  about: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: opts.name,
    description: clip(opts.description),
    url,
    inLanguage: "en",
    lastReviewed: opts.lastReviewed,
    dateModified: opts.lastReviewed,
    isPartOf: { "@type": "WebSite", name: site.name, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    specialty: opts.specialty,
    about: {
      "@type": "MedicalProcedure",
      name: opts.procedureName,
      procedureType: opts.specialty,
      description: clip(opts.about, 300),
    },
  };
}

export function doctorItemListJsonLd(rows: Doctor[], opts: { name: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: absoluteUrl(opts.path),
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: rows.map((doctor, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Physician",
        name: doctor.name,
        url: absoluteUrl(`/doctors/${doctor.slug}`),
        medicalSpecialty: doctor.specialty,
        worksFor: { "@type": "Hospital", name: doctor.hospitalName },
        address: {
          "@type": "PostalAddress",
          addressLocality: doctor.city,
          addressCountry: "IN",
        },
      },
    })),
  };
}

export function costArticleMetadata(
  t: Treatment,
  article: { seoTitle: string; seoDescription: string; lastUpdated: string },
): Metadata {
  const url = absoluteUrl(`/costs/${t.slug}`);
  const description = clip(article.seoDescription);
  return {
    title: article.seoTitle,
    description,
    alternates: { canonical: url },
    keywords: [
      `${t.name} cost in India`,
      `${t.name} price in India`,
      `${t.name} cost in Mumbai`,
      `${t.name} cost in Delhi NCR`,
      `${t.name} hospital stay`,
      `${t.category} cost in India`,
    ],
    openGraph: {
      title: article.seoTitle,
      description,
      url,
      type: "article",
      locale: "en_IN",
      siteName: site.name,
      modifiedTime: article.lastUpdated,
    },
    twitter: { card: "summary_large_image", title: article.seoTitle, description },
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
    q: "How do I choose the right doctor for my condition?",
    a: "We help you explore doctors based on their medical specialty, relevant experience, hospital affiliation, procedures performed, location, and other available professional information. Your final choice should also take into account your medical condition and your treating doctor's advice.",
  },
  {
    q: "Can I compare multiple doctors before choosing one?",
    a: "Yes. You can review multiple doctor profiles and compare available information such as specialty, experience, hospital affiliation, location, procedures, and other relevant profile details before deciding whom to contact.",
  },
  {
    q: "How are doctors listed on GAF Healthcare?",
    a: "Doctors are listed based on relevant medical specialties, procedures, hospital affiliations, professional credentials, and information available through our database. GAF Healthcare does not claim that every listed doctor is the best doctor for every patient.",
  },
  {
    q: "Can I choose a doctor based on a specific procedure or treatment?",
    a: "Yes. You can explore doctors associated with specific procedures and treatments to find specialists whose expertise is relevant to your medical needs.",
  },
  {
    q: "Do the doctors listed on GAF Healthcare treat international patients?",
    a: "Many doctors associated with hospitals serving international patients treat patients from overseas. International-patient services and availability can vary by doctor and hospital.",
  },
  {
    q: "Can I get a second medical opinion from a doctor listed on GAF Healthcare?",
    a: "Yes. You can request a consultation or second opinion, subject to the doctor's availability. Sharing your medical reports and previous treatment records can help the doctor review your case.",
  },
  {
    q: "Can I speak with a doctor before travelling for treatment?",
    a: "In many cases, yes. International patients can request a remote consultation or medical review before travelling, depending on the doctor's availability and the hospital's process.",
  },
  {
    q: "Can GAF Healthcare help me choose a hospital along with a doctor?",
    a: "Yes. GAF Healthcare can help you explore suitable doctors and hospitals based on your treatment needs, preferred location, and available options.",
  },
];

export const COST_FAQS = [
  {
    q: "Are the India cost ranges quotes?",
    a: "No. They are planning ranges beside typical US cash-pay figures. The named oncologist, cardiologist, bariatric surgeon, cosmetic surgeon, ENT surgeon, gastroenterologist, surgical gastroenterologist, urologist, spine surgeon, pulmonologist, paediatric orthopaedic surgeon, orthopaedic surgeon, ophthalmologist, gynecologist, neurosurgeon, neurologist or nephrologist confirms regimen, fractions, donor, endoscopy, graft, laser, levels, airway, growth remaining, implant, laterality, approach, electrodiagnosis, dialysis access or the operation after reviewing records.",
  },
  {
    q: "What does liver transplantation typically cost in India versus the US?",
    a: "GAF Healthcare's Liver Transplantation sheet lists a partner planning range of about $28,000–$55,000 against typical US cash of $150,000–$400,000, depending on living versus deceased donor, ICU stay and campus. Living-donor, paediatric and retransplant sit on separate Surgical Gastroenterology sheets. Hepatectomy remains on the shared surgical-oncology slug.",
  },
  {
    q: "What does kidney transplantation typically cost in India versus the US?",
    a: "GAF Healthcare's Kidney Transplantation sheet lists a partner planning range of about $13,000–$25,000 against typical US cash of $150,000–$400,000, depending on living versus deceased donor, ABO work and campus. Living-donor, deceased-donor and ABO-incompatible remain the shared Urology slugs and now also sit under Nephrology. Paired kidney exchange and transplant evaluation sit on Nephrology sheets. Radical prostatectomy, partial nephrectomy and radical cystectomy remain on the shared surgical-oncology slugs.",
  },
  {
    q: "What does spinal fusion typically cost in India versus the US?",
    a: "GAF Healthcare's Spinal Fusion sheet lists a partner planning range of about $8,000–$18,000 against typical US cash of $80,000–$150,000, depending on levels, approach and campus. PLIF, TLIF, ALIF and ACDF sit on separate Spine Surgery sheets. Disc replacement is a different slug when motion-preservation is still honest.",
  },
  {
    q: "What does EBUS typically cost in India versus the US?",
    a: "GAF Healthcare's EBUS sheet lists a partner planning range of about $800–$2,500 against typical US cash of $4,000–$12,000, depending on nodal stations and campus. Bronchoscopy, TBNA, cryo-biopsy and lung transplantation sit on separate Pulmonology sheets. Gastroenterology’s ingested foreign-body sheet is a different slug from bronchoscopic removal.",
  },
  {
    q: "What does clubfoot correction typically cost in India versus the US?",
    a: "GAF Healthcare's Clubfoot Correction Surgery sheet lists a partner planning range of about $1,200–$3,800 against typical US cash of $6,000–$18,000, depending on laterality, prior Ponseti work and campus. DDH, SCFE, limb lengthening and paediatric scoliosis sit on separate Pediatric Orthopaedic sheets. Adult scoliosis correction remains on Spine Surgery.",
  },
  {
    q: "What does cataract surgery typically cost in India versus the US?",
    a: "GAF Healthcare's Cataract Surgery sheet lists a partner planning range of about $800–$2,500 per eye against typical US cash of $3,500–$8,000, depending on IOL, laterality and campus. Phaco, femto-laser and paediatric cataract sit on separate Ophthalmology sheets. LASIK, SMILE and ICL are refractive slugs, not cataract products.",
  },
  {
    q: "What does laparoscopic hysterectomy typically cost in India versus the US?",
    a: "GAF Healthcare's Laparoscopic Hysterectomy sheet lists a partner planning range of about $3,000–$7,000 against typical US cash of $15,000–$35,000, depending on uterus size, laterality of adnexa and campus. Robotic, vaginal and abdominal hysterectomy sit on separate Gynecology sheets. Radical hysterectomy remains the shared surgical-oncology slug.",
  },
  {
    q: "What does brain tumor surgery typically cost in India versus the US?",
    a: "GAF Healthcare's Brain Tumor Surgery sheet lists a partner planning range of about $6,000–$15,000 against typical US cash of $50,000–$150,000, depending on histology, mapping and campus. Glioma, meningioma and pituitary sit on separate Neurosurgery sheets. Gamma Knife, CyberKnife and SRS remain the shared radiation-oncology radiosurgery slugs. Spinal tumour surgery remains the shared Spine Surgery slug. Skull base surgery remains the shared ENT slug.",
  },
  {
    q: "What does EEG typically cost in India versus the US?",
    a: "GAF Healthcare's EEG sheet lists a partner planning range of about $80–$250 against typical US cash of $400–$1,500, depending on duration and campus. Video EEG sits on a neighbouring Neurology sheet. Deep brain stimulation and stroke thrombectomy remain the shared Neurosurgery slugs. VNS, IVIG, MRgFUS and sleep study sit on Neurology sheets.",
  },
  {
    q: "What does hemodialysis typically cost in India versus the US?",
    a: "GAF Healthcare's Hemodialysis sheet lists a partner planning range of about $8,000–$18,000 per year against typical US cash of $70,000–$150,000 per year, depending on sessions and campus. Peritoneal dialysis, CRRT and SLED sit on neighbouring Nephrology sheets. Kidney transplantation remains the shared Urology slug. Plasmapheresis remains the shared Neurology slug.",
  },
  {
    q: "What does total knee replacement typically cost in India versus the US?",
    a: "GAF Healthcare's Total Knee Replacement sheet lists a partner planning range of about $5,500–$12,000 against typical US cash of $35,000–$70,000, depending on implant, laterality and campus. Robotic, partial and revision knee sit on separate Orthopedics sheets. ACL reconstruction is a sports slug, not an arthroplasty product.",
  },
  {
    q: "What does ERCP typically cost in India versus the US?",
    a: "GAF Healthcare's ERCP sheet lists a partner planning range of about $1,500–$4,200 against typical US cash of $8,000–$22,000, depending on sphincterotomy, stent and campus. Colonoscopy, EUS, POEM and PTBD sit on separate Gastroenterology sheets. Endoscopic sleeve gastroplasty remains on the bariatric sheet.",
  },
  {
    q: "What does cochlear implantation typically cost in India versus the US?",
    a: "GAF Healthcare's Cochlear Implantation sheet lists a partner planning range of about $15,000–$32,000 against typical US cash of $50,000–$100,000, depending on device, mapping and campus. FESS, septoplasty and BAHA sit on separate sheets. Rhinoplasty remains on the cosmetic sheet with a shared slug.",
  },
  {
    q: "What does rhinoplasty typically cost in India versus the US?",
    a: "GAF Healthcare's Rhinoplasty sheet lists a partner planning range of about $2,500–$5,500 against typical US cash of $8,000–$18,000, depending on open versus closed work and campus. Facelift, blepharoplasty and hair transplant sit on separate sheets. Blepharoplasty keeps a shared slug with Ophthalmology.",
  },
  {
    q: "What does sleeve gastrectomy typically cost in India versus the US?",
    a: "GAF Healthcare's Sleeve Gastrectomy sheet lists a partner planning range of about $4,500–$8,500 against typical US cash of $15,000–$28,000, depending on BMI, leak protocol and campus. Bypass, ESG and revisional work sit on separate sheets.",
  },
  {
    q: "What does CABG typically cost in India versus the US?",
    a: "GAF Healthcare's CABG sheet lists a partner planning range of about $5,500–$14,000 against typical US cash of $70,000–$200,000, depending on conduits, ICU stay and campus. Valve work, TAVR and LVAD sit on separate sheets.",
  },
  {
    q: "What does chemotherapy typically cost in India versus the US?",
    a: "GAF Healthcare's Chemotherapy sheet lists a partner planning range of about $1,500–$8,000+ against typical US cash of $10,000–$50,000, depending on protocol, cycles and campus. Immunotherapy, ADCs and CAR-T sit on separate sheets.",
  },
];
