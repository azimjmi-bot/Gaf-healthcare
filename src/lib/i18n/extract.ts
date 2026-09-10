import type { Article, ArticleBlock } from "@/lib/cms/types";
import type { CostArticle } from "@/data/cost-articles/types";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import { COST_FAQS, DOCTOR_FAQS, HOSPITAL_FAQS, doctorMetadata, hospitalMetadata, treatmentMetadata } from "@/lib/seo";
import type { TranslationFields } from "@/lib/i18n/types";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";

const SKIP_KEYS = new Set([
  "id",
  "slug",
  "src",
  "href",
  "url",
  "image",
  "ogImage",
  "canonical",
  "citySlug",
  "countrySlug",
  "specialtySlug",
  "specialtySlugs",
  "procedureSlug",
  "procedureSlugs",
  "treatmentSlugs",
  "hospitalSlug",
  "hospitalSlugs",
  "lastUpdated",
  "publishedAt",
  "updatedAt",
  "date",
  "status",
  "featured",
  "allowIndex",
  "after",
  "fit",
  "relatedProcedures",
  "type",
  "style",
  "level",
  "replaceGuide",
  "email",
  "phone",
]);

export function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function packArray(items: string[] | undefined, prefix: string): TranslationFields {
  const out: TranslationFields = {};
  (items || []).forEach((item, index) => {
    if (item) out[`${prefix}.${index}`] = item;
  });
  return out;
}

export function unpackArray(fields: TranslationFields, prefix: string, fallback: string[]) {
  const keys = Object.keys(fields)
    .filter((key) => key.startsWith(`${prefix}.`))
    .sort((a, b) => Number(a.slice(prefix.length + 1)) - Number(b.slice(prefix.length + 1)));
  if (keys.length === 0) return fallback;
  return keys.map((key, index) => fields[key] || fallback[index] || "");
}

function setPath(target: Record<string, unknown>, path: string, value: string) {
  const parts = path.split(".");
  let cursor: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const index = Number(part);
    const asIndex = Number.isInteger(index) && String(index) === part;
    if (asIndex) {
      return;
    }
    const nextIsIndex = Number.isInteger(Number(nextPart)) && String(Number(nextPart)) === nextPart;
    const current = cursor[part];
    if (nextIsIndex) {
      if (!Array.isArray(current)) cursor[part] = Array.isArray(current) ? current : [];
    } else if (!current || typeof current !== "object") {
      cursor[part] = {};
    }
    cursor = cursor[part] as Record<string, unknown>;
  }
  const last = parts[parts.length - 1];
  const lastIndex = Number(last);
  if (Number.isInteger(lastIndex) && String(lastIndex) === last && Array.isArray(cursor)) {
    cursor[lastIndex] = value;
    return;
  }
  cursor[last] = value;
}

function flattenValue(value: unknown, path: string, out: TranslationFields) {
  if (value == null || value === "") return;
  if (typeof value === "string") {
    out[path] = value;
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => flattenValue(item, path ? `${path}.${index}` : String(index), out));
    return;
  }
  if (typeof value === "object") {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (SKIP_KEYS.has(key)) continue;
      if (key === "procedure" && path !== "") continue;
      const next = path ? `${path}.${key}` : key;
      flattenValue(child, next, out);
    }
  }
}

function applyFlat(target: unknown, fields: TranslationFields) {
  const clone = structuredClone(target) as Record<string, unknown>;
  for (const [path, value] of Object.entries(fields)) {
    const parts = path.split(".");
    let cursor: unknown = clone;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const part = parts[i];
      const idx = Number(part);
      if (Array.isArray(cursor) && String(idx) === part) {
        cursor = cursor[idx];
      } else if (cursor && typeof cursor === "object") {
        cursor = (cursor as Record<string, unknown>)[part];
      } else {
        cursor = undefined;
        break;
      }
    }
    if (cursor == null) continue;
    const last = parts[parts.length - 1];
    const lastIdx = Number(last);
    if (Array.isArray(cursor) && String(lastIdx) === last) {
      cursor[lastIdx] = value;
    } else if (cursor && typeof cursor === "object") {
      (cursor as Record<string, unknown>)[last] = value;
    }
  }
  return clone;
}

