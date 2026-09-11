import type { Metadata } from "next";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import type { CatalogQuery } from "@/lib/catalog-options";
import { displayBio } from "@/lib/hospital-profile";
import { stripMarkdown } from "@/lib/markdown";
import { prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { site } from "@/lib/site";
import type { AppLocale } from "@/lib/i18n/languages";
import { localePath } from "@/lib/i18n/path";

export const SITE_URL = "https://gaf.healthcare";

export function absoluteUrl(path = "/", locale: AppLocale = "en") {
  if (!path.startsWith("/")) path = `/${path}`;
  return new URL(localePath(path, locale), SITE_URL).toString();
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
    `${d.name} is a ${role} at ${d.hospitalName} in ${d.city}, India. ${d.procedures.slice(0, 3).join(", ")}. Meet on camera before travel. ${stripMarkdown(d.bio)}`,
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
    `${h.name} in ${h.city}, India lists ${h.specialties.join(", ")}. ${h.accreditation}. ${displayBio(h.bio)}`,
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

export function physicianJsonLd(d: Doctor, locale: AppLocale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: d.name,
    inLanguage: locale,
    url: absoluteUrl(`/doctors/${d.slug}`, locale),
    jobTitle: d.title,
    description: clip(stripMarkdown(d.bio), 240),
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
      url: absoluteUrl(`/hospitals/${d.hospitalSlug}`, locale),
      address: {
        "@type": "PostalAddress",
        addressLocality: d.city,
        addressCountry: "IN",
      },
    },
  };
}

export function hospitalJsonLd(h: Hospital, locale: AppLocale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: h.name,
    inLanguage: locale,
    url: absoluteUrl(`/hospitals/${h.slug}`, locale),
    description: clip(displayBio(h.bio), 240),
    medicalSpecialty: h.specialties,
    address: {
      "@type": "PostalAddress",
      addressLocality: h.city,
      addressCountry: "IN",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[], locale: AppLocale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
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
  image?: string;
  locale?: AppLocale;
}) {
  const locale = opts.locale ?? "en";
  const url = absoluteUrl(opts.path, locale);
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "WebPage"],
    name: opts.name,
    description: clip(opts.description),
    url,
    inLanguage: locale,
    lastReviewed: opts.lastReviewed,
    dateModified: opts.lastReviewed,
    isPartOf: { "@type": "WebSite", name: site.name, url: absoluteUrl("/", locale) },
    publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/", locale) },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    specialty: opts.specialty,
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    about: {
      "@type": "MedicalProcedure",
      name: opts.procedureName,
      procedureType: opts.specialty,
      description: clip(opts.about, 300),
    },
  };
}

export function hospitalItemListJsonLd(rows: Hospital[], opts: { name: string; path: string; locale?: AppLocale }) {
  const locale = opts.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: absoluteUrl(opts.path, locale),
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: rows.map((hospital, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Hospital",
        name: hospital.name,
        url: absoluteUrl(`/hospitals/${hospital.slug}`, locale),
        medicalSpecialty: hospital.specialties,
        address: {
          "@type": "PostalAddress",
          addressLocality: hospital.city,
          addressCountry: "IN",
        },
      },
    })),
  };
}

