import { getCostArticle } from "@/data/cost-articles";
import type { SpecialtyPageProfile } from "@/data/specialty-pages/types";
import { radiationOncologyIndiaProfile } from "@/data/specialty-pages/radiation-oncology";
import type { Doctor } from "@/lib/doctors";
import { costPath, costsFilterPath } from "@/lib/catalog-links";
import { getCity, getProcedure, getSpecialty, proceduresForSpecialty, toSlug } from "@/lib/taxonomy";
import { getTreatment } from "@/lib/treatments";

function listedExperienceYears(doctor: Doctor) {
  const match = `${doctor.years} ${doctor.experience}`.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : undefined;
}

export type ContentReviewStatus = "Draft" | "Reviewed" | "Published" | "Needs Review";

export type SourceContentRef = {
  sourceContentId: string;
  sourceContentType: "specialty" | "cost" | "city-editorial" | "doctor" | "treatment";
  canonicalUrl: string;
  definition?: string;
  quickAnswer: string;
  sourceLastUpdated?: string;
  summaryLastGenerated: string;
  reviewStatus: ContentReviewStatus;
};

export type QuickAnswerItem = {
  question: string;
  answer: string;
  sourceHref?: string;
  sourceLabel?: string;
  source?: SourceContentRef;
};

export const QUICK_ANSWER_MIN_WORDS = 50;
export const QUICK_ANSWER_MAX_WORDS = 120;

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Clip existing source text. Never invents words to reach the minimum. */
export function clipToWords(text: string, max = QUICK_ANSWER_MAX_WORDS) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  const words = normalized.split(" ");
  if (words.length <= max) return normalized;
  const clipped = words.slice(0, max).join(" ");
  const sentence = clipped.match(/^[\s\S]*[.!?](?=\s|$)/);
  return (sentence?.[0] ?? clipped).trim();
}

export function specialtyProfileFor(specialty: string): SpecialtyPageProfile | undefined {
  const taxon = getSpecialty(specialty);
  if (taxon?.slug === "radiation-oncology") return radiationOncologyIndiaProfile;
  return undefined;
}

export function procedureDefinitionFromCanonical(procedure: string) {
  const slug = toSlug(procedure);
  const article = getCostArticle(slug);
  if (article) {
    const definition = article.overview.what.filter(Boolean).slice(0, 2).join(" ");
    return {
      text: clipToWords(definition),
      source: {
        sourceContentId: article.slug,
        sourceContentType: "cost" as const,
        canonicalUrl: costPath(procedure),
        definition: article.overview.what[0],
        quickAnswer: clipToWords(definition),
        sourceLastUpdated: article.lastUpdated,
        summaryLastGenerated: article.lastUpdated,
        reviewStatus: "Published" as const,
      },
    };
  }
  const treatment = getTreatment(slug);
  if (treatment?.summary) {
    return {
      text: clipToWords(treatment.summary),
      source: {
        sourceContentId: treatment.slug,
        sourceContentType: "treatment" as const,
        canonicalUrl: costPath(procedure),
        definition: treatment.summary,
        quickAnswer: clipToWords(treatment.summary),
        sourceLastUpdated: undefined,
        summaryLastGenerated: treatment.slug,
        reviewStatus: "Needs Review" as const,
      },
    };
  }
  return undefined;
}

export function specialtyDefinitionFromCanonical(specialty: string) {
  const profile = specialtyProfileFor(specialty);
  if (!profile?.introAnswer) return undefined;
  const text = clipToWords(profile.introAnswer);
  return {
    text,
    source: {
      sourceContentId: `${profile.countrySlug}/${profile.specialtySlug}`,
      sourceContentType: "specialty" as const,
      canonicalUrl: costsFilterPath({
        destination: "India",
        specialty,
      }),
      definition: profile.introAnswer,
      quickAnswer: text,
      sourceLastUpdated: profile.lastReviewed,
      summaryLastGenerated: profile.lastReviewed,
      reviewStatus: profile.status === "published" ? ("Published" as const) : ("Draft" as const),
    },
  };
}

