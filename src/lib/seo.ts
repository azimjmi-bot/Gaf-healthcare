import type { Metadata } from "next";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import type { CatalogQuery } from "@/lib/catalog-options";
import { costPath } from "@/lib/catalog-links";
import { displayBio } from "@/lib/hospital-profile";
import { stripMarkdown } from "@/lib/markdown";
import { prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { site } from "@/lib/site";
import type { AppLocale } from "@/lib/i18n/languages";
import { englishHospitalName } from "@/lib/i18n/hospital-names-ar";
import { joinPlaceParts } from "@/lib/i18n/place-labels";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { SITE_URL, absoluteUrl } from "@/lib/seo-url";
import {
  ORGANISATION_ID,
  alternateName,
  compact,
  crawlableUrl,
  documentId,
  entityId,
} from "@/lib/jsonld";

export { SITE_URL, absoluteUrl };

function hospitalAlternateName(slug: string, displayName: string) {
  const official = englishHospitalName(slug);
  return official ? alternateName(displayName, official) : undefined;
}

function clip(text: string, max = 158) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max - 1).trimEnd()}…`;
}

export function doctorMetadata(d: Doctor, locale: AppLocale = "en"): Metadata {
  if (locale === "ar") {
    const specialty = taxonomyLabel(d.specialty, "ar");
    const city = taxonomyLabel(d.city, "ar");
    const country = taxonomyLabel(d.country, "ar");
    const procs = d.procedures.slice(0, 3).map((name) => taxonomyLabel(name, "ar")).join("، ");
    const officialCampus = englishHospitalName(d.hospitalSlug);
    const title = `${d.name} — ${specialty} في ${city}، ${country}`;
    const campus = joinPlaceParts([d.hospitalName, city, country]);
    const description = clip(
      `${d.name} ${specialty} في ${campus}. ${procs}. مراجعة السجلات ثم مكالمة فيديو عبر GAF Healthcare قبل تحديد السفر. ${stripMarkdown(d.bio)}`,
    );
    const url = absoluteUrl(`/doctors/${d.slug}`, "ar");
    return {
      title,
      description,
      keywords: [
        d.name,
        ...(officialCampus && officialCampus !== d.hospitalName ? [officialCampus] : []),
        `${specialty} ${city}`,
        `${specialty} الهند`,
        `${specialty} في الهند`,
        "سياحة علاجية الهند",
        ...d.procedures.slice(0, 6).map((name) => taxonomyLabel(name, "ar")),
      ],
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        type: "profile",
        locale: "ar",
        siteName: site.name,
      },
      twitter: { card: "summary", title, description },
    };
  }
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
  const title =
    d.specialtySlug === "radiation-oncology"
      ? `${d.name} – Radiation Oncologist in ${d.city}`
      : `${d.name}, ${role} in ${d.city}, India`;
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

export function hospitalMetadata(h: Hospital, locale: AppLocale = "en"): Metadata {
  if (locale === "ar") {
    const city = taxonomyLabel(h.city, "ar");
    const country = taxonomyLabel(h.country, "ar");
    const specs = h.specialties.slice(0, 5).map((name) => taxonomyLabel(name, "ar")).join("، ");
    const eye = h.specialtySlug === "ophthalmology" && h.specialtySlugs.length === 1;
    const official = englishHospitalName(h.slug);
    const title = eye
      ? `${h.name} — مستشفى عيون في ${city}، ${country}`
      : `${h.name} — مستشفى معتمد في ${city}، ${country}`;
    const description = clip(
      `${h.name} في ${city}، ${country}. ${specs}. ${h.accreditation}. مصنّف على GAF Healthcare حسب البلد والمدينة والتخصص والإجراء. مراجعة السجلات ثم فيديو قبل السفر. ${displayBio(h.bio)}`,
    );
    const url = absoluteUrl(`/hospitals/${h.slug}`, "ar");
    return {
      title,
      description,
      keywords: [
        h.name,
        ...(official && official !== h.name ? [official] : []),
        `مستشفيات ${city}`,
        "مستشفيات الهند",
        "سياحة علاجية الهند",
        "مستشفيات JCI الهند",
        "مستشفيات NABH",
        ...h.specialties.slice(0, 8).map((name) => taxonomyLabel(name, "ar")),
        ...h.procedures.slice(0, 6).map((name) => taxonomyLabel(name, "ar")),
      ],
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        type: "website",
        locale: "ar",
        siteName: site.name,
      },
      twitter: { card: "summary_large_image", title, description },
    };
  }
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
  const url = absoluteUrl(costPath(t.name));
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

export { catalogMetadata } from "@/lib/catalog-metadata";

function alumniOf(doctor: Doctor) {
  const schools = (doctor.education ?? []).map((line) => line.trim()).filter(Boolean).slice(0, 3);
  if (schools.length === 0) return undefined;
  return schools.map((line) => ({
    "@type": "EducationalOrganization",
    name: line.split("—").pop()?.trim() || line,
  }));
}

export function physicianJsonLd(d: Doctor, locale: AppLocale = "en", english?: Doctor) {
  const path = `/doctors/${d.slug}`;
  const hospitalPath = `/hospitals/${d.hospitalSlug}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": entityId(path, "person"),
    name: d.name,
    alternateName: english ? alternateName(d.name, english.name) : undefined,
    url: crawlableUrl(path, locale),
    jobTitle: d.title,
    description: clip(stripMarkdown(d.bio), 240),
    medicalSpecialty: taxonomyLabel(d.specialty, locale),
    knowsAbout: d.procedures.map((name) => taxonomyLabel(name, locale)),
    availableLanguage: d.languages
      .split(/[،,]/)
      .map((part) => part.trim())
      .filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: taxonomyLabel(d.city, locale),
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: taxonomyLabel(d.city, locale),
      containedInPlace: { "@type": "Country", name: taxonomyLabel(d.country, locale) },
    },
    worksFor: compact({
      "@type": "Hospital",
      "@id": entityId(hospitalPath, "hospital"),
      name: d.hospitalName,
      alternateName: hospitalAlternateName(d.hospitalSlug, d.hospitalName),
      url: crawlableUrl(hospitalPath, locale),
      address: {
        "@type": "PostalAddress",
        addressLocality: taxonomyLabel(d.city, locale),
        addressCountry: "IN",
      },
    }),
    hospitalAffiliation: compact({
      "@type": "Hospital",
      "@id": entityId(hospitalPath, "hospital"),
      name: d.hospitalName,
      alternateName: hospitalAlternateName(d.hospitalSlug, d.hospitalName),
      url: crawlableUrl(hospitalPath, locale),
    }),
    hasCredential: d.qualifications
      ? { "@type": "EducationalOccupationalCredential", name: d.qualifications }
      : undefined,
    alumniOf: alumniOf(d),
  });
}