export function doctorItemListJsonLd(rows: Doctor[], opts: { name: string; path: string; locale?: AppLocale }) {
  const locale = opts.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: absoluteUrl(opts.path, locale),
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: rows.map((doctor, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Physician",
        name: doctor.name,
        url: absoluteUrl(`/doctors/${doctor.slug}`, locale),
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
  opts?: { path?: string; image?: string; imageAlt?: string },
): Metadata {
  const url = absoluteUrl(opts?.path ?? `/costs/${t.slug}`);
  const description = clip(article.seoDescription);
  const ogImage = opts?.image
    ? [{ url: absoluteUrl(opts.image), alt: opts.imageAlt || article.seoTitle }]
    : undefined;
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
      ...(ogImage ? { images: ogImage } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description,
      ...(ogImage ? { images: ogImage.map((row) => row.url) } : {}),
    },
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

export const HOSPITAL_FAQS = [
  {
    q: "How do I choose the right hospital for my treatment?",
    a: "Consider factors such as the hospital's relevant specialties, doctors, procedures offered, location, available facilities, accreditation, international-patient services, and your specific treatment requirements. GAF Healthcare helps you explore these factors so you can make a more informed decision.",
  },
  {
    q: "How are hospitals listed on GAF Healthcare?",
    a: "Hospitals are listed based on information such as their location, medical specialties, treatments and procedures, doctors, facilities, and other available professional information. Listings are intended to help patients explore their options and are not presented as a universal ranking of hospitals.",
  },
  {
    q: "Can I compare hospitals before choosing one?",
    a: "Yes. You can explore hospitals by location, specialty, treatment, doctors, facilities, and other available information. Comparing these factors can help you identify hospitals that may be suitable for your treatment needs.",
  },
  {
    q: "How can I check whether a hospital is accredited?",
    a: "Hospital accreditation can provide information about the standards and quality systems followed by a facility. Where accreditation information is available, GAF Healthcare displays relevant details on the hospital profile. Patients should also verify current accreditation status directly with the hospital when making a final decision.",
  },
  {
    q: "Do the hospitals listed on GAF Healthcare treat international patients?",
    a: "Many hospitals listed on GAF Healthcare have services or departments that support international patients. These may include international patient coordinators, airport assistance, language support, visa assistance, accommodation guidance, and medical travel coordination. Services vary by hospital.",
  },
  {
    q: "Can I find doctors and specialists associated with a hospital?",
    a: "Yes. Hospital profiles can help you explore doctors and specialists associated with the facility. You can review individual doctor profiles to understand their specialty, relevant experience, procedures, and other available professional information.",
  },
  {
    q: "Can I get a treatment cost estimate from a hospital before travelling?",
    a: "Treatment costs depend on your diagnosis, treatment plan, doctor, hospital, room category, investigations, and other clinical requirements. International patients can share their medical records to request an indicative treatment estimate before making travel arrangements, subject to hospital and doctor review.",
  },
  {
    q: "Can GAF Healthcare help me choose a hospital based on my treatment?",
    a: "Yes. You can share your treatment requirements and medical records with GAF Healthcare. Where appropriate, our team can help you explore relevant hospitals and doctors based on your medical needs, preferred destination, and available options.",
  },
  {
    q: "What facilities and services should I consider when choosing a hospital?",
    a: "Depending on your treatment, you may want to consider the relevant specialty and doctors, diagnostic facilities, operating theatres, intensive care capabilities, rehabilitation services, accommodation options, international-patient support, and access to other specialists required during your treatment.",
  },
  {
    q: "Can I contact or visit a hospital before deciding?",
    a: "Depending on the hospital, you may be able to communicate with the hospital's international-patient team, request a medical review, schedule a consultation, or arrange a hospital visit. Availability and processes vary by facility.",
  },
];

export const COST_FAQS = [
  {
    q: "How is the cost of a medical procedure determined?",
    a: "The cost of a medical procedure can depend on several factors, including the type and complexity of treatment, diagnostic requirements, surgeon or specialist fees, hospital selected, room category, operating-room time, ICU requirements, medicines, implants or medical devices, and length of hospital stay. The final cost can only be confirmed after reviewing the patient's clinical requirements and treatment plan.",
  },
  {
    q: "Why does the same treatment cost different amounts at different hospitals?",
    a: "Treatment costs can vary between hospitals because of differences in facilities, doctor fees, room categories, equipment, implants or medical devices, diagnostic services, length of stay, and the complexity of the patient's treatment. A lower quoted price may also cover fewer services, so it is important to compare what is included rather than comparing the headline price alone.",
  },
  {
    q: "What is usually included in a treatment cost estimate?",
    a: "Depending on the hospital and procedure, an estimate may include doctor or surgeon fees, hospital charges, operating-room costs, anaesthesia, accommodation, routine medicines, nursing care, and certain investigations. Inclusions vary by treatment and hospital, so patients should review the estimate carefully to understand what is included and what may be charged separately.",
  },
  {
    q: "What costs may be excluded from a treatment estimate?",
    a: "Some estimates may exclude additional diagnostic tests, specialist consultations, blood products, advanced medicines, implants, complications, extended hospital or ICU stays, rehabilitation, additional procedures, or treatments that become necessary after the initial assessment. Travel, accommodation outside the hospital, visa expenses, and personal expenses are also generally separate unless specifically stated.",
  },
  {
    q: "Why can the final hospital bill be different from the initial estimate?",
    a: "An initial estimate is generally based on the information available before treatment. The final bill can change if the patient's clinical condition requires additional tests, medicines, procedures, a longer hospital stay, ICU care, specialised equipment, or other services. Ask the hospital which parts of the estimate are fixed and which may change based on clinical requirements.",
  },
  {
    q: "Does the treatment cost include travel and accommodation?",
    a: "Usually, the medical treatment estimate covers hospital and medical services specified by the provider and does not automatically include international flights, visa costs, hotel accommodation outside the hospital, meals for accompanying family members, local transportation, or other personal expenses. Always check the specific inclusions before making travel arrangements.",
  },
  {
    q: "How can I get a more accurate estimate for my treatment?",
    a: "The most accurate estimate generally requires a review of your medical records and current diagnosis. You can provide relevant reports, scans, previous treatment records, prescriptions, and other available clinical information so that the appropriate doctor or hospital can assess your case and provide an indicative treatment plan and estimate.",
  },
  {
    q: "Can I compare treatment costs between different countries?",
    a: "Yes. GAF Healthcare allows patients to explore indicative treatment costs across different medical-tourism destinations. International cost comparisons should be treated as planning estimates because prices can vary according to the hospital, doctor, treatment complexity, local healthcare costs, and services included in each estimate.",
  },
  {
    q: "Should I choose a treatment based only on the lowest price?",
    a: "No. Price is only one factor to consider when choosing treatment abroad. Patients should also consider the doctor's relevant expertise, hospital facilities, accreditation where applicable, treatment approach, expected length of stay, what is included in the estimate, follow-up arrangements, and the hospital's experience with international patients.",
  },
  {
    q: "Can GAF Healthcare help me compare treatment options and costs?",
    a: "Yes. You can explore treatment costs by procedure and destination and review available doctors and hospitals. If you need a more personalized estimate, you can share your medical records so that suitable treatment options and providers can be explored based on your individual requirements.",
  },
];