export function extractDoctorFields(doctor: Doctor): TranslationFields {
  const meta = doctorMetadata(doctor);
  return {
    title: doctor.title,
    bio: doctor.bio,
    qualifications: doctor.qualifications,
    experience: doctor.experience,
    credentials: doctor.credentials,
    years: doctor.years,
    ...(doctor.imageAlt ? { imageAlt: doctor.imageAlt } : {}),
    ...packArray(doctor.specializations, "specializations"),
    ...packArray(doctor.education, "education"),
    ...packArray(doctor.affiliations, "affiliations"),
    ...packArray(doctor.memberships, "memberships"),
    ...packArray(doctor.awards, "awards"),
    ...packArray(doctor.research, "research"),
    ...packArray(doctor.proceduresExpertise, "proceduresExpertise"),
    seoTitle: String(meta.title || ""),
    seoDescription: String(meta.description || ""),
  };
}

export function applyDoctorFields(doctor: Doctor, fields: TranslationFields): Doctor {
  return {
    ...doctor,
    title: fields.title || doctor.title,
    bio: fields.bio || doctor.bio,
    qualifications: fields.qualifications || doctor.qualifications,
    experience: fields.experience || doctor.experience,
    credentials: fields.credentials || doctor.credentials,
    years: fields.years || doctor.years,
    imageAlt: fields.imageAlt || doctor.imageAlt,
    specializations: unpackArray(fields, "specializations", doctor.specializations),
    education: unpackArray(fields, "education", doctor.education),
    affiliations: unpackArray(fields, "affiliations", doctor.affiliations),
    memberships: unpackArray(fields, "memberships", doctor.memberships),
    awards: unpackArray(fields, "awards", doctor.awards),
    research: unpackArray(fields, "research", doctor.research),
    proceduresExpertise: unpackArray(fields, "proceduresExpertise", doctor.proceduresExpertise),
  };
}

export function extractHospitalFields(hospital: Hospital): TranslationFields {
  const meta = hospitalMetadata(hospital);
  return {
    bio: hospital.bio,
    summary: hospital.summary,
    focus: hospital.focus,
    accreditation: hospital.accreditation,
    icu: hospital.icu,
    ...(hospital.imageAlt ? { imageAlt: hospital.imageAlt } : {}),
    seoTitle: String(meta.title || ""),
    seoDescription: String(meta.description || ""),
  };
}

export function applyHospitalFields(hospital: Hospital, fields: TranslationFields): Hospital {
  return {
    ...hospital,
    bio: fields.bio || hospital.bio,
    summary: fields.summary || hospital.summary,
    focus: fields.focus || hospital.focus,
    accreditation: fields.accreditation || hospital.accreditation,
    icu: fields.icu || hospital.icu,
    imageAlt: fields.imageAlt || hospital.imageAlt,
  };
}

function extractBlocks(blocks: ArticleBlock[] | undefined): TranslationFields {
  const out: TranslationFields = {};
  for (const block of blocks || []) {
    if (block.type === "paragraph" || block.type === "heading") out[`blocks.${block.id}.text`] = block.text;
    else if (block.type === "quote") {
      out[`blocks.${block.id}.text`] = block.text;
      if (block.cite) out[`blocks.${block.id}.cite`] = block.cite;
    } else if (block.type === "list") {
      Object.assign(out, packArray(block.items, `blocks.${block.id}.items`));
    } else if (block.type === "html") out[`blocks.${block.id}.html`] = block.html;
    else if (block.type === "image") {
      if (block.alt) out[`blocks.${block.id}.alt`] = block.alt;
      if (block.caption) out[`blocks.${block.id}.caption`] = block.caption;
    } else if (block.type === "button") out[`blocks.${block.id}.label`] = block.label;
  }
  return out;
}

function applyBlocks(blocks: ArticleBlock[], fields: TranslationFields): ArticleBlock[] {
  return blocks.map((block) => {
    if (block.type === "paragraph" || block.type === "heading") {
      return { ...block, text: fields[`blocks.${block.id}.text`] || block.text };
    }
    if (block.type === "quote") {
      return {
        ...block,
        text: fields[`blocks.${block.id}.text`] || block.text,
        cite: fields[`blocks.${block.id}.cite`] || block.cite,
      };
    }
    if (block.type === "list") {
      return { ...block, items: unpackArray(fields, `blocks.${block.id}.items`, block.items) };
    }
    if (block.type === "html") {
      return { ...block, html: fields[`blocks.${block.id}.html`] || block.html };
    }
    if (block.type === "image") {
      return {
        ...block,
        alt: fields[`blocks.${block.id}.alt`] || block.alt,
        caption: fields[`blocks.${block.id}.caption`] || block.caption,
      };
    }
    if (block.type === "button") {
      return { ...block, label: fields[`blocks.${block.id}.label`] || block.label };
    }
    return block;
  });
}