export function radiationOncologistRoleFromCanonical(specialty = "Radiation Oncology") {
  const profile = specialtyProfileFor(specialty);
  const paragraph = profile?.overview[0];
  if (!paragraph) return undefined;
  const text = clipToWords(paragraph);
  return {
    text,
    source: {
      sourceContentId: `${profile.countrySlug}/${profile.specialtySlug}#overview`,
      sourceContentType: "specialty" as const,
      canonicalUrl: costsFilterPath({ destination: "India", specialty }),
      definition: paragraph,
      quickAnswer: text,
      sourceLastUpdated: profile.lastReviewed,
      summaryLastGenerated: profile.lastReviewed,
      reviewStatus: profile.status === "published" ? ("Published" as const) : ("Draft" as const),
    },
  };
}

export function cityEditorialFromCanonical(specialty: string, citySlug?: string) {
  if (!citySlug) return undefined;
  const profile = specialtyProfileFor(specialty);
  const editorial = profile?.cityEditorials.find((row) => row.citySlug === citySlug);
  const paragraph = editorial?.introduction[0];
  if (!paragraph || !profile) return undefined;
  const text = clipToWords(paragraph);
  const cityName = getCity(citySlug)?.name;
  return {
    text,
    editorial,
    source: {
      sourceContentId: `${profile.countrySlug}/${profile.specialtySlug}/${citySlug}`,
      sourceContentType: "city-editorial" as const,
      canonicalUrl: costsFilterPath({
        destination: "India",
        city: cityName,
        specialty,
      }),
      definition: paragraph,
      quickAnswer: text,
      sourceLastUpdated: profile.lastReviewed,
      summaryLastGenerated: profile.lastReviewed,
      reviewStatus: "Published" as const,
    },
  };
}

export function relatedProcedureNames(procedure: string, specialty: string) {
  const slug = toSlug(procedure);
  const profile = specialtyProfileFor(specialty);
  const article = getCostArticle(slug);
  const explicit = (article?.relatedProcedures ?? [])
    .map((name) => getProcedure(name)?.name)
    .filter((name): name is string => Boolean(name));
  const group = profile?.treatmentGroups.find((row) => row.procedureSlugs.includes(slug));
  const fromGroup = (group?.procedureSlugs ?? [])
    .filter((item) => item !== slug)
    .map((item) => getProcedure(item)?.name)
    .filter((name): name is string => Boolean(name));
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const name of [...explicit, ...fromGroup]) {
    if (name === procedure || seen.has(name)) continue;
    seen.add(name);
    ordered.push(name);
  }
  const specialtyNames = new Set(proceduresForSpecialty(specialty).map((row) => row.name));
  return ordered.filter((name) => specialtyNames.has(name));
}

export function mappedConditionsForProcedure(procedure: string, specialty: string) {
  const slug = toSlug(procedure);
  const profile = specialtyProfileFor(specialty);
  if (!profile) return [];
  return profile.conditions
    .filter((row) => row.procedureSlugs.includes(slug))
    .map((row) => ({
      name: row.name,
      note: row.summary,
      href: costsFilterPath({ destination: "India", specialty }),
    }));
}

export function specialtyConditionLinks(specialty: string) {
  const profile = specialtyProfileFor(specialty);
  if (!profile) return [];
  return profile.conditions.map((row) => ({
    name: row.name,
    note: row.summary,
    href: costsFilterPath({ destination: "India", specialty }),
  }));
}

export function cityFaqExtras(specialty: string, citySlug?: string) {
  if (!citySlug) return [];
  return specialtyProfileFor(specialty)?.cityEditorials.find((row) => row.citySlug === citySlug)?.faqExtras ?? [];
}

