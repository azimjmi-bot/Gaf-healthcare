import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { getGeneration, listGenerations } from "@/lib/ai/history";

export async function GET(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (id) {
    const row = getGeneration(id);
    return row
      ? NextResponse.json(row)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ generations: listGenerations(url.searchParams.get("recordId") || undefined) });
}
