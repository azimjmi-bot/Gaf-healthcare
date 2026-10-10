import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { applyGeneration } from "@/lib/ai/apply";
import { getGeneration, updateGeneration } from "@/lib/ai/history";
import { emptyStudioFields, type StudioFields } from "@/lib/ai/types";

export async function POST(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    mode?: "draft" | "publish" | "approve";
    output?: StudioFields;
  } | null;
  if (!body?.id || !body.mode) {
    return NextResponse.json({ error: "Choose a generation and an action." }, { status: 400 });
  }
  const current = getGeneration(body.id);
  if (!current) return NextResponse.json({ error: "Generation not found." }, { status: 404 });
  const output = body.output ? { ...emptyStudioFields(), ...body.output } : current.output;
  const edition = editionFromRequest(request);
  if (body.mode === "approve") {
    const next = updateGeneration(current.id, { output, status: "approved" });
    return NextResponse.json(next);
  }
  const result = applyGeneration({ ...current, output }, body.mode, edition);
  if ("error" in result && result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const next = updateGeneration(current.id, {
    output,
    status: body.mode === "publish" ? "published" : "saved_draft",
  });
  return NextResponse.json({ ...next, appliedUrl: result.url });
}
