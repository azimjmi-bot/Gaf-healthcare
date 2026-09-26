import { isAllowedInternalPath } from "@/lib/ai/links";
import type { AiFlag, StudioFields } from "@/lib/ai/types";

const MONEY = /(?:USD|INR|AED|TRY|\$|€|£)\s*[\d,]+(?:\s*[-–to]+\s*[\d,]+)?|\b\d{1,3}(?:,\d{3})+(?:\s*[-–]\s*\d{1,3}(?:,\d{3})+)?/gi;

export function extractMoneyTokens(text: string) {
  return [...(text.match(MONEY) || [])].map((token) => token.replace(/\s+/g, " ").trim());
}

export function moneyAllowed(token: string, allowed: string[]) {
  const compact = token.replace(/[\s,]/g, "").toLowerCase();
  return allowed.some((item) => item.replace(/[\s,]/g, "").toLowerCase() === compact);
}

function allGeneratedText(fields: StudioFields) {
  return [
    fields.title,
    fields.meta_title,
    fields.meta_description,
    fields.h1,
    fields.quick_answer,
    fields.introduction,
    fields.definition,
    fields.overview,
    fields.how_it_works,
    fields.who_may_need_it,
    fields.preparation,
    fields.recovery,
    fields.risks,
    fields.benefits,
    fields.cost_section,
    fields.why_location,
    fields.hospital_section,
    fields.doctor_section,
    fields.international_patient_information,
    fields.bio,
    fields.cta,
    fields.section_rewritten,
    ...fields.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...fields.internal_links.map((link) => `${link.anchor} ${link.reason}`),
  ].join("\n");
}

export type ValidationContext = {
  allowedUrls: string[];
  allowedDoctorNames: string[];
  allowedHospitalNames: string[];
  allowedMoney: string[];
  currentSlug?: string;
};

function nameMentioned(name: string, text: string) {
  if (!name.trim()) return false;
  return text.toLocaleLowerCase().includes(name.trim().toLocaleLowerCase());
}

export function validateStudioOutput(fields: StudioFields, ctx: ValidationContext): AiFlag[] {
  const flags: AiFlag[] = [];
  const text = allGeneratedText(fields);

  for (const token of extractMoneyTokens(text)) {
    if (ctx.allowedMoney.length === 0) {
      flags.push({
        code: "invented_cost",
        message: `Generated a price (${token}) but the CMS has no cost figure for this record.`,
      });
    } else if (!moneyAllowed(token, ctx.allowedMoney)) {
      flags.push({
        code: "cost_mismatch",
        message: `Generated cost ${token} does not match the CMS figures.`,
      });
    }
  }

  const doctorAllow = ctx.allowedDoctorNames.map((name) => name.toLocaleLowerCase());
  const hospitalAllow = ctx.allowedHospitalNames.map((name) => name.toLocaleLowerCase());
  const titled = text.match(/\bDr\.?\s+[A-Z][A-Za-z.'-]+(?:\s+[A-Z][A-Za-z.'-]+){0,3}/g) || [];
  for (const mention of titled) {
    if (!doctorAllow.some((name) => name.includes(mention.replace(/^Dr\.?\s+/i, "").toLocaleLowerCase()) || mention.toLocaleLowerCase().includes(name))) {
      if (!nameMentioned(mention, ctx.allowedDoctorNames.join(" "))) {
        flags.push({
          code: "unknown_doctor",
          message: `Mentions ${mention}, who is not in the CMS data supplied for this task.`,
        });
      }
    }
  }

  for (const name of ["Fortis", "Apollo", "Medanta", "Yashoda", "Artemis", "HCG"].filter((stem) =>
    new RegExp(`\\b${stem}\\b`, "i").test(text),
  )) {
    if (!hospitalAllow.some((item) => item.includes(name.toLocaleLowerCase()))) {
      flags.push({
        code: "unknown_hospital",
        message: `Mentions ${name}, which is not in the CMS data supplied for this task.`,
      });
    }
  }

  const keptLinks = [];
  for (const link of fields.internal_links) {
    if (!isAllowedInternalPath(link.url, ctx.allowedUrls)) {
      flags.push({
        code: "invalid_url",
        message: `Dropped invented or unknown internal link: ${link.url || "(empty)"}`,
      });
    } else {
      keptLinks.push(link);
    }
  }
  fields.internal_links = keptLinks;

  if (fields.suggested_slug && ctx.currentSlug && fields.suggested_slug !== ctx.currentSlug) {
    flags.push({
      code: "slug_suggestion",
      message: `Suggested slug "${fields.suggested_slug}" is a suggestion only. The live URL stays /${ctx.currentSlug}.`,
    });
  }

  if (fields.bio) {
    const words = fields.bio.trim().split(/\s+/).filter(Boolean).length;
    if (words < 200) {
      flags.push({
        code: "bio_short",
        message: `Bio is ${words} words. The desk asks for 250–300 when the profile has enough facts.`,
      });
    }
  }

  const banned = ["guaranteed cure", "100% success", "best doctor in the world"];
  for (const phrase of banned) {
    if (text.toLocaleLowerCase().includes(phrase)) {
      flags.push({
        code: "unsafe_claim",
        message: `Contains an unsupported absolute claim (“${phrase}”).`,
      });
    }
  }

  return flags;
}

export function studioHasContent(fields: StudioFields) {
  return Boolean(
    fields.bio ||
      fields.introduction ||
      fields.overview ||
      fields.definition ||
      fields.quick_answer ||
      fields.meta_title ||
      fields.meta_description ||
      fields.section_rewritten ||
      fields.faqs.length ||
      fields.internal_links.length,
  );
}
