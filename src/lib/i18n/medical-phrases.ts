import type { AppLocale } from "@/lib/i18n/languages";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

/** Display phrases that are not taxonomy routing keys. */
export const MEDICAL_PHRASE_AR: Record<string, string> = {
  "Brachytherapy": "المعالجة الكثبية",
  "GI (Gastrointestinal) Radiation Oncology": "علاج أورام الجهاز الهضمي بالإشعاع",
  "Gynaecological Oncology": "أورام النساء",
  "Head and Neck Oncology": "أورام الرأس والعنق",
  "Image-Guided Radiation Therapy (IMRT)": "العلاج الإشعاعي معدل الشدة الموجّه بالصور",
  "Medical Oncology": "علاج الأورام الطبي",
  "Medical Oncology (multidisciplinary cancer care)": "علاج الأورام الطبي ضمن فريق متعدد التخصصات",
  "Medical Oncology (supportive role in multidisciplinary cancer care)":
    "دور داعم في علاج الأورام الطبي ضمن الفريق المتعدد التخصصات",
  "Medical Oncology (supportive/concurrent treatment protocols)":
    "بروتوكولات داعمة أو متزامنة مع علاج الأورام الطبي",
  "Neuro-Oncology (Radiation)": "أورام الجهاز العصبي — مسار إشعاعي",
  "Paediatric Oncology (Radiation)": "أورام الأطفال — مسار إشعاعي",
  "Radiation Oncology": "علاج الأورام بالإشعاع",
  "Radiation Therapy for Cancer": "العلاج الإشعاعي للأورام",
  "Stereotactic Body Radiation Therapy (SBRT)": "العلاج الإشعاعي التجسيمي للجسم (SBRT)",
  "Stereotactic Radiosurgery (SRS)": "الجراحة الإشعاعية التجسيمية (SRS)",
  "Surgical Oncology (Head & Neck, Breast, GI, Thoracic)":
    "جراحة الأورام بالتنسيق (رأس وعنق، ثدي، جهاز هضمي، صدر)",
  "Surgical Oncology (collaborative cancer programme involvement)":
    "مشاركة في برنامج جراحة الأورام التعاوني",
  "Adjuvant Chemotherapy": "العلاج الكيميائي المساعد",
  "Brain Tumor Surgery (Radiation Oncology support)": "دعم إشعاعي لجراحة أورام الدماغ",
  "Breast Cancer Surgery": "جراحة سرطان الثدي — التنسيق الإشعاعي",
  "Cancer Immunotherapy": "العلاج المناعي للسرطان",
  "Cervical Cancer Surgery": "جراحة سرطان عنق الرحم — التنسيق الإشعاعي",
  "Cervical Cancer Surgery (radiation management aspect)": "إدارة الإشعاع بعد جراحة سرطان عنق الرحم",
  "Chemotherapy for Cancer": "العلاج الكيميائي للأورام",
  "Chemotherapy for Cancer (concurrent chemoradiation protocols)": "بروتوكولات الكيميائي المتزامن مع الإشعاع",
  "Chemotherapy for Solid Tumors": "العلاج الكيميائي للأورام الصلبة",
  "Endometrial Cancer Surgery": "جراحة سرطان بطانة الرحم — التنسيق الإشعاعي",
  "Head & Neck Tumor Surgery": "جراحة أورام الرأس والعنق — التنسيق الإشعاعي",
  "Hormone Therapy for Breast Cancer": "العلاج الهرموني لسرطان الثدي",
  "Hormone Therapy for Gynecologic Cancers": "العلاج الهرموني لأورام النساء",
  "Hormone-Based Therapies- Hormonal Therapy for Gynaecologic Cancers":
    "علاجات هرمونية لأورام النساء",
  "Hypopharyngeal Cancer Surgery (radiation management aspect)": "إدارة الإشعاع لأورام البلعوم السفلي",
  "Immunotherapy for Solid Tumors": "العلاج المناعي للأورام الصلبة",
  "Lung Cancer Surgery": "جراحة سرطان الرئة — التنسيق الإشعاعي",
  "Medical Oncology Treatments- Chemotherapy for Cancer": "مسارات علاج الأورام الطبي — الكيميائي",
  "Neoadjuvant Chemotherapy": "العلاج الكيميائي قبل الجراحة",
  "Ovarian Cancer Surgery": "جراحة سرطان المبيض — التنسيق الإشعاعي",
  "Palliative Chemotherapy": "العلاج الكيميائي التلطيفي",
  "Retinoblastoma Treatment": "علاج الورم الأرومي الشبكي",
  "Targeted Therapy for Cancer": "العلاج الموجّه للسرطان",
  English: "الإنجليزية",
  Hindi: "الهندية",
  Tamil: "التاميلية",
  Telugu: "التيلوغو",
  Kannada: "الكانادية",
  Marathi: "الماراثية",
  Urdu: "الأردية",
  Bengali: "البنغالية",
  Punjabi: "البنجابية",
  Malayalam: "المالايالامية",
  Gujarati: "الغوجاراتية",
  Marwadi: "الماروارية",
};

export function medicalPhrase(name: string, locale: AppLocale): string {
  if (locale !== "ar") return name;
  return MEDICAL_PHRASE_AR[name] || taxonomyLabel(name, locale);
}

export function medicalPhrases(names: readonly string[], locale: AppLocale): string[] {
  return names.map((name) => medicalPhrase(name, locale));
}

export function languagesLabel(value: string, locale: AppLocale): string {
  if (locale !== "ar" || !value) return value;
  return value
    .split(/,\s*/)
    .map((part) => medicalPhrase(part.trim(), locale))
    .filter(Boolean)
    .join("، ");
}