export function doctorWhoAnswer(doctor: Doctor): QuickAnswerItem {
  const years = listedExperienceYears(doctor);
  const procedures = doctor.procedures.slice(0, 4);
  const mapped = procedures.length
    ? ` Documented procedure relationships currently include ${procedures.join(", ")}.`
    : " Procedure relationships appear only when they are recorded on the catalog profile.";
  const experience = years ? ` with ${years} years of listed experience` : "";
  const qualifications = doctor.qualifications
    ? ` Qualifications on the profile include ${doctor.qualifications}.`
    : "";
  const answer = clipToWords(
    `${doctor.name} is a listed ${doctor.specialty.toLowerCase()} specialist at ${doctor.hospitalName} in ${doctor.city}${experience}.${qualifications}${mapped} This summary uses catalog fields only and is not a clinical ranking or endorsement.`,
  );
  return {
    question: `Who is ${doctor.name}?`,
    answer,
    sourceHref: `/doctors/${doctor.slug}`,
    sourceLabel: `${doctor.name} profile`,
    source: {
      sourceContentId: doctor.slug,
      sourceContentType: "doctor",
      canonicalUrl: `/doctors/${doctor.slug}`,
      quickAnswer: answer,
      summaryLastGenerated: doctor.slug,
      reviewStatus: "Published",
    },
  };
}

export function discoveryQuickAnswers(opts: {
  specialty: string;
  cityName?: string;
  citySlug?: string;
  procedure?: string;
  doctorCount: number;
  cityCount: number;
  hospitalCount: number;
}): QuickAnswerItem[] {
  const items: QuickAnswerItem[] = [];
  const specialtyHref = costsFilterPath({ destination: "India", specialty: opts.specialty });
  const procedureSource = opts.procedure ? procedureDefinitionFromCanonical(opts.procedure) : undefined;
  const specialtySource = specialtyDefinitionFromCanonical(opts.specialty);
  const roleSource = radiationOncologistRoleFromCanonical(opts.specialty);
  const citySource = cityEditorialFromCanonical(opts.specialty, opts.citySlug);

  if (opts.procedure && procedureSource?.text) {
    items.push({
      question: `What is ${opts.procedure}?`,
      answer: procedureSource.text,
      sourceHref: procedureSource.source.canonicalUrl,
      sourceLabel: `Read the complete ${opts.procedure} treatment guide`,
      source: procedureSource.source,
    });
  } else if (specialtySource?.text) {
    items.push({
      question: `What is ${opts.specialty}?`,
      answer: specialtySource.text,
      sourceHref: specialtySource.source.canonicalUrl,
      sourceLabel: `Read the ${opts.specialty} treatment guide`,
      source: specialtySource.source,
    });
  }

  if (roleSource?.text) {
    items.push({
      question: `What does a ${getSpecialty(opts.specialty)?.name === "Radiation Oncology" ? "Radiation Oncologist" : `${opts.specialty} specialist`} do?`,
      answer: roleSource.text,
      sourceHref: roleSource.source.canonicalUrl,
      sourceLabel: `Read the ${opts.specialty} treatment guide`,
      source: roleSource.source,
    });
  }

  if (citySource?.text && opts.cityName) {
    const countLine = `${opts.doctorCount} listed ${opts.specialty.toLowerCase()} specialist${opts.doctorCount === 1 ? "" : "s"} currently appear for ${opts.cityName}, across ${opts.hospitalCount} hospital${opts.hospitalCount === 1 ? "" : "s"} in the catalog.`;
    items.push({
      question: opts.procedure
        ? `Is ${opts.procedure} listed in ${opts.cityName}?`
        : `How is ${opts.specialty} organised in ${opts.cityName}?`,
      answer: clipToWords(`${citySource.text} ${countLine}`),
      sourceHref: costsFilterPath({
        destination: "India",
        city: opts.cityName,
        specialty: opts.specialty,
      }),
      sourceLabel: `${opts.cityName} ${opts.specialty} city guide`,
      source: citySource.source,
    });
  }

  return items.filter((item) => item.answer.trim().length > 0);
}

export function specialtyGuideHref(specialty: string, city?: string) {
  return costsFilterPath({ destination: "India", city, specialty });
}

export function canonicalTreatmentHref(procedure: string) {
  return getCostArticle(toSlug(procedure)) ? costPath(procedure) : undefined;
}
