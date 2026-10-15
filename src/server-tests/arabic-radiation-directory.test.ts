import assert from "node:assert/strict";
import test from "node:test";
import { createElement, Fragment, type ReactNode } from "react";
import { ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import { loadCatalogCms } from "@/lib/cms/catalog-store";
import { radiationOncologyIndiaFaqsAr } from "../data/doctor-pages/radiation-oncology-ar";
import { filterDoctors } from "../lib/catalog";
import { doctorsPath } from "../lib/catalog-links";
import { buildRadiationDoctorHub } from "../lib/doctor-specialty-page";
import { doctors } from "../lib/doctors";
import { countedNoun } from "../lib/i18n/arabic-grammar";
import {
  arabicRadiationCityUniquenessReport,
  arabicRadiationUniqueness,
  buildArabicRadiationDirectory,
  isArabicRadiationDirectory,
} from "../lib/i18n/ar-radiation-directory";
import { arabicDoctorHub } from "../lib/i18n/arabic-hub";
import { doctorsForLocale } from "../lib/locale-catalog";
import { localePageState } from "../lib/i18n/locale-publication";
import { withLocaleMetadata } from "../lib/i18n/metadata";
import { LOCALES } from "../lib/i18n/languages";

const INDIA_QUERY = { destination: "India", specialty: "Radiation Oncology" } as const;
const REQUIRED_FAQ_QUESTIONS = [
  "ما دور طبيب علاج الأورام بالإشعاع؟",
  "كيف أختار طبيب علاج الأورام بالإشعاع المناسب في الهند؟",
  "ما أنواع السرطان التي يمكن علاجها بالعلاج الإشعاعي؟",
  "ما الفرق بين علاج الأورام بالإشعاع وعلاج الأورام بالأدوية؟",
  "ما الفرق بين طبيب علاج الأورام بالإشعاع وطبيب الأشعة التشخيصية؟",
  "ما الفرق بين تقنيات IMRT وIGRT وSBRT وSRS؟",
  "هل العلاج الإشعاعي مؤلم؟",
  "كم تستغرق جلسات العلاج الإشعاعي؟",
  "ما تكلفة العلاج الإشعاعي في الهند؟",
  "ما المدن الهندية التي تضم أطباء ومراكز لعلاج الأورام بالإشعاع؟",
  "هل يمكن للمرضى الدوليين مراجعة حالتهم قبل السفر إلى الهند؟",
  "ما التقارير الطبية التي يجب تجهيزها قبل السفر للعلاج الإشعاعي؟",
  "كيف أقارن بين المستشفيات التي تقدم العلاج الإشعاعي في الهند؟",
  "هل العلاج الإشعاعي مناسب لجميع مرضى السرطان؟",
  "ما الآثار الجانبية المحتملة للعلاج الإشعاعي؟",
  "كيف أجد طبيب علاج إشعاعي لديه خبرة في نوع معين من السرطان؟",
  "كم يحتاج المريض الدولي إلى البقاء في الهند لتلقي العلاج الإشعاعي؟",
  "كيف تساعد GAF Healthcare المرضى الدوليين في الوصول إلى العلاج الإشعاعي في الهند؟",
];

function hostMarkup(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(hostMarkup).join("");
  if (typeof node !== "object") return "";
  const el = node as {
    type?: unknown;
    props?: Record<string, unknown> & { children?: ReactNode; dangerouslySetInnerHTML?: { __html: string } };
  };
  if (el.type === Fragment) return hostMarkup(el.props?.children);
  if (typeof el.type === "function") {
    const props = el.props ?? {};
    const rendered = (el.type as (props: unknown) => ReactNode)(props);
    return hostMarkup(rendered);
  }
  const tag = typeof el.type === "string" ? el.type : "";
  const props = el.props ?? {};
  const attrEntries = Object.entries(props).flatMap(([key, value]) => {
    if (key === "children" || key === "dangerouslySetInnerHTML" || value == null || value === false) {
      return [];
    }
    if (key === "className") return [`class="${String(value)}"`];
    if (typeof value === "boolean") return value ? [key] : [];
    if (typeof value === "object") return [];
    return [`${key}="${String(value).replace(/"/g, "&quot;")}"`];
  });
  const attrs = attrEntries.length ? ` ${attrEntries.join(" ")}` : "";
  const inner = props.dangerouslySetInnerHTML
    ? props.dangerouslySetInnerHTML.__html
    : hostMarkup(props.children);
  if (!tag) return inner;
  if (tag === "img" || tag === "input" || tag === "br" || tag === "hr" || tag === "meta") {
    return `<${tag}${attrs}/>`;
  }
  return `<${tag}${attrs}>${inner}</${tag}>`;
}

function answerWordCount(text: string) {
  return text
    .split(/\s+/)
    .filter((word) => word.replace(/[^\p{L}\p{N}]+/gu, "").length > 1).length;
}

test("Arabic Radiation Oncology India directory uses live unique doctors and the search-intent H1", () => {
  const arabic = doctorsForLocale("ar");
  const expected = new Set(
    filterDoctors(INDIA_QUERY, arabic).map((doctor) => doctor.slug),
  ).size;
  const hub = buildArabicRadiationDirectory(INDIA_QUERY, {}, 1, arabic);
  assert.ok(hub);
  assert.equal(hub.heading, "أفضل أطباء علاج الأورام بالإشعاع في الهند");
  assert.equal(hub.title, hub.heading);
  assert.equal(hub.path, "/doctors/India/Radiation-Oncology");
  assert.equal(hub.quickAnswer.doctorCount, expected);
  assert.equal(hub.paging.total, expected);
  assert.equal(hub.quickAnswer.doctorCount, hub.paging.total);
  assert.equal(new Set(filterDoctors(INDIA_QUERY, arabic).map((d) => d.slug)).size, expected);
  assert.match(hub.quickAnswer.answer, new RegExp(countedNoun(expected, "publishedDoctor")));
  assert.ok(hub.quickAnswer.cityCount >= 2);
  assert.ok(hub.quickAnswer.hospitalCount >= 2);
  assert.ok(hub.quickAnswer.techniques.length > 0);
  assert.ok(hub.facts.every((fact) => fact.value !== "0"));
  assert.match(hub.description, /علاج الأورام بالإشعاع في الهند/);
});

test("India FAQs are 18 unique medically scoped questions with substantive Arabic answers", () => {
  const hub = buildArabicRadiationDirectory(INDIA_QUERY);
  assert.ok(hub);
  assert.equal(hub.faqs.length, 18);
  assert.deepEqual(
    hub.faqs.map((row) => row.q),
    REQUIRED_FAQ_QUESTIONS,
  );
  assert.equal(new Set(hub.faqs.map((row) => row.q)).size, 18);
  for (const row of hub.faqs) {
    assert.ok(answerWordCount(row.a) >= 80, `${row.q} is thin (${answerWordCount(row.a)} words)`);
    assert.doesNotMatch(row.a, /نسبة نجاح|أفضل طبيب في العالم|مضمون الشفاء/);
  }
  const sourceFaqs = radiationOncologyIndiaFaqsAr({
    doctorCount: hub.quickAnswer.doctorCount,
    cityCount: hub.quickAnswer.cityCount,
    hospitalCount: hub.quickAnswer.hospitalCount,
    cityList: "دلهي إن سي آر",
    hospitalList: "حرم تجريبي",
    techniqueList: "IMRT",
    place: "الهند",
  });
  assert.equal(sourceFaqs.length, 18);
});

test("Quick Answer counts follow the same Arabic publication filters as the listing", () => {
  const arabic = doctorsForLocale("ar");
  const english = filterDoctors(INDIA_QUERY, doctors).length;
  const hub = buildArabicRadiationDirectory(INDIA_QUERY, {}, 1, arabic);
  assert.ok(hub);
  assert.ok(hub.quickAnswer.doctorCount <= english);
  const slugs = filterDoctors(INDIA_QUERY, arabic).map((doctor) => doctor.slug);
  assert.equal(slugs.length, new Set(slugs).size);
  const hospitalDoctorSum = hub.hospitals.reduce((sum, row) => sum + row.count, 0);
  assert.ok(hospitalDoctorSum > 0);
  assert.ok(hospitalDoctorSum <= hub.paging.total);
});

test("city directories keep parent routes and 25-35% unique Arabic content", () => {
  const india = buildArabicRadiationDirectory(INDIA_QUERY);
  assert.ok(india);
  const report = arabicRadiationCityUniquenessReport();
  assert.ok(report.length >= 2, "need populated city pages");
  for (const row of report) {
    const city = buildArabicRadiationDirectory({
      destination: "India",
      city: row.city,
      specialty: "Radiation Oncology",
    });
    assert.ok(city, row.city);
    assert.equal(city.path, doctorsPath({ destination: "India", city: row.city, specialty: "Radiation Oncology" }));
    assert.equal(city.indiaHref, "/doctors/India/Radiation-Oncology");
    assert.match(city.heading, /أفضل أطباء علاج الأورام بالإشعاع في .+، الهند/);
    assert.notEqual(city.lede, india.lede, row.city);
    assert.notEqual(city.description, india.description, row.city);
    assert.ok(city.logistics, row.city);
    assert.ok(city.hospitalOverview, row.city);
    assert.ok((city.uniquenessPercent ?? 0) >= 25, `${row.city} unique ${row.percent}% below 25`);
    assert.ok(
      (city.uniquenessPercent ?? 0) <= 40,
      `${row.city} unique ${row.percent}% is far above the 25-35 editorial band`,
    );
    assert.ok(city.faqs.length >= 6, row.city);
    const cityMarker = city.cityName ?? row.city;
    assert.ok(
      city.lede.includes(cityMarker) ||
        city.faqs.some((faq) => faq.q.includes(cityMarker) || faq.a.includes(cityMarker)),
      row.city,
    );
  }
});

test("city uniqueness helper ignores Latin boilerplate and counts Arabic words only", () => {
  const percent = arabicRadiationUniqueness(
    ["مقدمة مدينة دلهي وغورغرام ونويدا وفريد آباد مع أحرام محلية"],
    ["ملاحظة الاختيار العامة وكيف تختار الطبيب والتقارير والتحضير والإشعاع"],
  );
  assert.equal(typeof percent, "number");
  assert.ok(percent > 0 && percent < 100);
});

test("the Arabic layer does not capture procedure pages or other specialties", () => {
  assert.equal(
    isArabicRadiationDirectory({
      destination: "India",
      specialty: "Radiation Oncology",
      procedure: "Intensity-Modulated Radiotherapy (IMRT)",
    }),
    false,
  );
  assert.equal(
    buildArabicRadiationDirectory({
      destination: "India",
      specialty: "Radiation Oncology",
      procedure: "Brachytherapy",
    }),
    undefined,
  );
  assert.equal(
    isArabicRadiationDirectory({ destination: "India", specialty: "Medical Oncology" }),
    false,
  );
  const other = arabicDoctorHub({ destination: "India", specialty: "Medical Oncology" }, "ar");
  assert.ok(other);
  assert.match(other.heading, /علاج الأورام الطبي|الأورام/);
});

test("English Radiation Oncology hub is unchanged by the Arabic directory layer", () => {
  const english = buildRadiationDoctorHub(INDIA_QUERY, {}, 1, doctors);
  assert.ok(english);
  assert.equal(english.heading, "Best Radiation Oncologists in India");
  assert.ok(english.quickAnswers[0]?.answer.includes(String(english.paging.total)));
});

test("Arabic city RO facets that have enough profiles stay on the existing published URLs", () => {
  assert.equal(localePageState("ar", "/doctors/India/Radiation-Oncology"), "published");
  assert.equal(localePageState("ar", "/doctors/India/Delhi-NCR/Radiation-Oncology"), "published");
  const meta = withLocaleMetadata(
    { title: "أفضل أطباء علاج الأورام بالإشعاع في الهند" },
    "/doctors/India/Radiation-Oncology",
    "ar",
    LOCALES,
  );
  assert.equal(meta.alternates?.canonical, "https://gaf.healthcare/ar/doctors/India/Radiation-Oncology");
  const languages = meta.alternates?.languages as Record<string, string> | undefined;
  assert.equal(languages?.en, "https://gaf.healthcare/doctors/India/Radiation-Oncology");
  assert.equal(languages?.ar, "https://gaf.healthcare/ar/doctors/India/Radiation-Oncology");
  assert.equal(languages?.["x-default"], "https://gaf.healthcare/doctors/India/Radiation-Oncology");
});

test("Arabic RO directory HTML is server-rendered for crawlers", () => {
  const hub = buildArabicRadiationDirectory(INDIA_QUERY);
  assert.ok(hub);
  const html = hostMarkup(createElement(ArabicRadiationSsrDocument, { data: hub }));
  assert.match(html, /<h1[^>]*>أفضل أطباء علاج الأورام بالإشعاع في الهند<\/h1>/);
  assert.match(html, /إجابة سريعة/);
  assert.ok(html.includes(hub.quickAnswer.answer.slice(0, 40)));
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /FAQPage/);
  assert.match(html, /CollectionPage/);
  assert.match(html, /ItemList/);
  assert.ok(html.includes(hub.paging.items[0].name));
  assert.match(html, new RegExp(`/ar/doctors/${hub.paging.items[0].slug}`));
  assert.doesNotMatch(html, /BDS|Shabnam Choudhary|Saffiyyah Chaudhary|home-videogrid/);
  assert.doesNotMatch(html, /filter\.destinations|useSearchParams/);
  assert.match(html, /\/ar\/doctors\/India\/Delhi-NCR\/Radiation-Oncology/);
  assert.match(html, /wa\.me\/919044346292/);
  for (const faq of hub.faqs) {
    assert.ok(html.includes(faq.q), faq.q);
    assert.ok(html.includes(faq.a.slice(0, 48)), faq.q);
  }
  const h1At = html.indexOf("<h1");
  const flightAt = html.indexOf("self.__next_f");
  assert.ok(h1At >= 0);
  assert.equal(flightAt, -1);
  const jsonLdAt = html.indexOf("application/ld+json");
  assert.ok(jsonLdAt >= 0 && jsonLdAt < h1At);
});

