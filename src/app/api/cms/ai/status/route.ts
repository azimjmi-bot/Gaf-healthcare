import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { openaiConfigured, openaiModel, OPENAI_NOT_CONFIGURED } from "@/lib/ai/config";

export async function GET() {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const configured = openaiConfigured();
  return NextResponse.json({
    configured,
    model: configured ? openaiModel() : "",
    message: configured ? "" : OPENAI_NOT_CONFIGURED,
  });
}
