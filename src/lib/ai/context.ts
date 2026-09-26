import "server-only";

import {
  doctorAdminRows,
  getAdminDoctor,
  getAdminHospital,
  getAdminTreatment,
  hospitalAdminRows,
} from "@/lib/cms/catalog-admin";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { loadCms } from "@/lib/cms/store";
import type { CmsEdition } from "@/lib/cms/edition";
import { treatmentEditorialBody } from "@/lib/curated-treatment-editorial";
import { staticInternalPaths } from "@/lib/ai/links";
import { extractMoneyTokens } from "@/lib/ai/validate";
import type { AiGenerateRequest } from "@/lib/ai/types";
import { CITIES, COUNTRIES, getCity, getCountry, getSpecialty, SPECIALTIES } from "@/lib/taxonomy";

function doctorCard(slug: string, edition: CmsEdition) {
  const row = getAdminDoctor(slug, edition);
  if (!row || row.deleted) return null;
  return {
    slug: row.slug,
    name: row.name,
    title: row.title,
    qualifications: row.qualifications,
    experience: row.experience,
    years: row.years,
    languages: row.languages,
    specialty: row.specialty,
    hospitalName: row.hospitalName,
    city: row.city,
    country: row.country,
    procedures: row.procedures,
    specializations: row.specializations,
    proceduresExpertise: row.proceduresExpertise,
    education: row.education,
    affiliations: row.affiliations,
    memberships: row.memberships,
    awards: row.awards,
    research: row.research,
    credentials: row.credentials,
    bio: row.bio,
    url: `/doctors/${row.slug}`,
  };
}

function hospitalCard(slug: string, edition: CmsEdition) {
  const row = getAdminHospital(slug, edition);
  if (!row || row.deleted) return null;
  return {
    slug: row.slug,
    name: row.name,
    city: row.city,
    country: row.country,
    accreditation: row.accreditation,
    focus: row.focus,
    specialty: row.specialty,
    specialties: row.specialties,
    established: row.established,
    beds: row.beds,
    languages: row.languages,
    icu: row.icu,
    bio: row.bio,
    summary: row.summary,
    url: `/hospitals/${row.slug}`,
  };
}

export function studioOptions(edition: CmsEdition) {
  const curated = loadCuratedTreatments().treatments.filter((row) => row.status !== "archived");
  const cms = loadCms(edition);
  return {
    countries: COUNTRIES.map((row) => ({ slug: row.slug, name: row.name })),
    cities: CITIES.map((row) => ({ slug: row.slug, name: row.name, countrySlug: row.countrySlug })),
    specialties: SPECIALTIES.map((row) => ({ slug: row.slug, name: row.name })),
    treatments: curated.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.translations.en?.name || row.baseName,
      specialtySlug: row.specialtySlug,
      destinationSlugs: row.destinationSlugs,
      status: row.status,
    })),
    doctors: doctorAdminRows(edition)
      .filter((row) => !row.deleted)
      .map((row) => ({ slug: row.slug, name: row.name, specialty: row.specialty, city: row.city })),
    hospitals: hospitalAdminRows(edition)
      .filter((row) => !row.deleted)
      .map((row) => ({ slug: row.slug, name: row.name, city: row.city })),
    articles: cms.articles
      .filter((row) => row.status !== "trash")
      .map((row) => ({ id: row.id, slug: row.slug, title: row.title || "Untitled", status: row.status })),
  };
}

