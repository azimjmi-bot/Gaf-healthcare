import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { openaiConfigured, openaiModel, MAX_INSTRUCTION_CHARS, OPENAI_NOT_CONFIGURED } from "@/lib/ai/config";
import { gatherStudioContext } from "@/lib/ai/context";
import { saveGeneration } from "@/lib/ai/history";
import { generateStudioContent } from "@/lib/ai/openai";
import { beginGeneration, endGeneration } from "@/lib/ai/rate-limit";
import { AI_ACTIONS, AI_CONTENT_TYPES, type AiGenerateRequest } from "@/lib/ai/types";
import { studioHasContent, validateStudioOutput } from "@/lib/ai/validate";
import { isAppLocale } from "@/lib/i18n/languages";

export async function POST(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!openaiConfigured()) {
    return NextResponse.json({ error: OPENAI_NOT_CONFIGURED }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as AiGenerateRequest | null;
  if (!body || !AI_ACTIONS.includes(body.action) || !AI_CONTENT_TYPES.includes(body.contentType)) {
    return NextResponse.json({ error: "Invalid generation request." }, { status: 400 });
  }
  const instruction = (body.instruction || "").trim();
  if (!instruction) {
    return NextResponse.json({ error: "Write an instruction first." }, { status: 400 });
  }
  if (instruction.length > MAX_INSTRUCTION_CHARS) {
    return NextResponse.json({ error: "Keep the instruction under 4,000 characters." }, { status: 400 });
  }
  const locale = isAppLocale(body.locale) ? body.locale : editionFromRequest(request);
  const blocked = beginGeneration();
  if (blocked) return NextResponse.json({ error: blocked }, { status: 429 });
  try {
    const context = gatherStudioContext({ ...body, locale });
    const output = await generateStudioContent({ ...body, locale }, context.payload);
    const flags = validateStudioOutput(output, {
      allowedUrls: context.allowedUrls,
      allowedDoctorNames: context.allowedDoctorNames,
      allowedHospitalNames: context.allowedHospitalNames,
      allowedMoney: context.allowedMoney,
      currentSlug: context.currentSlug,
    });
    if (!studioHasContent(output)) {
      return NextResponse.json({ error: "The model returned empty fields. Try a clearer instruction." }, { status: 502 });
    }
    const saved = saveGeneration({
      actor: "cms-admin",
      action: body.action,
      contentType: body.contentType,
      locale,
      recordId: context.recordId,
      model: openaiModel(),
      instruction,
      status: "generated",
      output,
      original: context.original,
      currentUrl: context.currentUrl,
      flags,
    });
    return NextResponse.json(saved);
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI generation failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    endGeneration();
  }
}
