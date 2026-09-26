/**
 * Arabic copy for the specialty hub pages.
 *
 * The hub is the richest page type the site generates — a directory with a
 * lede, a methodology note and a set of evidence paragraphs — and it has only
 * ever existed in English, because its prose is assembled in
 * doctor-discovery.ts and radiation-hospital-page.ts out of English fragments.
 * An Arabic reader currently falls back to the plain directory.
 *
 * Rather than teach those generators a second language, this module builds the
 * same page from the message catalog. The English generators are not touched,
 * so an English hub cannot change; a target locale gets its own copy, keyed to
 * the same facts.
 *
 * Every clinical term comes from the glossary through taxonomyLabel(), so the
 * page says the same things about a procedure that a profile does. Where a
 * term has to be bent to fit the sentence around it — genitive after أفضل,
 * the لام joined to what follows, a noun agreed with its number — that is
 * done in arabic-grammar.ts rather than written into the template, because a
 * template can only concatenate.
 */
import type { CatalogQuery } from "@/lib/catalog-options";
import type { AppLocale } from "@/lib/i18n/languages";
import { interpolate, UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { DOCTOR_ROLES, formatPlace } from "@/lib/i18n/directory-copy";
import { countedNoun, genitivePlural, withBa, withLam } from "@/lib/i18n/arabic-grammar";

export type HubCopy = {
  eyebrow: string;
  heading: string;
  title: string;
  description: string;
  intro: string[];
};

/** Counts the copy quotes. They come from the caller so nothing is recomputed. */
export type DoctorHubFacts = {
  doctors: number;
  hospitals: number;
  cities: number;
};

export type HospitalHubFacts = {
  hospitals: number;
  doctors: number;
  procedures: number;
};

function t(locale: AppLocale, key: string, vars?: Record<string, string | number>) {
  const value = uiCatalogFor(locale)[key] || UI_MESSAGE_FIELDS[key] || key;
  return vars ? interpolate(value, vars) : value;
}

/**
 * Arabic is the only locale whose hub copy is written. The other target
 * locales still fall through to the plain directory, as they do everywhere
 * else in directory-copy.ts, and English keeps its own generators.
 */
function servesHub(locale: AppLocale): boolean {
  return locale === "ar";
}

/** The plural noun for the people a specialty page is about. */
function roleFor(specialty: string, locale: AppLocale) {
  return DOCTOR_ROLES[specialty] ?? taxonomyLabel(specialty, locale);
}

export function doctorHubCopy(
  locale: AppLocale,
  query: CatalogQuery,
  facts: DoctorHubFacts,
): HubCopy | undefined {
  if (!servesHub(locale) || !query.specialty) return undefined;
  const specialty = taxonomyLabel(query.specialty, locale);
  const role = roleFor(query.specialty, locale);
  const roleGenitive = genitivePlural(role);
  const place = formatPlace(query, locale);
  const city = query.city ? taxonomyLabel(query.city, locale) : undefined;
  const procedure = query.procedure ? taxonomyLabel(query.procedure, locale) : undefined;

  // The English templates read the bare term; the Arabic ones read the term
  // already bent into the slot. Both sets of names are offered and each
  // template takes the ones its grammar needs.
  const terms = {
    role,
    roleGenitive,
    roleFor: withLam(roleGenitive),
    specialty,
    place,
    ...(city ? { city } : {}),
    ...(procedure
      ? { procedure, procedureFor: withLam(procedure), procedureBa: withBa(procedure) }
      : {}),
  };

  const heading = procedure
    ? t(locale, "hub.doctors.headingProcedure", terms)
    : t(locale, "hub.doctors.headingSpecialty", terms);

  // A page filtered to both a procedure and a city is specific enough that the
  // title needs no qualifier; everything broader says what else is on the page.
  const title =
    procedure && city
      ? t(locale, "hub.doctors.titlePlain", { heading })
      : procedure || city
        ? t(locale, "hub.doctors.titleDoctorsHospitals", { heading })
        : t(locale, "hub.doctors.titleWithExpertise", { heading });

  const count = facts.doctors;
  const counts = {
    count,
    hospitals: facts.hospitals,
    hospitalsCount: countedNoun(facts.hospitals, "hospital"),
    cities: facts.cities,
    citiesCount: countedNoun(facts.cities, "city"),
    records: countedNoun(count, "record"),
  };
  const vars = { ...terms, ...counts };

  const description =
    procedure && city
      ? t(locale, "hub.doctors.descProcedureCity", vars)
      : procedure
        ? t(locale, "hub.doctors.descProcedure", vars)
        : city
          ? t(locale, "hub.doctors.descCity", vars)
          : t(locale, "hub.doctors.descSpecialty", vars);

  const selectionNote = t(locale, "hub.doctors.selectionNote", vars);
  const intro = procedure
    ? [
        t(locale, "hub.doctors.introProcedure", vars),
        t(locale, "hub.doctors.introProcedureCount", vars),
        selectionNote,
      ]
    : city
      ? [
          t(locale, "hub.doctors.introCity", vars),
          t(locale, "hub.doctors.introCityLogistics"),
          t(locale, "hub.doctors.introCityCount", vars),
        ]
      : [
          t(locale, "hub.doctors.introIndia", vars),
          t(locale, "hub.doctors.introIndiaSpan", vars),
          selectionNote,
        ];

  return { eyebrow: t(locale, "hub.doctors.eyebrow"), heading, title, description, intro };
}

export function hospitalHubCopy(
  locale: AppLocale,
  query: CatalogQuery,
  facts: HospitalHubFacts,
): HubCopy | undefined {
  if (!servesHub(locale) || !query.specialty) return undefined;
  const specialty = taxonomyLabel(query.specialty, locale);
  const role = roleFor(query.specialty, locale);
  const roleGenitive = genitivePlural(role);
  const place = formatPlace(query, locale);
  const city = query.city ? taxonomyLabel(query.city, locale) : undefined;
  const procedure = query.procedure ? taxonomyLabel(query.procedure, locale) : undefined;
  const subject = procedure ?? specialty;

  const vars = {
    role,
    roleGenitive,
    specialty,
    place,
    subject,
    subjectFor: withLam(subject),
    ...(city ? { city } : {}),
    ...(procedure
      ? { procedure, procedureFor: withLam(procedure), procedureBa: withBa(procedure) }
      : {}),
    hospitals: facts.hospitals,
    hospitalsValidated: countedNoun(facts.hospitals, "validatedHospital"),
    campuses: countedNoun(facts.hospitals, "campus"),
    doctors: facts.doctors,
    procedures: facts.procedures,
    proceduresCount: countedNoun(facts.procedures, "linkedProcedure"),
  };

  const heading = t(locale, "hub.hospitals.heading", vars);
  const title = procedure
    ? city
      ? t(locale, "hub.hospitals.titleProcedureCity", vars)
      : t(locale, "hub.hospitals.titleProcedure", vars)
    : city
      ? t(locale, "hub.hospitals.titleCity", vars)
      : t(locale, "hub.hospitals.titleSpecialty", vars);

  const description = procedure
    ? t(locale, "hub.hospitals.descProcedure", vars)
    : t(locale, "hub.hospitals.descSpecialty", vars);

  const intro = [
    procedure
      ? t(locale, "hub.hospitals.introProcedure", vars)
      : t(locale, "hub.hospitals.introSpecialty", vars),
    t(locale, "hub.hospitals.introCount", vars),
    t(locale, "hub.hospitals.selectionNote"),
  ];

  return { eyebrow: t(locale, "hub.hospitals.eyebrow"), heading, title, description, intro };
}