export function extractTreatmentFields(treatment: Treatment, article?: CostArticle): TranslationFields {
  const meta = article
    ? { title: article.seoTitle, description: article.seoDescription }
    : treatmentMetadata(treatment);
  const fields: TranslationFields = {
    summary: treatment.summary,
    notes: treatment.notes,
    stay: treatment.stay,
    ...packArray(treatment.includes, "includes"),
    ...packArray(treatment.conditions, "conditions"),
    ...extractBlocks(treatment.blocks),
    seoTitle: String(meta.title || ""),
    seoDescription: String(meta.description || ""),
  };
  if (article) {
    flattenValue(article, "article", fields);
  }
  return fields;
}

export function applyTreatmentFields(treatment: Treatment, fields: TranslationFields): Treatment {
  return {
    ...treatment,
    summary: fields.summary || treatment.summary,
    notes: fields.notes || treatment.notes,
    stay: fields.stay || treatment.stay,
    includes: unpackArray(fields, "includes", treatment.includes),
    conditions: unpackArray(fields, "conditions", treatment.conditions),
    blocks: treatment.blocks ? applyBlocks(treatment.blocks, fields) : treatment.blocks,
  };
}

export function applyCostArticleFields(article: CostArticle, fields: TranslationFields): CostArticle {
  const articleFields: TranslationFields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (key.startsWith("article.")) articleFields[key.slice("article.".length)] = value;
  }
  if (Object.keys(articleFields).length === 0) return article;
  return applyFlat(article, articleFields) as CostArticle;
}

export function extractBlogFields(article: Article): TranslationFields {
  const fields: TranslationFields = {
    title: article.title,
    excerpt: article.excerpt,
    seoTitle: article.seoTitle || article.title,
    seoDescription: article.seoDescription || article.excerpt,
    ...(article.imageAlt ? { imageAlt: article.imageAlt } : {}),
    ...extractBlocks(article.blocks),
  };
  article.relatedLinks.forEach((link, index) => {
    if (link.label) fields[`related.${index}.label`] = link.label;
  });
  return fields;
}

export function applyBlogFields(article: Article, fields: TranslationFields): Article {
  return {
    ...article,
    title: fields.title || article.title,
    excerpt: fields.excerpt || article.excerpt,
    seoTitle: fields.seoTitle || article.seoTitle,
    seoDescription: fields.seoDescription || article.seoDescription,
    imageAlt: fields.imageAlt || article.imageAlt,
    blocks: applyBlocks(article.blocks, fields),
    relatedLinks: article.relatedLinks.map((link, index) => ({
      ...link,
      label: fields[`related.${index}.label`] || link.label,
    })),
  };
}

export function extractFaqFields(rows: { q: string; a: string }[], prefix: string): TranslationFields {
  const out: TranslationFields = {};
  rows.forEach((row, index) => {
    out[`${prefix}.${index}.q`] = row.q;
    out[`${prefix}.${index}.a`] = row.a;
  });
  return out;
}

export function applyFaqFields(rows: { q: string; a: string }[], fields: TranslationFields, prefix: string) {
  return rows.map((row, index) => ({
    q: fields[`${prefix}.${index}.q`] || row.q,
    a: fields[`${prefix}.${index}.a`] || row.a,
  }));
}

export function extractUiFields() {
  return { ...UI_MESSAGE_FIELDS };
}

export function extractDirectoryFaqs(kind: "doctors" | "hospitals" | "costs") {
  if (kind === "doctors") return extractFaqFields(DOCTOR_FAQS, "faq");
  if (kind === "hospitals") return extractFaqFields(HOSPITAL_FAQS, "faq");
  return extractFaqFields(COST_FAQS, "faq");
}

export { applyFlat, flattenValue, setPath };
