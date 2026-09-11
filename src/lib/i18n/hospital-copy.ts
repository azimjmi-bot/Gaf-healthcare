import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import {
  bedsLabel,
  cityTravel,
  featureBar,
  hospitalFaqs,
  infrastructure,
  internationalServices,
  isEyeCampus,
  peopleNoun,
  pullQuote,
  specialtyBlurb,
  whyChoose,
  type FacultyGroup,
} from "@/lib/hospital-profile";
import type { AppLocale } from "@/lib/i18n/languages";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

const EASTERN = "٠١٢٣٤٥٦٧٨٩";
const toEastern = (n: string | number) => String(n).replace(/\d/g, (d) => EASTERN[Number(d)]);

const PEOPLE_AR: Record<string, { one: string; many: string }> = {
  "radiation-oncology": { one: "أخصائي علاج الأورام بالإشعاع", many: "أخصائيو علاج الأورام بالإشعاع" },
  "surgical-oncology": { one: "جرّاح أورام", many: "جرّاحو الأورام" },
  "medical-oncology": { one: "طبيب علاج الأورام الطبي", many: "أطباء علاج الأورام الطبي" },
  hematology: { one: "طبيب أمراض دم", many: "أطباء أمراض الدم" },
  "pediatric-hematology": { one: "طبيب أمراض دم الأطفال", many: "أطباء أمراض دم الأطفال" },
  "cardiac-surgery": { one: "جرّاح قلب", many: "جرّاحو القلب" },
  "pediatric-cardiac-surgery": { one: "جرّاح قلب أطفال", many: "جرّاحو قلب الأطفال" },
  cardiology: { one: "طبيب قلب", many: "أطباء القلب" },
  "bariatric-surgery": { one: "جرّاح سمنة", many: "جرّاحو السمنة" },
  "cosmetic-surgery": { one: "جرّاح تجميل", many: "جرّاحو التجميل" },
  ent: { one: "جرّاح أنف وأذن وحنجرة", many: "جرّاحو الأنف والأذن والحنجرة" },
  gastroenterology: { one: "طبيب جهاز هضمي", many: "أطباء الجهاز الهضمي" },
  "surgical-gastroenterology": { one: "جرّاح جهاز هضمي", many: "جرّاحو الجهاز الهضمي" },
  urology: { one: "طبيب مسالك", many: "أطباء المسالك البولية" },
  "spine-surgery": { one: "جرّاح عمود فقري", many: "جرّاحو العمود الفقري" },
  pulmonology: { one: "طبيب رئة", many: "أطباء الرئة" },
  "pediatric-orthopaedic": { one: "جرّاح عظام أطفال", many: "جرّاحو عظام الأطفال" },
  orthopedics: { one: "جرّاح عظام", many: "جرّاحو العظام" },
  ophthalmology: { one: "طبيب عيون", many: "أطباء العيون" },
  gynecology: { one: "طبيب نساء", many: "أطباء النساء" },
  neurosurgery: { one: "جرّاح مخ وأعصاب", many: "جرّاحو المخ والأعصاب" },
  neurology: { one: "طبيب أعصاب", many: "أطباء الأعصاب" },
  nephrology: { one: "طبيب كلى", many: "أطباء الكلى" },
};

