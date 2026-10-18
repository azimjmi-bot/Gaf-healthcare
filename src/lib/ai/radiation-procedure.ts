import "server-only";

import OpenAI from "openai";
import { OPENAI_NOT_CONFIGURED, openaiApiKey, openaiConfigured, openaiModel, publicAiError } from "@/lib/ai/config";
import type { RadiationProcedurePagePatch } from "@/lib/cms/catalog-types";
import { RADIATION_PROCEDURE_CONTENT_PROMPT } from "@/lib/i18n/radiation-procedure-prompt";

export function radiationProcedureAiConfigured() {
  return openaiConfigured();
}

/** Draft text only. Callers must not write this into the catalog. */
export async function draftRadiationProcedureCopy(input: {
  procedure: string;
  section: "all" | "faqs" | "note" | "quickAnswer";
  instruction?: string;
}): Promise<Pick<RadiationProcedurePagePatch, "h1" | "description" | "quickAnswer" | "note" | "faqs">> {
  if (!openaiConfigured()) throw new Error(OPENAI_NOT_CONFIGURED);
  const sectionNote =
    input.section === "all"
      ? "Fill every JSON field."
      : `Fill only the ${input.section} field. Leave the other fields empty.`;
  const user = [
    `Procedure: ${input.procedure}`,
    sectionNote,
    "Write at least 18 FAQs when faqs is requested or when section is all.",
    input.instruction?.trim() ? `Editor note:\n${input.instruction.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  try {
    const response = await new OpenAI({ apiKey: openaiApiKey() }).responses.create({
      model: openaiModel(),
      max_output_tokens: 8000,
      input: [
        { role: "developer", content: RADIATION_PROCEDURE_CONTENT_PROMPT },
        { role: "user", content: user },
      ],
      text: { format: { type: "json_object" } },
    });
    const text = response.output_text;
    if (!text) throw new Error("empty");
    const parsed = JSON.parse(text) as {
      h1?: string;
      description?: string;
      quickAnswer?: string;
      note?: string[];
      faqs?: { q?: string; a?: string }[];
    };
    return {
      h1: typeof parsed.h1 === "string" ? parsed.h1 : "",
      description: typeof parsed.description === "string" ? parsed.description : "",
      quickAnswer: typeof parsed.quickAnswer === "string" ? parsed.quickAnswer : "",
      note: Array.isArray(parsed.note) ? parsed.note.filter((row) => typeof row === "string") : [],
      faqs: Array.isArray(parsed.faqs)
        ? parsed.faqs
            .filter((row) => row && typeof row.q === "string" && typeof row.a === "string")
            .map((row) => ({ q: row.q as string, a: row.a as string }))
        : [],
    };
  } catch (error) {
    throw new Error(publicAiError(error));
  }
}
