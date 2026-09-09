import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { loadCms } from "@/lib/cms/store";

export async function GET() {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(loadCms());
}
