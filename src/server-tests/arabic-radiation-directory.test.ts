import assert from "node:assert/strict";
import test from "node:test";
import { createElement, Fragment, type ReactNode } from "react";
import { ArabicRadiationSsrDocument } from "@/components/arabic-radiation-ssr";
import {
  isArabicDoctorHtmlPath,
  renderArabicDoctorDirectoryHtml,
  renderArabicRadiationHtml,
  wrapArabicRadiationDocument,
} from "@/lib/i18n/arabic-radiation-html";
import { buildArabicDoctorDirectory } from "@/lib/i18n/arabic-doctor-directory";
import { DOCTOR_FAQS_AR } from "@/lib/i18n/faqs-ar";
import { canonicalFacetPath } from "@/lib/i18n/facet-canonical";
import { INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";
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
  assert.equal(meta.alternates?.canonical, "https://gaf.healthcare/ar/doctors/india/radiation-oncology");
  const languages = meta.alternates?.languages as Record<string, string> | undefined;
  assert.equal(languages?.en, "https://gaf.healthcare/doctors/India/Radiation-Oncology");
  assert.equal(languages?.ar, "https://gaf.healthcare/ar/doctors/india/radiation-oncology");
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
  assert.match(html, /\/ar\/doctors\/india\/delhi-ncr\/radiation-oncology/);
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

test("India RO page carries the long-form patient guide; city pages do not", () => {
  const hub = buildArabicRadiationDirectory(INDIA_QUERY);
  assert.ok(hub?.guide);
  const html = hostMarkup(createElement(ArabicRadiationSsrDocument, { data: hub }));
  assert.match(html, /<h2[^>]*>ملاحظة حول تخصص علاج الأورام بالإشعاع في الهند<\/h2>/);
  assert.equal(hub.guide.sections.length, 7);
  for (const section of hub.guide.sections) {
    assert.ok(html.includes(`>${section.heading}</h3>`), section.heading);
    for (const block of section.blocks) {
      if (typeof block === "string") assert.ok(html.includes(block), block.slice(0, 40));
      else for (const item of block.items) assert.ok(html.includes(item.text), item.text.slice(0, 40));
    }
  }
  assert.match(html, /<li><strong>المعالجة الكثبية \(Brachytherapy\):<\/strong> تعتمد على وضع مصدر إشعاعي/);
  assert.match(html, /<strong>تنبيه طبي:<\/strong> هذه المعلومات مخصصة للتثقيف العام/);
  // The guide sits after the concept list and before the FAQs.
  assert.ok(html.indexOf("مفاهيم يحتاجها المريض الدولي") < html.indexOf('id="radiation-guide"'));
  assert.ok(html.indexOf('id="radiation-guide"') < html.indexOf('id="radiation-faqs"'));

  const city = buildArabicRadiationDirectory({ destination: "India", city: "Delhi NCR", specialty: "Radiation Oncology" });
  assert.ok(city);
  assert.equal(city.guide, undefined);
  const cityHtml = hostMarkup(createElement(ArabicRadiationSsrDocument, { data: city }));
  assert.doesNotMatch(cityHtml, /radiation-guide|ملاحظة حول تخصص/);
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
  assert.match(html, /\/ar\/doctors\/india\/radiation-oncology/);
  assert.match(html, /\/ar\/hospitals\//);
});

test("Arabic doctor HTML route claims every India directory facet and nothing else", () => {
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/India"), true);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/India/Radiation-Oncology"), true);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/India/Delhi-NCR/Radiation-Oncology"), true);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/India/Radiation-Oncology/IMRT"), true);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/India/Medical-Oncology"), true);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/India/Delhi-NCR/Neurosurgery/Brain-Tumor-Surgery"), true);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors"), false);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/compare"), false);
  assert.equal(isArabicDoctorHtmlPath("/ar/doctors/dr-some-profile-slug"), false);
  assert.equal(isArabicDoctorHtmlPath("/doctors/India/Radiation-Oncology"), false);
  assert.equal(isArabicDoctorHtmlPath("/ar/hospitals/India"), false);
});

