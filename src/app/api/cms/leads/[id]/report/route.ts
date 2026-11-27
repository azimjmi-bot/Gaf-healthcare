import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { consultStore } from "@/lib/consult-store";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "cache-control": "no-store, private" } },
    );
  }
  const { id } = await context.params;
  const url = new URL(request.url);
  const fileId = url.searchParams.get("fileId")?.trim() || "";
  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  }

  const found = await consultStore().getReportBytes(id, fileId);
  if (!found) {
    return NextResponse.json(
      { error: "Report not found" },
      { status: 404, headers: { "cache-control": "no-store, private" } },
    );
  }

  return new Response(new Uint8Array(found.bytes), {
    status: 200,
    headers: {
      "content-type": found.attachment.mime,
      "content-disposition": `attachment; filename="${found.attachment.originalName}"`,
      "cache-control": "no-store, private",
      "x-content-type-options": "nosniff",
      "content-security-policy": "default-src 'none'",
    },
  });
}