const BLURB_AR: Record<string, string> = {
  "radiation-oncology": "إشعاع يُخطَّط حول الورم الموجود فعلًا — لا آلة تبحث عن عمل.",
  "surgical-oncology": "جراحة سرطان عندما يكون القطع الخطوة الصادقة، مع الترميم على القائمة نفسها.",
  "medical-oncology": "علاج جهازي — كيميائي وموجّه ومناعي — باسم البروتوكول لا باسم الكتيّب.",
  hematology: "سرطانات الدم والنخاع، بما فيها الزراعة عندما يكون الاستطباب حقيقيًا.",
  "pediatric-hematology": "قوائم دم ونخاع الأطفال، لدى استشاريين يعالجون الأطفال كل أسبوع.",
  "cardiac-surgery": "تجاوز وصمامات والعمليات التي تنتمي لغرفة قلب لا لقسطرة.",
  "pediatric-cardiac-surgery": "جراحة قلب خلقية للأطفال، مع عناية مركزة تعرف تلك الليالي.",
  cardiology: "قسطرة وصمامات من الفخذ وكهرباء القلب — عندما يحتاج القلب قسطرة لا منشارًا.",
  "bariatric-surgery": "جراحة استقلابية بعد أن أخذ النظام الغذائي فرصته وما زال مؤشر الكتلة على القائمة.",
  "cosmetic-surgery": "ترميم واختيار جمالي مع جرّاح تلتقونه على الكاميرا أولًا.",
  ent: "أذن وأنف وحنجرة وقاعدة جمجمة، بما فيها زراعة القوقعة عندما يكون السمع هو الملف.",
  gastroenterology: "منظار وERCP وقائمة الجهاز الهضمي الطبية — كاميرا قبل السكين كلما صدق ذلك.",
  "surgical-gastroenterology": "كبد وبنكرياس وجهاز هضمي جراحي، بما فيها الزراعة عندما يستطيع الحرم تسعيرها.",
  urology: "كلى وبروستاتا وحصى — بما فيها الزراعة المشتركة مع طابق أمراض الكلى.",
  "spine-surgery": "دمج وأقراص وتشوه عندما تكون المشكلة في العمود الفقري لا في بقية العظام.",
  pulmonology: "رئة ومجارٍ وEBUS — نسيج عندما لا يعود التصوير كافيًا.",
  "pediatric-orthopaedic": "عظام ومفاصل الأطفال: حنف القدم، الوركين، صفائح النمو — لا قوائم استبدال البالغين.",
  orthopedics: "ركب ووركين وأربطة ورضوح — الاستبدال عندما ينتهي المفصل لا لأنه شائع.",
  ophthalmology: "ساد وقرنية وشبكية وتصحيح نظر على طابق لا يعمل إلا العيون.",
  gynecology: "رحم ومبايض وبطانة هاجرة — بالمنظار عندما يسمح الحوض.",
  neurosurgery: "دماغ وعمود فقري وجراحة إشعاعية مع جرّاح مسمّى على نموذج الموافقة.",
  neurology: "سكتة وصرع وحركة — دواء وأجهزة قبل فتح الجمجمة كلما صدق ذلك.",
  nephrology: "ديال وخزعة وطب زراعة، مشترك مع المسالك عندما تتبدل كلية.",
};