export function doctorProfilePageJsonLd(
  d: Doctor,
  locale: AppLocale = "en",
  opts?: { name?: string; english?: Doctor },
) {
  const path = `/doctors/${d.slug}`;
  const entity: Record<string, unknown> = { ...physicianJsonLd(d, locale, opts?.english) };
  delete entity["@context"];
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": documentId(path, locale, "profilepage"),
    name:
      opts?.name ??
      (d.specialtySlug === "radiation-oncology"
        ? `${d.name} — Radiation Oncologist in ${d.city}`
        : `${d.name} — ${d.title.split(",")[0]?.trim() || d.specialty} in ${d.city}`),
    inLanguage: locale,
    url: absoluteUrl(path, locale),
    mainEntity: {
      ...entity,
      "@type": ["Person", "Physician"],
    },
  };
}

export function hospitalJsonLd(h: Hospital, locale: AppLocale = "en") {
  const path = `/hospitals/${h.slug}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": entityId(path, "hospital"),
    name: h.name,
    alternateName: hospitalAlternateName(h.slug, h.name),
    url: crawlableUrl(path, locale),
    description: clip(displayBio(h.bio), 240),
    medicalSpecialty: h.specialties.map((name) => taxonomyLabel(name, locale)),
    address: {
      "@type": "PostalAddress",
      addressLocality: taxonomyLabel(h.city, locale),
      addressCountry: "IN",
    },
  });
}

export function breadcrumbJsonLd(items: { name: string; path: string }[], locale: AppLocale = "en") {
  // The trail always ends on the page doing the emitting, so the document @id
  // comes from the last crumb rather than a separate argument.
  const pagePath = items[items.length - 1]?.path ?? "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": documentId(pagePath, locale, "breadcrumb"),
    inLanguage: locale,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      // A trail through an unpublished facet must point at the English page
      // that exists, not the Arabic one that carries noindex.
      item: crawlableUrl(item.path, locale),
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
  keywords?: string[];
  spatialCoverage?: { "@type": "Country" | "City"; name: string }[];
}) {
  const locale = opts.locale ?? "en";
  const url = absoluteUrl(opts.path, locale);
  return compact({
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "WebPage"],
    "@id": documentId(opts.path, locale, "webpage"),
    name: opts.name,
    description: clip(opts.description),
    url,
    inLanguage: locale,
    lastReviewed: opts.lastReviewed,
    dateModified: opts.lastReviewed,
    isPartOf: {
      "@type": "WebSite",
      "@id": entityId("/", "website"),
      name: site.name,
      url: crawlableUrl("/", locale),
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANISATION_ID,
      name: site.name,
      url: crawlableUrl("/", locale),
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/gaf-healthcare.png") },
    },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    specialty: opts.specialty,
    keywords: opts.keywords?.join(", "),
    spatialCoverage: opts.spatialCoverage,
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    about: {
      "@type": "MedicalProcedure",
      name: opts.procedureName,
      procedureType: opts.specialty,
      description: clip(opts.about, 300),
    },
  });
}

export function hospitalItemListJsonLd(rows: Hospital[], opts: { name: string; path: string; locale?: AppLocale; addressCountry?: string }) {
  const locale = opts.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": documentId(opts.path, locale, "hospital-list"),
    name: opts.name,
    inLanguage: locale,
    url: absoluteUrl(opts.path, locale),
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: rows.map((hospital, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Hospital",
        "@id": entityId(`/hospitals/${hospital.slug}`, "hospital"),
        name: hospital.name,
        ...(hospitalAlternateName(hospital.slug, hospital.name)
          ? { alternateName: hospitalAlternateName(hospital.slug, hospital.name) }
          : {}),
        url: crawlableUrl(`/hospitals/${hospital.slug}`, locale),
        medicalSpecialty: hospital.specialties.map((name) => taxonomyLabel(name, locale)),
        address: {
          "@type": "PostalAddress",
          addressLocality: taxonomyLabel(hospital.city, locale),
          addressCountry: opts.addressCountry ?? "IN",
        },
      },
    })),
  };
}

export function doctorItemListJsonLd(rows: Doctor[], opts: { name: string; path: string; locale?: AppLocale; addressCountry?: string }) {
  const locale = opts.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": documentId(opts.path, locale, "doctor-list"),
    name: opts.name,
    inLanguage: locale,
    url: absoluteUrl(opts.path, locale),
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: rows.map((doctor, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        // schema.org's Physician descends from MedicalOrganization, so the
        // Person half is what carries worksFor and jobTitle. The profile page
        // has always emitted both; the list items were the odd ones out.
        "@type": ["Person", "Physician"],
        "@id": entityId(`/doctors/${doctor.slug}`, "person"),
        name: doctor.name,
        url: crawlableUrl(`/doctors/${doctor.slug}`, locale),
        medicalSpecialty: taxonomyLabel(doctor.specialty, locale),
        jobTitle: doctor.title || undefined,
        hasCredential: doctor.qualifications
          ? { "@type": "EducationalOccupationalCredential", name: doctor.qualifications }
          : undefined,
        worksFor: compact({
          "@type": "Hospital",
          "@id": entityId(`/hospitals/${doctor.hospitalSlug}`, "hospital"),
          name: doctor.hospitalName,
          alternateName: hospitalAlternateName(doctor.hospitalSlug, doctor.hospitalName),
        }),
        hospitalAffiliation: compact({
          "@type": "Hospital",
          "@id": entityId(`/hospitals/${doctor.hospitalSlug}`, "hospital"),
          name: doctor.hospitalName,
          alternateName: hospitalAlternateName(doctor.hospitalSlug, doctor.hospitalName),
        }),
        alumniOf: alumniOf(doctor),
        address: {
          "@type": "PostalAddress",
          addressLocality: taxonomyLabel(doctor.city, locale),
          addressCountry: opts.addressCountry ?? "IN",
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
  const url = absoluteUrl(opts?.path ?? costPath(t.name));
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

export function faqJsonLd(
  rows: { q: string; a: string }[],
  opts: { path: string; locale?: AppLocale },
) {
  const locale = opts.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": documentId(opts.path, locale, "faq"),
    inLanguage: locale,
    url: absoluteUrl(opts.path, locale),
    mainEntity: rows.map((row) => ({
      "@type": "Question",
      name: row.q,
      acceptedAnswer: { "@type": "Answer", text: row.a },
    })),
  };
}

export { COST_FAQS, DOCTOR_FAQS, HOSPITAL_FAQS } from "@/lib/i18n/directory-faqs";
