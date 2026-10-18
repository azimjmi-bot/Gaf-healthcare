import { NextResponse } from "next/server";
import { draftRadiationProcedureCopy, radiationProcedureAiConfigured } from "@/lib/ai/radiation-procedure";
import { requireCmsSession } from "@/lib/cms/auth";
import { OPENAI_NOT_CONFIGURED } from "@/lib/ai/config";
import { getProcedure, RADIATION_PROCEDURES } from "@/lib/taxonomy";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const taxon = getProcedure(slug);
  if (!taxon || !(RADIATION_PROCEDURES as readonly string[]).includes(taxon.name)) {
    return NextResponse.json({ error: "Procedure not found." }, { status: 404 });
  }
  if (!radiationProcedureAiConfigured()) {
    return NextResponse.json({ error: OPENAI_NOT_CONFIGURED, saved: false }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as {
    section?: "all" | "faqs" | "note" | "quickAnswer";
    instruction?: string;
  } | null;
  const section = body?.section ?? "faqs";
  if (!["all", "faqs", "note", "quickAnswer"].includes(section)) {
    return NextResponse.json({ error: "Invalid section." }, { status: 400 });
  }
  try {
    const draft = await draftRadiationProcedureCopy({
      procedure: taxon.name,
      section,
      instruction: body?.instruction,
    });
    return NextResponse.json({ saved: false, draft });
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI generation failed.";
    const status = message === OPENAI_NOT_CONFIGURED ? 503 : 502;
    return NextResponse.json({ error: message, saved: false }, { status });
  }
}