function joinAr(items: string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} و${items[1]}`;
  return `${items.slice(0, -1).join("، ")} و${items[items.length - 1]}`;
}

export function bedsLabelLocalized(beds: string, locale: AppLocale) {
  const label = bedsLabel(beds);
  if (locale !== "ar" || !label) return label;
  const n = parseInt(beds.replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(n) || n <= 0) return beds;
  return `${toEastern(n)}+ سرير`;
}

export function heroLedeLocalized(hospital: Hospital, locale: AppLocale) {
  if (locale !== "ar") return heroLedeForEn(hospital);
  const city = taxonomyLabel(hospital.city, "ar");
  const beds = bedsLabelLocalized(hospital.beds, "ar");
  const year = hospital.established ? ` افتُتح عام ${toEastern(hospital.established)}.` : "";
  if (isEyeCampus(hospital)) {
    return `${hospital.name} مستشفى عيون في ${city}، الهند${beds ? ` — ${beds}` : ""}.${year} تصل العائلات إلى هنا لعمل الساد والقرنية والشبكية مع طبيب عيون مسمّى، لا لجناح عام يملك مصباحًا شقيًا.`;
  }
  return `${hospital.name} حرم متعدد التخصصات في ${city}، الهند${beds ? ` بسعة ${beds}` : ""}.${year} المنسّقون هنا يعرفون كيف يمسكون إقامة دولية — من مكالمة الفيديو الأولى حتى الأسبوع بعد العودة.`;
}

function heroLedeForEn(hospital: Hospital) {
  const beds = bedsLabel(hospital.beds);
  const year = hospital.established ? ` Opened in ${hospital.established}.` : "";
  if (isEyeCampus(hospital)) {
    return `${hospital.name} is an eye hospital in ${hospital.city}, India${beds ? ` — ${beds.toLowerCase()}` : ""}.${year} Families land here for cataract, cornea and retina work with a named ophthalmologist, not a general ward that happens to own a slit lamp.`;
  }
  return `${hospital.name} is a multi-speciality campus in ${hospital.city}, India${beds ? ` with ${beds.toLowerCase()}` : ""}.${year} Coordinators here already know how to hold an international stay — from the first video consult through the week after you fly home.`;
}

export function pullQuoteLocalized(hospital: Hospital, locale: AppLocale) {
  if (locale !== "ar") return pullQuote(hospital);
  if (isEyeCampus(hospital)) return "بصر يُستعاد بخطة يمكن قراءتها فعلًا.";
  if (hospital.slug.includes("proton")) return "بروتون عندما يكون ذروة براغ هي الحجة — وفوتون عندما لا تكون.";
  if (hospital.slug.includes("athenaa") || hospital.name.toLowerCase().includes("women")) {
    return "أورام النساء على طابق بُني لهذه القائمة وحدها.";
  }
  return "رعاية متقدمة ما زالت تترك مكانًا لتعافٍ أهدأ.";
}

export function whyChooseLocalized(hospital: Hospital, facultyCount: number, locale: AppLocale) {
  if (locale !== "ar") return whyChoose(hospital, facultyCount);
  const eye = isEyeCampus(hospital);
  const city = taxonomyLabel(hospital.city, "ar");
  return [
    {
      title: eye ? "أطباء عيون بأسمائهم" : "استشاريون بأسمائهم",
      body: facultyCount
        ? `${toEastern(facultyCount)} ${facultyCount === 1 ? "طبيب مدرج" : "طبيبًا مدرجًا"} يمكنكم لقاؤهم على الكاميرا قبل حجز التذكرة.`
        : "نطابق استشاريًا مسمّى بعد السجلات — لا قائمة مناوبة بلا اسم.",
    },
    {
      title: "اعتماد يمكن التحقق منه",
      body: `${hospital.accreditation} على الملف. لا نخترع لوحة لتزيين ممر.`,
    },
    {
      title: eye ? "غرف عمليات عيون" : "عناية مركزة وغرف عمليات",
      body: eye
        ? "غرف عمليات عيون وتعافٍ يخصّان العين، لا فترة مستعارة من غرفة عامة."
        : `${hospital.icu} مع غرف العمليات التي تشغّل التخصصات المدرجة أصلًا.`,
    },
    {
      title: "لغات الجناح",
      body: `${hospital.languages}. يبقى المنسّق بالإنجليزية حتى عندما يكون حديث السرير محليًا.`,
    },
    {
      title: "مكتب دولي",
      body: `خطابات تأشيرة واستقبال من ${city} وسرير مرافق أمور عادية هنا — لا معروفًا خاصًا.`,
    },
    {
      title: "الفيديو أولًا",
      body: "لا عربون قبل الحديث مع الاستشاري. إن لم يكن التطابق صادقًا نعيد المطابقة.",
    },
  ];
}

export function featureBarLocalized(hospital: Hospital, locale: AppLocale) {
  if (locale !== "ar") return featureBar(hospital);
  const eye = isEyeCampus(hospital);
  const city = taxonomyLabel(hospital.city, "ar");
  return [
    { label: eye ? "رعاية عيون عاجلة" : "طوارئ على مدار الساعة" },
    { label: eye ? "غرف عمليات عيون مخصّصة" : "عناية مركزة وغرف عمليات متقدمة" },
    { label: "مكتب المرضى الدوليين" },
    { label: eye ? "مستشفى عيون" : "حرم متعدد التخصصات" },
    { label: `على خريطة ${city}` },
  ];
}

export function specialtyBlurbLocalized(slug: string, locale: AppLocale) {
  if (locale !== "ar") return specialtyBlurb(slug);
  return BLURB_AR[slug] ?? "قائمة مسمّاة لهذا القسم، تُطابق بعد السجلات — لا طاحونة بلا موعد.";
}

export function peopleNounLocalized(slug: string, count: number, locale: AppLocale) {
  if (locale !== "ar") return peopleNoun(slug, count);
  const row = PEOPLE_AR[slug];
  if (!row) return count === 1 ? "أخصائي" : "أخصائيين";
  return count === 1 ? row.one : row.many;
}

export function facultyHeadingLocalized(slug: string, count: number, locale: AppLocale) {
  const noun = peopleNounLocalized(slug, count, locale);
  if (locale === "ar") return noun;
  return noun.charAt(0).toUpperCase() + noun.slice(1);
}

export function fromUsdLocalized(partnerRange: string, locale: AppLocale) {
  const m = partnerRange.match(/\$[\d,]+/);
  if (locale !== "ar") {
    if (!m) return `India planning range ${partnerRange}`;
    return `From USD ${m[0].replace("$", "")}`;
  }
  if (!m) return `نطاق تخطيط الهند ${partnerRange}`;
  return `من ${m[0].replace("$", "")} دولار`;
}

export function infrastructureLocalized(hospital: Hospital, locale: AppLocale) {
  if (locale !== "ar") return infrastructure(hospital);
  if (isEyeCampus(hospital)) {
    return [
      { title: "غرف فاكو", body: "قوائم ساد تعمل طوال الأسبوع، لا فترة مستعارة." },
      { title: "جناح القرنية", body: "زراعة وسطح بعين إيقاع تعافٍ خاص." },
      { title: "ليزر الشبكية", body: "شبكية طبية وجراحية دون إرسالكم عبر المدينة." },
      { title: "التشخيص", body: "OCT وحقول وبصريات على الطابق نفسه مع الاستشارة." },
      { title: "تعافي نهاري", body: "معظم القوائم تعود في اليوم نفسه عندما تسمح العين." },
      { title: "مسار الأطفال", body: "عيون الأطفال يراها من يعمل ذلك أصلًا." },
      { title: "التعقيم", body: "تدفق أدوات يخص طب العيون." },
      { title: "غرف المشورة", body: "مكان هادئ لاختيارات العدسة قبل أي توسيع." },
    ];
  }
  return [
    { title: "غرف عمليات معيارية", body: "قوائم تمزج الأورام والقلب والجهاز الهضمي والمفاصل دون فوضى." },
    { title: "عناية مركزة متقدمة", body: hospital.icu },
    { title: "قدرة هجينة / قسطرة", body: "عندما تنتمي الحالة لغرفة هجينة يستطيع الحرم أن يقول ذلك." },
    { title: "غرفة روبوتية", body: "تُستخدم عندما يكون الاستطباب روبوتيًا — لا لأن الكتيّب يحب الذراع." },
    { title: "Bunker الإشعاع", body: "IMRT وSBRT وبقية قائمة المعجّل عندما تكون الأورام على الملف." },
    { title: "طابق الديال", body: "HD وPD وCRRT حتى لا تنتظر قائمة الكلى حرمًا آخر." },
    { title: "التصوير", body: "CT وMRI والمسوح التي يحتاجها المسافر قبل غرفة العمليات." },
    { title: "جناح دولي", body: "أسرة مرافقة ومكتب يجيب بالإنجليزية بعد منتصف الليل." },
  ];
}

const INTL_IDS = ["visa", "travel", "airport", "interpreters", "companion", "records", "cost", "after"] as const;

export function internationalServicesLocalized(locale: AppLocale) {
  const base = internationalServices().map((row, i) => ({
    ...row,
    id: INTL_IDS[i] ?? "after",
  }));
  if (locale !== "ar") return base;
  return [
    { id: "visa", title: "مساعدة التأشيرة", body: "خطابات دعوة تطابق خطة الدخول الفعلية." },
    { id: "travel", title: "تخطيط السفر", body: "نوافذ طيران تحترم قوائم العمليات لا مواسم السياحة." },
    { id: "airport", title: "الاستقبال من المطار", body: "سائق باسمه، لا طابور سيارات بعد رحلة طويلة." },
    { id: "interpreters", title: "مترجمون", body: "لغة السرير عندما لا تكون الإنجليزية لسان العائلة الأول." },
    { id: "companion", title: "إقامة المرافق", body: "سرير وغلاية، لا أريكة في ممر." },
    { id: "records", title: "نقل الملفات", body: "أقراص وبوابات وPDF الممل الذي يُبقي الرعاية متصلة." },
    { id: "cost", title: "وضوح التكلفة", body: "نطاقات تخطيط بالدولار قبل أن يطلب أحد عربونًا." },
    { id: "after", title: "بعد العودة", body: "خط عائد إلى الفريق الجراحي للسنة الأولى." },
  ];
}

export function cityTravelLocalized(hospital: Hospital, locale: AppLocale) {
  const travel = cityTravel(hospital);
  if (locale !== "ar") return travel;
  const mapsQuery = `${hospital.name}, ${hospital.city}, India`;
  if (hospital.citySlug === "mumbai") {
    return {
      airport: "مطار شاتراباتي شيفاجي مهراج الدولي",
      airportHint: "عادة ٤٥–٩٠ دقيقة بالسيارة حسب الحرم والساعة.",
      centreHint: "جنوب مومباي وباندرا حزام الفندق المعتاد؛ نافي مومباي على ضفتها.",
      mapsQuery,
    };
  }
  if (hospital.citySlug === "bengaluru") {
    return {
      airport: "مطار كيمبيغودا الدولي",
      airportHint: "عادة ٤٥–٧٥ دقيقة من بانيرغاتا والحرم الجنوبية الشرقية.",
      centreHint: "MG Road وكورامالا فنادق المرافق الشائعة؛ المطار شمال المدينة.",
      mapsQuery,
    };
  }
  if (hospital.citySlug === "chennai") {
    return {
      airport: "مطار تشيناي الدولي",
      airportHint: "معظم الحرم المدرجة على ٢٠–٥٠ دقيقة من المطار في حركة عادية.",
      centreHint: "تي ناغار وفنادق الشاطئ الإقامة المعتادة للمرافق.",
      mapsQuery,
    };
  }
  if (hospital.citySlug === "hyderabad") {
    return {
      airport: "مطار راجيف غاندي الدولي",
      airportHint: "جوبلي هيلز وبانجارا هيلز عادة ٤٥–٧٠ دقيقة من المطار.",
      centreHint: "بانجارا هيلز وHITEC City تحتفظان بمعظم الفنادق التي تستخدمها العائلات فعلًا.",
      mapsQuery,
    };
  }
  return {
    airport: "مطار إنديرا غاندي الدولي",
    airportHint: "حرم دلهي إن سي آر تتراوح بين ٢٥ دقيقة وأكثر من ساعة حسب الطريق الدائري.",
    centreHint: "إيروسيتي وفاسانت كونج وغورغرام الإقامات المعتادة للمرافق.",
    mapsQuery,
  };
}

export function hospitalFaqsLocalized(
  hospital: Hospital,
  faculty: Doctor[],
  groups: FacultyGroup[],
  locale: AppLocale,
) {
  if (locale !== "ar") return hospitalFaqs(hospital, faculty, groups);
  const listed = groups.filter((g) => g.doctors.length > 0).map((g) => taxonomyLabel(g.name, "ar"));
  const names = faculty.filter((d) => d.featured).slice(0, 3).map((d) => d.name);
  const specLine =
    listed.length === 0
      ? "ما زال مطابقة الاستشاريين المسمّين لهذا الحرم جارية. سيقول المنسّق ذلك بوضوح."
      : listed.length <= 4
        ? `القوائم المسمّاة هنا تشمل حاليًا ${joinAr(listed)}.`
        : `القوائم المسمّاة هنا تشمل حاليًا ${joinAr(listed.slice(0, 4))} و${toEastern(listed.length - 4)} أقسامًا أخرى.`;
  const city = taxonomyLabel(hospital.city, "ar");
  const beds = hospital.beds ? toEastern(hospital.beds.replace(/[^\d]/g, "") || hospital.beds) : "";
  const year = hospital.established ? toEastern(hospital.established) : "";
  return [
    {
      q: `هل ${hospital.name} معتمد؟`,
      a: `نعم — الملف يقرأ ${hospital.accreditation}. نتحقق من اللوحات سنويًا بدل نسخها من كتيّب.`,
    },
    {
      q: "ما حجم الحرم؟",
      a: beds
        ? `حوالي ${beds} سرير${year ? `، مفتوح منذ ${year}` : ""}. الحجم حقيقة تخطيط لا وعد بأن كل سرير لكم.`
        : "أرقام الأسرّة على ملف المستشفى؛ يؤكد المنسّق الجناح عندما يصبح الموعد حقيقيًا.",
    },
    {
      q: "أي التخصصات لديها أطباء مسمّون هنا؟",
      a: specLine,
    },
    {
      q: "هل نلتقي الطبيب قبل السفر إلى الهند؟",
      a:
        names.length > 0
          ? `نعم. تلتقون الاستشاري على الكاميرا أولًا — غالبًا ${joinAr(names)} عندما تناسب هذه الأسماء الملف. لا عربون قبل ذلك الاتصال.`
          : "نعم. تلتقون الاستشاري المطابق على الكاميرا أولًا. لا عربون قبل ذلك الاتصال.",
    },
    {
      q: "هل الأسعار في هذه الصفحة عرض سعر؟",
      a: "لا. الأرقام نطاقات تخطيط هندية إلى جانب النقد الأمريكي النموذجي حتى تفكر العائلة. يؤكد استشاري مسمّى البروتوكول بعد السجلات.",
    },
    {
      q: `كيف يُصنَّف ${hospital.name} لصفحات pSEO لاحقًا؟`,
      a: `يُحفظ الحرم تحت بلد الهند، مدينة ${city}، ثم التخصص ثم الإجراء. روابط الأطباء وبطاقات التكلفة تستخدم القيم الإنجليزية في العنوان حتى لا تتغير مسارات التوجيه.`,
    },
  ];
}

export { PEOPLE_AR };
