import { emptyStudioFields, type StudioFields } from "@/lib/ai/types";

const STRING = { type: "string" as const };
const FAQ = {
  type: "object" as const,
  additionalProperties: false,
  properties: {
    question: STRING,
    answer: STRING,
  },
  required: ["question", "answer"],
};
const LINK = {
  type: "object" as const,
  additionalProperties: false,
  properties: {
    anchor: STRING,
    url: STRING,
    reason: STRING,
  },
  required: ["anchor", "url", "reason"],
};

export const STUDIO_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: STRING,
    suggested_slug: STRING,
    meta_title: STRING,
    meta_description: STRING,
    h1: STRING,
    quick_answer: STRING,
    introduction: STRING,
    definition: STRING,
    overview: STRING,
    how_it_works: STRING,
    who_may_need_it: STRING,
    preparation: STRING,
    recovery: STRING,
    risks: STRING,
    benefits: STRING,
    cost_section: STRING,
    why_location: STRING,
    hospital_section: STRING,
    doctor_section: STRING,
    international_patient_information: STRING,
    bio: STRING,
    cta: STRING,
    faqs: { type: "array", items: FAQ },
    internal_links: { type: "array", items: LINK },
    warnings: { type: "array", items: STRING },
    section_rewritten: STRING,
  },
  required: [
    "title",
    "suggested_slug",
    "meta_title",
    "meta_description",
    "h1",
    "quick_answer",
    "introduction",
    "definition",
    "overview",
    "how_it_works",
    "who_may_need_it",
    "preparation",
    "recovery",
    "risks",
    "benefits",
    "cost_section",
    "why_location",
    "hospital_section",
    "doctor_section",
    "international_patient_information",
    "bio",
    "cta",
    "faqs",
    "internal_links",
    "warnings",
    "section_rewritten",
  ],
} as const;

export function parseStudioFields(value: unknown): StudioFields {
  const blank = emptyStudioFields();
  if (!value || typeof value !== "object") return blank;
  const raw = value as Record<string, unknown>;
  const text = (key: keyof StudioFields) =>
    typeof raw[key] === "string" ? (raw[key] as string) : "";
  const faqs = Array.isArray(raw.faqs)
    ? raw.faqs
        .filter((item): item is { question?: unknown; answer?: unknown } => Boolean(item) && typeof item === "object")
        .map((item) => ({
          question: typeof item.question === "string" ? item.question : "",
          answer: typeof item.answer === "string" ? item.answer : "",
        }))
        .filter((item) => item.question || item.answer)
    : [];
  const internal_links = Array.isArray(raw.internal_links)
    ? raw.internal_links
        .filter((item): item is { anchor?: unknown; url?: unknown; reason?: unknown } => Boolean(item) && typeof item === "object")
        .map((item) => ({
          anchor: typeof item.anchor === "string" ? item.anchor : "",
          url: typeof item.url === "string" ? item.url : "",
          reason: typeof item.reason === "string" ? item.reason : "",
        }))
        .filter((item) => item.url || item.anchor)
    : [];
  const warnings = Array.isArray(raw.warnings)
    ? raw.warnings.filter((item): item is string => typeof item === "string")
    : [];
  return {
    ...blank,
    title: text("title"),
    suggested_slug: text("suggested_slug"),
    meta_title: text("meta_title"),
    meta_description: text("meta_description"),
    h1: text("h1"),
    quick_answer: text("quick_answer"),
    introduction: text("introduction"),
    definition: text("definition"),
    overview: text("overview"),
    how_it_works: text("how_it_works"),
    who_may_need_it: text("who_may_need_it"),
    preparation: text("preparation"),
    recovery: text("recovery"),
    risks: text("risks"),
    benefits: text("benefits"),
    cost_section: text("cost_section"),
    why_location: text("why_location"),
    hospital_section: text("hospital_section"),
    doctor_section: text("doctor_section"),
    international_patient_information: text("international_patient_information"),
    bio: text("bio"),
    cta: text("cta"),
    faqs,
    internal_links,
    warnings,
    section_rewritten: text("section_rewritten"),
  };
}

export function composeEditorialBody(fields: StudioFields) {
  const sections: Array<[string, string]> = [
    ["Quick answer", fields.quick_answer],
    ["Introduction", fields.introduction],
    ["What it is", fields.definition],
    ["Overview", fields.overview],
    ["How it works", fields.how_it_works],
    ["Who it may help", fields.who_may_need_it],
    ["Preparation", fields.preparation],
    ["Recovery", fields.recovery],
    ["Risks and considerations", fields.risks],
    ["Possible benefits", fields.benefits],
    ["Cost", fields.cost_section],
    ["Location", fields.why_location],
    ["Hospitals", fields.hospital_section],
    ["Doctors", fields.doctor_section],
    ["For international patients", fields.international_patient_information],
    ["Next step", fields.cta],
  ];
  return sections
    .filter(([, body]) => body.trim())
    .map(([heading, body]) => `## ${heading}\n\n${body.trim()}`)
    .join("\n\n");
}
