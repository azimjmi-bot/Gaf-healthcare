import "server-only";
import {
  RADIATION_ONCOLOGY_CITY_NOTES_AR,
  RADIATION_ONCOLOGY_CONDITION_LINKS_AR,
  RADIATION_ONCOLOGY_CONSULT_PREP_AR,
  RADIATION_ONCOLOGY_EDUCATIONAL_AR,
  RADIATION_ONCOLOGY_EDITORIAL_AR,
  RADIATION_ONCOLOGY_GUIDE_AR,
  RADIATION_ONCOLOGY_HOW_TO_CHOOSE_AR,
  RADIATION_ONCOLOGY_SELECTION_NOTE_AR,
  RADIATION_ONCOLOGY_SOURCES_AR,
  RADIATION_TECHNIQUE_BLURBS_AR,
  radiationOncologyIndiaFaqsAr,
  radiationOncologySharedCityFaqsAr,
} from "@/data/doctor-pages/radiation-oncology-ar";
import {
  citiesForDestination,
  filterDoctors,
  filterHospitalsForDoctors,
  type CatalogQuery,
} from "@/lib/catalog";
import { costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import {
  applyDoctorListingExtras,
  DOCTOR_PROCEDURE_INDEX_MIN,
  doctorProcedurePath,
  doctorSpecialtyCount,
  type DoctorListingExtras,
} from "@/lib/doctor-discovery";
import type { Doctor } from "@/lib/doctors";
import { paginateDoctors, uniqueDoctorsSorted } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import { countedNoun } from "@/lib/i18n/arabic-grammar";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { getCity, proceduresForSpecialty } from "@/lib/taxonomy";

const SPECIALTY = "Radiation Oncology";
const FEATURED_TECHNIQUES = [
  "External Beam Radiotherapy (EBRT)",
  "Intensity-Modulated Radiotherapy (IMRT)",
  "Image-Guided Radiotherapy (IGRT)",
  "Stereotactic Body Radiotherapy (SBRT)",
  "Stereotactic Radiosurgery (SRS)",
  "Brachytherapy",
  "CyberKnife",
  "Gamma Knife",
  "Proton Beam Therapy",
] as const;

export type ArabicRadiationLink = { name: string; href: string; count?: number; note?: string };

export type ArabicRadiationDirectoryData = {
  heading: string;
  title: string;
  description: string;
  eyebrow: string;
  lede: string;
  logistics?: string;
  hospitalOverview?: string;
  cityPrep?: string;
  path: string;
  indiaHref: string;
  place: string;
  cityName?: string;
  citySlug?: string;
  selectionNote: string;
  quickAnswer: {
    title: string;
    answer: string;
    doctorCount: number;
    cityCount: number;
    hospitalCount: number;
    cities: string[];
    techniques: string[];
    howToChoose: string;
    nextStepLabel: string;
    nextStepHref: string;
    exploreLabel: string;
    exploreHref: string;
  };
  facts: { label: string; value: string }[];
  howToChoose: string[];
  consultPrep: string[];
  educational: { title: string; body: string }[];
  /** Long-form patient guide; India root page only. */
  guide?: typeof RADIATION_ONCOLOGY_GUIDE_AR;
  editorial: typeof RADIATION_ONCOLOGY_EDITORIAL_AR;
  sources: typeof RADIATION_ONCOLOGY_SOURCES_AR;
  uniqueSections: string[];
  sharedSections: string[];
  faqs: { q: string; a: string }[];
  cities: ArabicRadiationLink[];
  hospitalDirectoryHref: string;
  hospitals: { hospital: Hospital; count: number }[];
  procedures: ArabicRadiationLink[];
  conditions: ArabicRadiationLink[];
  costs: ArabicRadiationLink[];
  doctors: Doctor[];
  paging: ReturnType<typeof paginateDoctors>;
  cityChipStats: { total: number; counts: Record<string, number> };
  uniquenessPercent?: number;
};

function arabicList(values: string[]) {
  if (values.length === 0) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} و${values[1]}`;
  return `${values.slice(0, -1).join("، ")} و${values.at(-1)}`;
}

function arabicWords(text: string) {
  return text
    .replace(/[^\u0600-\u06FF\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

export function arabicRadiationUniqueness(uniqueSections: string[], sharedSections: string[]) {
  const unique = uniqueSections.flatMap(arabicWords).length;
  const shared = sharedSections.flatMap(arabicWords).length;
  const total = unique + shared;
  return total === 0 ? 0 : Math.round((unique / total) * 100);
}

export function isArabicRadiationDirectory(query: CatalogQuery) {
  return query.destination === "India" && query.specialty === SPECIALTY && !query.procedure;
}

export function buildArabicRadiationDirectory(
  query: CatalogQuery,
  extras: DoctorListingExtras = {},
  page = 1,
  rows = doctorsForLocale("ar"),
): ArabicRadiationDirectoryData | undefined {
  if (!isArabicRadiationDirectory(query)) return undefined;
  const doctors = uniqueDoctorsSorted(filterDoctors(query, rows));
  const matched = uniqueDoctorsSorted(applyDoctorListingExtras(doctors, extras));
  const paging = paginateDoctors(matched, page);
  const cityAr = query.city ? taxonomyLabel(query.city, "ar") : undefined;
  const place = cityAr ? `${cityAr}، الهند` : "الهند";
  const heading = `أفضل أطباء علاج الأورام بالإشعاع في ${place}`;
  const title = heading;
  const path = doctorsPath(query);
  const indiaHref = doctorsPath({ destination: "India", specialty: SPECIALTY });
  const countryDoctors = uniqueDoctorsSorted(
    filterDoctors({ destination: "India", specialty: SPECIALTY }, rows),
  );
  const cityNames = citiesForDestination("India");
  const cities = cityNames
    .map((name) => {
      const count = countryDoctors.filter((doctor) => doctor.city === name).length;
      return {
        name: taxonomyLabel(name, "ar"),
        href: doctorsPath({ destination: "India", city: name, specialty: SPECIALTY }),
        count,
      };
    })
    .filter((row) => (row.count ?? 0) > 0);

  const hospitals = filterHospitalsForDoctors(
    { destination: "India", city: query.city, specialty: SPECIALTY },
    matched,
    hospitalsForLocale("ar"),
  )
    .map((hospital) => ({
      hospital,
      count: matched.filter((doctor) => doctor.hospitalSlug === hospital.slug).length,
    }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.hospital.name.localeCompare(b.hospital.name, "ar"));

  const procedurePool = proceduresForSpecialty(SPECIALTY).map((row) => row.name);
  const procedures = procedurePool
    .map((name) => {
      const count = doctorSpecialtyCount(SPECIALTY, { city: query.city, procedure: name }, rows);
      return {
        name: taxonomyLabel(name, "ar"),
        href: doctorProcedurePath(SPECIALTY, name, query.city && count >= DOCTOR_PROCEDURE_INDEX_MIN ? query.city : undefined),
        count,
        note: RADIATION_TECHNIQUE_BLURBS_AR[name],
        sourceName: name,
      };
    })
    .filter((row) => (row.count ?? 0) >= (query.city ? 1 : DOCTOR_PROCEDURE_INDEX_MIN));

  const mappedTechniques = FEATURED_TECHNIQUES.filter((name) =>
    matched.some((doctor) => doctor.procedures.includes(name)),
  ).map((name) => taxonomyLabel(name, "ar"));

  const visibleCities = [...new Set(matched.map((doctor) => doctor.city))];
  const cityCount = visibleCities.length;
  const hospitalCount = hospitals.length;
  const doctorCount = paging.total;
  const cityList = arabicList(cities.map((row) => row.name));
  const visibleCityList = arabicList(visibleCities.map((name) => taxonomyLabel(name, "ar")));
  const hospitalList = arabicList(hospitals.slice(0, 8).map((row) => row.hospital.name));
  const techniqueList = mappedTechniques.length
    ? arabicList(mappedTechniques)
    : "";
  const faqFacts = {
    doctorCount,
    cityCount: query.city ? 1 : cityCount,
    hospitalCount,
    cityList: cityList || "المدن التي تحتوي ملفات منشورة",
    hospitalList: hospitalList || "الأحرام المرتبطة بالملفات المنشورة",
    techniqueList: techniqueList || "التقنيات المرتبطة بملفات هذا الدليل فقط",
    place,
  };

  const cityNote = query.city
    ? RADIATION_ONCOLOGY_CITY_NOTES_AR[getCity(query.city)?.slug ?? ""]
    : undefined;

  const hospitalOverview = hospitalCount
    ? `الأحرام المرتبطة بهذه القائمة في ${place}: ${hospitalList}. العدد يعكس الانتساب المسجّل للأطباء المنشورين، لا جرد أجهزة ولا ترتيب جودة.`
    : undefined;
  const cityPrep = cityAr
    ? `قبل السفر إلى ${place} أكّد مع الحرم المسمّى مواعيد المحاكاة وعدد الجلسات المتوقع وترتيبات المتابعة بعد العودة. لا تُحجز تذاكر العودة النهائية قبل أن تصمد الخطة أمام مراجعة السجلات.`
    : undefined;

  const uniqueSections: string[] = [];
  const sharedSections: string[] = [
    RADIATION_ONCOLOGY_SELECTION_NOTE_AR,
    ...RADIATION_ONCOLOGY_HOW_TO_CHOOSE_AR,
    ...RADIATION_ONCOLOGY_CONSULT_PREP_AR,
    ...RADIATION_ONCOLOGY_EDUCATIONAL_AR.map((row) => `${row.title} ${row.body}`),
  ];

  const faqs = cityNote
    ? [...cityNote.localFaq, ...radiationOncologySharedCityFaqsAr(faqFacts)]
    : radiationOncologyIndiaFaqsAr(faqFacts);

  if (cityNote) {
    uniqueSections.push(
      cityNote.intro,
      cityNote.logistics,
      ...cityNote.localFaq.map((row) => `${row.q} ${row.a}`),
    );
    if (hospitalOverview) uniqueSections.push(hospitalOverview);
    if (cityPrep) uniqueSections.push(cityPrep);
    uniqueSections.push(
      `يضم دليل ${place} حاليًا ${countedNoun(doctorCount, "publishedDoctor")} لعلاج الأورام بالإشعاع عبر ${countedNoun(hospitalCount, "campus")}.`,
    );
    if (techniqueList) uniqueSections.push(techniqueList);
    sharedSections.push(...radiationOncologySharedCityFaqsAr(faqFacts).map((row) => `${row.q} ${row.a}`));
  } else {
    uniqueSections.push(
      `يعرض الدليل ${countedNoun(doctorCount, "publishedDoctor")} في ${countedNoun(cityCount, "city")} و${countedNoun(hospitalCount, "hospital")}.`,
      visibleCityList,
    );
    if (hospitalList) uniqueSections.push(hospitalList);
    if (techniqueList) uniqueSections.push(techniqueList);
    sharedSections.push(...radiationOncologyIndiaFaqsAr(faqFacts).map((row) => `${row.q} ${row.a}`));
  }

  const lede = cityNote
    ? `${cityNote.intro} ${RADIATION_ONCOLOGY_SELECTION_NOTE_AR}`
    : `يساعدك دليل أطباء علاج الأورام بالإشعاع في الهند على استكشاف الأطباء والمستشفيات والمدن المتاحة، ومقارنة المؤهلات والخبرات المهنية والتقنيات المرتبطة بكل ملف. يعتمد اختيار الطبيب على نوع السرطان ومرحلته والخطة المقترحة والسجلات المتاحة. ${RADIATION_ONCOLOGY_SELECTION_NOTE_AR}`;

  const description = cityAr
    ? `استكشف أطباء علاج الأورام بالإشعاع في ${cityAr}، الهند. قارن المؤهلات والمستشفيات والتقنيات المرتبطة بالملفات المنشورة، واطلب مساعدة في مراجعة الحالة قبل السفر.`
    : "استكشف أطباء علاج الأورام بالإشعاع في الهند، وقارن المؤهلات والخبرة والمستشفيات والتقنيات العلاجية، واطلب المساعدة في مراجعة حالتك قبل السفر.";

  const emptyAnswer =
    "لا تتوفر حاليًا ملفات منشورة لأطباء علاج الأورام بالإشعاع تطابق عوامل التصفية هذه. راجع دليل الهند أو اطلب مساعدة في مراجعة السجلات.";
  const techniqueClause = techniqueList ? ` التقنيات المرتبطة بالملفات الحالية تشمل ${techniqueList}.` : "";
  const answer = doctorCount === 0
    ? emptyAnswer
    : cityAr
      ? `يعرض دليل ${place} ${countedNoun(doctorCount, "publishedDoctor")} لعلاج الأورام بالإشعاع عبر ${countedNoun(hospitalCount, "campus")}.${techniqueClause} اختيار الطبيب يعتمد على التشخيص والمرحلة والعلاج السابق والتقنية المقترحة وتوصية الفريق المعالج، لا على ترتيب الدليل.`
      : `يساعدك دليل أطباء علاج الأورام بالإشعاع في الهند على استكشاف الأطباء والمستشفيات والمدن المتاحة، ومقارنة المؤهلات والخبرات المهنية والتقنيات العلاجية المرتبطة بكل ملف طبي. يضم الدليل حاليًا ${countedNoun(doctorCount, "publishedDoctor")} في ${countedNoun(cityCount, "city")} و${countedNoun(hospitalCount, "hospital")}، ضمن ${visibleCityList || cityList}.${techniqueClause} يعتمد اختيار الطبيب المناسب على نوع السرطان ومرحلته والخطة العلاجية المقترحة والسجلات الطبية المتاحة. يمكنك استعراض الأطباء حسب المدينة أو المستشفى أو نوع العلاج الإشعاعي، ثم طلب المساعدة في مراجعة الخيارات قبل السفر.`;

  const facts = doctorCount === 0
    ? []
    : [
        { label: "أطباء منشورون", value: String(doctorCount) },
        { label: "مستشفيات ممثلة", value: String(hospitalCount) },
        { label: query.city ? "المدينة" : "مدن فيها ملفات", value: query.city ? place : String(cityCount) },
        { label: "تقنيات مرتبطة", value: String(mappedTechniques.length) },
      ];

  const costs: ArabicRadiationLink[] = [
    {
      name: "تكاليف علاج الأورام بالإشعاع في الهند",
      href: costsFilterPath({ destination: "India", specialty: SPECIALTY }),
    },
  ];
  if (query.city) {
    costs.push({
      name: `دليل التكلفة في ${cityAr}`,
      href: costsFilterPath({ destination: "India", city: query.city, specialty: SPECIALTY }),
    });
  }
  if (cityNote?.existingHub && !costs.some((row) => row.href === cityNote.existingHub)) {
    costs.push({
      name: `سياق العلاج في ${cityAr}`,
      href: cityNote.existingHub,
    });
  }

  return {
    heading,
    title,
    description,
    eyebrow: "دليل الأطباء · علاج الأورام بالإشعاع",
    lede,
    logistics: cityNote?.logistics,
    hospitalOverview,
    cityPrep,
    path,
    indiaHref,
    place,
    cityName: cityAr,
    citySlug: query.city,
    selectionNote: RADIATION_ONCOLOGY_SELECTION_NOTE_AR,
    quickAnswer: {
      title: "إجابة سريعة",
      answer,
      doctorCount,
      cityCount: query.city ? Math.min(1, cityCount) : cityCount,
      hospitalCount,
      cities: (query.city ? visibleCities : cities.map((row) => row.name)).map((name) =>
        query.city ? taxonomyLabel(name, "ar") : name,
      ),
      techniques: mappedTechniques,
      howToChoose:
        "يعتمد الاختيار على التشخيص والمرحلة والعلاج السابق والتقنية المقترحة وخبرة الفريق ذات الصلة وتوصية الأطباء المرخّصين بعد مراجعة السجلات.",
      nextStepLabel: "اطلب المساعدة في مراجعة حالتك الطبية",
      nextStepHref: "#radiation-ro-cta",
      exploreLabel: "استعرض الأطباء المدرجين",
      exploreHref: "#radiation-doctors",
    },
    facts,
    howToChoose: RADIATION_ONCOLOGY_HOW_TO_CHOOSE_AR,
    consultPrep: RADIATION_ONCOLOGY_CONSULT_PREP_AR,
    educational: RADIATION_ONCOLOGY_EDUCATIONAL_AR,
    guide: query.city ? undefined : RADIATION_ONCOLOGY_GUIDE_AR,
    editorial: RADIATION_ONCOLOGY_EDITORIAL_AR,
    sources: RADIATION_ONCOLOGY_SOURCES_AR,
    uniqueSections,
    sharedSections,
    faqs,
    cities,
    hospitalDirectoryHref: hospitalsPath({
      destination: "India",
      city: query.city,
      specialty: SPECIALTY,
    }),
    hospitals,
    procedures: procedures.map(({ sourceName: _sourceName, ...row }) => row),
    conditions: RADIATION_ONCOLOGY_CONDITION_LINKS_AR.map((row) => ({
      ...row,
      note: "سياق المسار على دليل علاج الأورام بالإشعاع، لا ربط تلقائي بين كل طبيب وكل ورم.",
    })),
    costs,
    doctors: paging.items,
    paging,
    cityChipStats: {
      total: countryDoctors.length,
      counts: Object.fromEntries(
        cityNames.map((name) => [name, countryDoctors.filter((doctor) => doctor.city === name).length]),
      ),
    },
    uniquenessPercent: cityNote ? arabicRadiationUniqueness(uniqueSections, sharedSections) : undefined,
  };
}

export function arabicRadiationCityUniquenessReport() {
  return citiesForDestination("India")
    .map((city) => {
      const data = buildArabicRadiationDirectory({
        destination: "India",
        city,
        specialty: SPECIALTY,
      });
      return {
        city,
        href: doctorsPath({ destination: "India", city, specialty: SPECIALTY }),
        percent: data?.uniquenessPercent ?? 0,
        doctors: data?.paging.total ?? 0,
        hospitals: data?.hospitals.length ?? 0,
        uniqueWords: data?.uniqueSections.flatMap(arabicWords).length ?? 0,
        sharedWords: data?.sharedSections.flatMap(arabicWords).length ?? 0,
      };
    })
    .filter((row) => row.doctors > 0);
}