export function gatherStudioContext(request: AiGenerateRequest) {
  const edition = request.locale;
  const curated = loadCuratedTreatments().treatments;
  const treatment =
    curated.find((row) => row.id === request.recordId || row.slug === request.treatmentSlug) ||
    curated.find((row) => row.specialtySlug === request.specialtySlug && request.treatmentSlug && row.slug === request.treatmentSlug);
  const catalogTreatment = request.treatmentSlug ? getAdminTreatment(request.treatmentSlug, edition) : null;
  const doctor = request.doctorSlug ? doctorCard(request.doctorSlug, edition) : null;
  const hospital = request.hospitalSlug ? hospitalCard(request.hospitalSlug, edition) : null;
  const article = request.articleId
    ? loadCms(edition).articles.find((row) => row.id === request.articleId)
    : null;

  const country = request.countrySlug ? getCountry(request.countrySlug) : undefined;
  const city = request.citySlug ? getCity(request.citySlug) : undefined;
  const specialty = request.specialtySlug ? getSpecialty(request.specialtySlug) : undefined;

  const linkedDoctors = (request.useDoctors === false ? [] : treatment?.doctorSlugs ?? [])
    .map((slug) => doctorCard(slug, edition))
    .filter(Boolean);
  const linkedHospitals = (request.useHospitals === false ? [] : treatment?.hospitalSlugs ?? [])
    .map((slug) => hospitalCard(slug, edition))
    .filter(Boolean);
  const related = (treatment?.relatedTreatmentSlugs ?? [])
    .map((slug) => curated.find((row) => row.slug === slug))
    .filter(Boolean)
    .map((row) => ({
      slug: row!.slug,
      name: row!.translations.en?.name || row!.baseName,
      url: `/treatments/${row!.slug}`,
    }));

  const costSheets = request.useCosts === false
    ? []
    : (treatment?.costPageSlugs ?? []).map((slug) => {
        const sheet = getAdminTreatment(slug, edition);
        return sheet
          ? {
              slug: sheet.slug,
              name: sheet.name,
              usRange: sheet.usRange,
              partnerRange: sheet.partnerRange,
              stay: sheet.stay,
              url: `/costs/${sheet.slug}`,
            }
          : { slug, name: slug, usRange: "", partnerRange: "", stay: "", url: `/costs/${slug}` };
      });

  const translation = treatment?.translations[edition] ?? treatment?.translations.en;
  const original: Record<string, string> = {};
  if (translation) {
    original.editorialBody = treatmentEditorialBody(translation, edition);
    original.seoTitle = translation.seoTitle;
    original.metaDescription = translation.metaDescription;
    original.name = translation.name;
    original.shortDescription = translation.shortDescription;
  }
  if (doctor) original.bio = doctor.bio;
  if (hospital) original.bio = hospital.bio;
  if (article) {
    original.title = article.title;
    original.excerpt = article.excerpt;
    original.seoTitle = article.seoTitle;
    original.seoDescription = article.seoDescription;
  }

  const allowedUrls = new Set(staticInternalPaths());
  if (treatment) allowedUrls.add(`/treatments/${treatment.slug}`);
  for (const row of curated) allowedUrls.add(`/treatments/${row.slug}`);
  for (const row of linkedDoctors) if (row) allowedUrls.add(row.url);
  for (const row of linkedHospitals) if (row) allowedUrls.add(row.url);
  for (const row of related) allowedUrls.add(row.url);
  for (const row of costSheets) allowedUrls.add(row.url);
  if (doctor) allowedUrls.add(doctor.url);
  if (hospital) allowedUrls.add(hospital.url);
  if (article?.slug) allowedUrls.add(`/blogs/${article.slug}`);
  if (catalogTreatment) allowedUrls.add(`/costs/${catalogTreatment.slug}`);

  const moneySources = [
    catalogTreatment?.usRange,
    catalogTreatment?.partnerRange,
    ...costSheets.flatMap((row) => [row.usRange, row.partnerRange]),
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  const currentUrl = treatment
    ? `/treatments/${treatment.slug}`
    : doctor
      ? doctor.url
      : hospital
        ? hospital.url
        : article?.slug
          ? `/blogs/${article.slug}`
          : "";

  return {
    currentUrl,
    currentSlug: treatment?.slug || doctor?.slug || hospital?.slug || article?.slug || "",
    recordId: treatment?.id || doctor?.slug || hospital?.slug || article?.id || "",
    original,
    allowedUrls: [...allowedUrls],
    allowedDoctorNames: [doctor?.name, ...linkedDoctors.map((row) => row?.name)]
      .filter((value): value is string => Boolean(value)),
    allowedHospitalNames: [hospital?.name, ...linkedHospitals.map((row) => row?.name)]
      .filter((value): value is string => Boolean(value)),
    allowedMoney: extractMoneyTokens(moneySources),
    payload: {
      selected: {
        contentType: request.contentType,
        locale: request.locale,
        country: country ? { name: country.name, slug: country.slug } : null,
        city: city ? { name: city.name, slug: city.slug } : null,
        specialty: specialty ? { name: specialty.name, slug: specialty.slug } : null,
        currentUrl,
        currentSlug: treatment?.slug || doctor?.slug || hospital?.slug || article?.slug || "",
      },
      treatment: treatment
        ? {
            id: treatment.id,
            slug: treatment.slug,
            baseName: treatment.baseName,
            status: treatment.status,
            specialtySlug: treatment.specialtySlug,
            destinationSlugs: treatment.destinationSlugs,
            translation: translation
              ? {
                  name: translation.name,
                  shortDescription: translation.shortDescription,
                  editorialBody: treatmentEditorialBody(translation, edition),
                  seoTitle: translation.seoTitle,
                  metaDescription: translation.metaDescription,
                  faqs: translation.faqs,
                  status: translation.status,
                }
              : null,
          }
        : null,
      catalogTreatment:
        request.useTreatment === false
          ? null
          : catalogTreatment
            ? {
                slug: catalogTreatment.slug,
                name: catalogTreatment.name,
                summary: catalogTreatment.summary,
                usRange: catalogTreatment.usRange,
                partnerRange: catalogTreatment.partnerRange,
                stay: catalogTreatment.stay,
                notes: catalogTreatment.notes,
                includes: catalogTreatment.includes,
                conditions: catalogTreatment.conditions,
              }
            : null,
      doctor: request.contentType === "doctor" || request.useDoctors !== false ? doctor : null,
      hospital: request.contentType === "hospital" || request.useHospitals !== false ? hospital : null,
      linkedDoctors,
      linkedHospitals,
      relatedTreatments: related,
      costSheets,
      article: article
        ? {
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            seoTitle: article.seoTitle,
            seoDescription: article.seoDescription,
            status: article.status,
            canonical: article.canonical,
          }
        : null,
      allowed_urls: [...allowedUrls],
    },
  };
}