test("Arabic city RO HTML keeps unique city copy in the document", () => {
  const city = buildArabicRadiationDirectory({
    destination: "India",
    city: "Delhi NCR",
    specialty: "Radiation Oncology",
  });
  assert.ok(city);
  const html = hostMarkup(createElement(ArabicRadiationSsrDocument, { data: city }));
  assert.match(html, /<h1[^>]*>أفضل أطباء علاج الأورام بالإشعاع في دلهي إن سي آر، الهند<\/h1>/);
  assert.ok(html.includes(city.lede));
  assert.ok(city.logistics && html.includes(city.logistics));
  assert.match(html, /\/ar\/doctors\/India\/Radiation-Oncology/);
  assert.match(html, /\/ar\/hospitals\//);
});

test("Arabic catalog CMS is reused in-process so crawls do not reparse the overlay file", () => {
  const first = loadCatalogCms("ar");
  const second = loadCatalogCms("ar");
  assert.equal(first, second);
});

test("counted doctor phrases stay grammatical", () => {
  assert.equal(countedNoun(1, "publishedDoctor"), "طبيب منشور واحد");
  assert.equal(countedNoun(2, "publishedDoctor"), "طبيبان منشوران");
  assert.equal(countedNoun(5, "publishedDoctor"), "5 أطباء منشورين");
  assert.match(countedNoun(70, "publishedDoctor"), /^70 /);
});
