import type { CatalogQuery } from "@/lib/catalog-options";
import type { AppLocale } from "@/lib/i18n/languages";
import { interpolate, UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

export type DirectoryKind = "doctors" | "hospitals" | "costs";

const DOCTOR_ROLES: Record<string, string> = {
  "Radiation Oncology": "أخصائيو علاج الأورام بالإشعاع",
  "Surgical Oncology": "جرّاحو الأورام",
  "Medical Oncology": "أطباء علاج الأورام الطبي",
  "Pediatric Hematology": "أطباء أمراض دم الأطفال",
  Hematology: "أطباء أمراض الدم",
  "Cardiac Surgery": "جرّاحو القلب",
  "Pediatric Cardiac Surgery": "جرّاحو قلب الأطفال",
  Cardiology: "أطباء القلب",
  "Bariatric Surgery": "جرّاحو السمنة",
  "Cosmetic Surgery": "جرّاحو التجميل",
  ENT: "جرّاحو الأنف والأذن والحنجرة",
  Gastroenterology: "أطباء الجهاز الهضمي",
  "Surgical Gastroenterology": "جرّاحو الجهاز الهضمي",
  Urology: "أطباء المسالك البولية",
  "Spine Surgery": "جرّاحو العمود الفقري",
  Pulmonology: "أطباء الرئة",
  "Pediatric Orthopaedic": "جرّاحو عظام الأطفال",
  Orthopedics: "جرّاحو العظام",
  Ophthalmology: "أطباء العيون",
  Gynecology: "أطباء النساء",
  Neurosurgery: "جرّاحو المخ والأعصاب",
  Neurology: "أطباء الأعصاب",
  Nephrology: "أطباء الكلى",
};

function messagesFor(locale: AppLocale) {
  return uiCatalogFor(locale);
}

function t(locale: AppLocale, key: string, vars?: Record<string, string | number>) {
  const catalog = messagesFor(locale);
  const value = catalog[key] || UI_MESSAGE_FIELDS[key] || key;
  return vars ? interpolate(value, vars) : value;
}

export function formatPlace(query: CatalogQuery, locale: AppLocale) {
  const india = taxonomyLabel("India", locale);
  if (query.city) return t(locale, "dir.placeCity", { city: taxonomyLabel(query.city, locale), country: india });
  return india;
}

export function directoryHome(query: CatalogQuery) {
  return !query.city && !query.specialty && !query.procedure;
}

export function directoryIntro(kind: DirectoryKind, query: CatalogQuery, locale: AppLocale) {
  if (locale !== "ar") return englishIntro(kind, query);

  const place = formatPlace(query, locale);
  const home = directoryHome(query);

  if (kind === "doctors") {
    const heading = home
      ? t(locale, "dir.doctors.homeHeading")
      : query.procedure
        ? t(locale, "dir.doctors.procedureHeading", {
            procedure: taxonomyLabel(query.procedure, locale),
            place,
          })
        : query.specialty
          ? t(locale, "dir.doctors.specialtyHeading", {
              role: DOCTOR_ROLES[query.specialty] || t(locale, "dir.doctors.specialtyFallback", {
                specialty: taxonomyLabel(query.specialty, locale),
              }),
              place,
            })
          : t(locale, "dir.doctors.indiaHeading");
    return {
      eyebrow: t(locale, "dir.doctors.eyebrow"),
      heading,
      lede: home
        ? t(locale, "dir.doctors.homeLede")
        : query.specialty === "Radiation Oncology"
          ? t(locale, "dir.doctors.roLede", { place })
          : t(locale, "dir.doctors.filteredLede"),
    };
  }

  if (kind === "hospitals") {
    const heading = home
      ? t(locale, "dir.hospitals.homeHeading")
      : query.procedure
        ? t(locale, "dir.hospitals.procedureHeading", {
            procedure: taxonomyLabel(query.procedure, locale),
            place,
          })
        : query.specialty
          ? t(locale, "dir.hospitals.specialtyHeading", {
              specialty: taxonomyLabel(query.specialty, locale),
              place,
            })
          : t(locale, "dir.hospitals.indiaHeading");
    return {
      eyebrow: t(locale, "dir.hospitals.eyebrow"),
      heading,
      lede: home ? t(locale, "dir.hospitals.homeLede") : t(locale, "dir.hospitals.filteredLede"),
    };
  }

  const heading = home
    ? t(locale, "dir.costs.homeHeading")
    : query.procedure
      ? t(locale, "dir.costs.procedureHeading", {
          procedure: taxonomyLabel(query.procedure, locale),
          place,
        })
      : query.specialty
        ? t(locale, "dir.costs.specialtyHeading", {
            specialty: taxonomyLabel(query.specialty, locale),
            place,
          })
        : t(locale, "dir.costs.indiaHeading");
  return {
    eyebrow: t(locale, "dir.costs.eyebrow"),
    heading,
    lede: home ? t(locale, "dir.costs.homeLede") : t(locale, "dir.costs.filteredLede"),
  };
}

function englishIntro(kind: DirectoryKind, query: CatalogQuery) {
  const place = query.city ? `${query.city}, India` : "India";
  const home = directoryHome(query);

  if (kind === "doctors") {
    const heading = home
      ? "Find the Right Doctor for Your Treatment"
      : query.procedure
        ? `${query.procedure} specialists in ${place}`
        : query.specialty === "Pediatric Hematology"
          ? `Pediatric hematologists in ${place}`
          : query.specialty === "Hematology"
            ? `Hematologists in ${place}`
            : query.specialty === "Cardiac Surgery"
              ? `Cardiac surgeons in ${place}`
              : query.specialty === "Pediatric Cardiac Surgery"
                ? `Pediatric cardiac surgeons in ${place}`
                : query.specialty === "Cardiology"
                  ? `Cardiologists in ${place}`
                  : query.specialty === "Bariatric Surgery"
                    ? `Bariatric surgeons in ${place}`
                    : query.specialty === "Cosmetic Surgery"
                      ? `Cosmetic surgeons in ${place}`
                      : query.specialty === "ENT"
                        ? `ENT surgeons in ${place}`
                        : query.specialty === "Gastroenterology"
                          ? `Gastroenterologists in ${place}`
                          : query.specialty === "Surgical Gastroenterology"
                            ? `Surgical gastroenterologists in ${place}`
                            : query.specialty === "Urology"
                              ? `Urologists in ${place}`
                              : query.specialty === "Spine Surgery"
                                ? `Spine surgeons in ${place}`
                                : query.specialty === "Pulmonology"
                                  ? `Pulmonologists in ${place}`
                                  : query.specialty === "Pediatric Orthopaedic"
                                    ? `Pediatric orthopaedic surgeons in ${place}`
                                    : query.specialty === "Orthopedics"
                                      ? `Orthopaedic surgeons in ${place}`
                                      : query.specialty === "Ophthalmology"
                                        ? `Ophthalmologists in ${place}`
                                        : query.specialty === "Gynecology"
                                          ? `Gynecologists in ${place}`
                                          : query.specialty === "Neurosurgery"
                                            ? `Neurosurgeons in ${place}`
                                            : query.specialty === "Neurology"
                                              ? `Neurologists in ${place}`
                                              : query.specialty === "Nephrology"
                                                ? `Nephrologists in ${place}`
                                                : query.specialty
                                                  ? `${query.specialty} doctors in ${place}`
                                                  : "Oncologists, ENT surgeons, gastroenterologists, surgical gastroenterologists, urologists, spine surgeons, pulmonologists, paediatric orthopaedic surgeons, orthopaedic surgeons, ophthalmologists, gynecologists, neurosurgeons, neurologists and nephrologists in India";
    return {
      eyebrow: "India · five cities · twenty-three specialties",
      heading,
      lede: home
        ? "Explore specialists by medical specialty, procedure, hospital, and location, and find doctors who match your treatment needs."
        : "Named specialists in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each doctor appears once. Ten profiles per page — filter by city, specialty or procedure when you already know the list you need.",
    };
  }

  if (kind === "hospitals") {
    const heading = home
      ? "Find the Right Hospital for Your Treatment"
      : query.procedure
        ? `Hospitals for ${query.procedure} in ${place}`
        : query.specialty
          ? `${query.specialty} hospitals in ${place}`
          : "Hospitals in India";
    return {
      eyebrow: "India campuses",
      heading,
      lede: home
        ? "Explore hospitals by country, city, specialty, and treatment, and compare facilities to find options that match your medical needs."
        : "JCI and NABH campuses in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each house appears once. Ten campuses per page — specialties sit on the card.",
    };
  }

  const heading = home
    ? "Compare Treatment Costs Before You Travel"
    : query.procedure
      ? `${query.procedure} cost in ${place}`
      : query.specialty
        ? `${query.specialty} cost in ${place}`
        : "Oncology, ENT and GI treatment cost in India";
  return {
    eyebrow: "India planning ranges",
    heading,
    lede: home
      ? "Explore indicative treatment costs by procedure, country, and location, and understand what may be included before choosing where to receive care."
      : "US cash-pay beside partner ranges in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Filter by destination, city, specialty or procedure. Figures are planning ranges, not quotations.",
  };
}

export function directoryEmpty(kind: DirectoryKind, query: CatalogQuery, locale: AppLocale) {
  if (locale !== "ar") {
    if (kind === "doctors") {
      if (query.specialty === "Neurosurgery") {
        return "Named neurosurgeons are being matched. Brain tumour, aneurysm, DBS, paediatric and radiosurgery cost sheets stay live — request a dossier and we will advise.";
      }
      if (query.specialty === "Gynecology") {
        return "Named gynecologists are being matched. Laparoscopic, robotic, vaginal and abdominal hysterectomy, myomectomy, endometriosis and pelvic-floor cost sheets stay live — request a dossier and we will advise.";
      }
      return "No doctors match these filters. Clear a field or request a dossier and we will advise.";
    }
    if (kind === "hospitals") return "No hospitals match these filters.";
    return "No treatment costs match these filters.";
  }

  if (kind === "doctors") {
    if (query.specialty === "Neurosurgery") return t(locale, "dir.doctors.emptyNeuro");
    if (query.specialty === "Gynecology") return t(locale, "dir.doctors.emptyGyn");
    return t(locale, "dir.doctors.empty");
  }
  if (kind === "hospitals") return t(locale, "dir.hospitals.empty");
  return t(locale, "dir.costs.empty");
}

export function resultLabel(kind: DirectoryKind, count: number, locale: AppLocale) {
  const one = kind === "doctors" ? "dir.doctors.resultOne" : kind === "hospitals" ? "dir.hospitals.resultOne" : "dir.costs.resultOne";
  const many = kind === "doctors" ? "dir.doctors.resultMany" : kind === "hospitals" ? "dir.hospitals.resultMany" : "dir.costs.resultMany";
  return t(locale, count === 1 ? one : many);
}