test("generic Arabic doctor directories render as full HTML documents with H1, cards, pager and FAQs", () => {
  const query = { destination: "India", specialty: "Medical Oncology" };
  const data = buildArabicDoctorDirectory(query);
  assert.ok(data);
  assert.equal(data.meta.path, "/doctors/India/Medical-Oncology");
  assert.equal(data.meta.state, "published");
  const hub = arabicDoctorHub(query, "ar");
  assert.ok(hub);
  assert.equal(data.heading, hub.heading);
  assert.equal(data.title, hub.title);
  assert.equal(data.paging.total, filterDoctors(query, doctorsForLocale("ar")).length);
  assert.equal(data.faqs.length, DOCTOR_FAQS_AR.length);

  const html = renderArabicDoctorDirectoryHtml(query);
  assert.ok(html);
  assert.match(html, /<html lang="ar" dir="rtl">/);
  assert.match(html, /rel="canonical" href="https:\/\/gaf.healthcare\/ar\/doctors\/india\/medical-oncology"/);
  assert.match(html, /hrefLang="en" href="https:\/\/gaf.healthcare\/doctors\/India\/Medical-Oncology"/);
  assert.match(html, /hrefLang="ar" href="https:\/\/gaf.healthcare\/ar\/doctors\/india\/medical-oncology"/);
  assert.doesNotMatch(html, /name="robots"/);
  assert.ok(html.includes(`<h1 class="mt-3 max-w-4xl font-heading text-[2rem] leading-[1.15] sm:text-4xl md:mt-4 md:text-6xl">${hub.heading}</h1>`));
  assert.ok(html.includes(hub.intro[0]));
  assert.ok(html.includes(data.paging.items[0].name));
  assert.match(html, new RegExp(`/ar/doctors/${data.paging.items[0].slug}`));
  assert.match(html, /\/ar\/doctors\/india\/delhi-ncr\/medical-oncology/);
  for (const faq of DOCTOR_FAQS_AR) {
    assert.ok(html.includes(faq.q), faq.q);
    assert.ok(html.includes(faq.a.slice(0, 48)), faq.q);
  }
  assert.match(html, /FAQPage/);
  assert.match(html, /CollectionPage/);
  assert.match(html, /BreadcrumbList/);
  // Entity nodes stay off generic Arabic facets: the Arabic roster is a subset
  // of the English one, so a Person ItemList would break locale entity parity.
  assert.doesNotMatch(html, /"@type":"ItemList"/);
  assert.doesNotMatch(html, /#person/);
  assert.match(html, /wa\.me\/919044346292/);
  assert.equal(html.indexOf("self.__next_f"), -1);
  assert.doesNotMatch(html, /useSearchParams|filter\.destinations/);
  if (data.paging.totalPages > 1) {
    assert.match(html, /href="\/ar\/doctors\/india\/medical-oncology\?page=2"/);
  }
});

test("Arabic doctor HTML renders the requested page rather than page 1", () => {
  const first = renderArabicDoctorDirectoryHtml(INDIA_QUERY, 1);
  const second = renderArabicDoctorDirectoryHtml(INDIA_QUERY, 2);
  assert.ok(first && second);
  assert.notEqual(first, second);
  assert.match(second, /aria-current="page">2</);
  const page2 = buildArabicRadiationDirectory(INDIA_QUERY, {}, 2);
  assert.ok(page2);
  assert.ok(second.includes(page2.paging.items[0].name));
  assert.ok(!first.includes(`/ar/doctors/${page2.paging.items[0].slug}"`));
});

test("Arabic doctor HTML follows the publication gate: missing facets 404, noindex facets carry robots", () => {
  assert.equal(
    renderArabicDoctorDirectoryHtml({ destination: "India", specialty: "Radiation Oncology", procedure: "Nonexistent" }),
    undefined,
  );
  assert.equal(buildArabicDoctorDirectory({ city: "Delhi NCR" }), undefined);
  const rows = doctorsForLocale("ar");
  const noindexQuery = SPECIALTIES.map((s) => s.name)
    .flatMap((specialty) => [
      { destination: "India", specialty },
      ...INDIA_CITIES.map((city) => ({ destination: "India", city, specialty })),
    ])
    .find((q) => localePageState("ar", doctorsPath(q)) === "noindex" && filterDoctors(q, rows).length > 0);
  if (noindexQuery) {
    const html = renderArabicDoctorDirectoryHtml(noindexQuery);
    assert.ok(html, doctorsPath(noindexQuery));
    assert.match(html, /<meta name="robots" content="noindex, follow"\/>/);
    assert.doesNotMatch(html, /hreflang=/i);
    assert.doesNotMatch(html, /FAQPage/);
    assert.match(html, /<h1[^>]*>[^<]+<\/h1>/);
  }
  const duplicate = SPECIALTIES.map((s) => s.name)
    .flatMap((specialty) => INDIA_CITIES.map((city) => ({ destination: "India", city, specialty })))
    .find((q) => {
      const path = doctorsPath(q);
      return localePageState("ar", path) === "published" && canonicalFacetPath(path, "ar") !== path;
    });
  if (duplicate) {
    const html = renderArabicDoctorDirectoryHtml(duplicate);
    assert.ok(html);
    const canonical = canonicalFacetPath(doctorsPath(duplicate), "ar");
    assert.ok(html.includes(`rel="canonical" href="https://gaf.healthcare/ar${canonical}"`));
    assert.doesNotMatch(html, /hreflang=/i);
  }
});

test("Arabic RO HTML document has canonical, hreflang, H1, Quick Answer and 18 FAQs", () => {
  const hub = buildArabicRadiationDirectory(INDIA_QUERY);
  assert.ok(hub);
  const body = hostMarkup(createElement(ArabicRadiationSsrDocument, { data: hub }));
  const html = wrapArabicRadiationDocument(hub, body);
  assert.match(html, /<html lang="ar" dir="rtl">/);
  assert.match(html, /rel="canonical" href="https:\/\/gaf.healthcare\/ar\/doctors\/india\/radiation-oncology"/);
  assert.match(html, /hrefLang="en" href="https:\/\/gaf.healthcare\/doctors\/India\/Radiation-Oncology"/);
  assert.match(html, /<h1[^>]*>أفضل أطباء علاج الأورام بالإشعاع في الهند<\/h1>/);
  assert.match(html, /إجابة سريعة/);
  assert.equal(hub.faqs.length, 18);
  assert.ok(html.includes(hub.faqs[0].q));
  assert.ok(html.includes(hub.faqs[17].q));
  assert.doesNotMatch(html, /BDS|home-videogrid/);
  const served = renderArabicRadiationHtml(INDIA_QUERY);
  assert.ok(served);
  assert.match(served, /<html lang="ar" dir="rtl">/);
  assert.ok(served.includes(hub.faqs[0].a.slice(0, 40)));
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
