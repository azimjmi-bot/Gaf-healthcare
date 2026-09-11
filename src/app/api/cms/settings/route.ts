import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { loadCms, saveCms } from "@/lib/cms/store";
import type { CmsSettings } from "@/lib/cms/types";

export async function PUT(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const patch = (await request.json().catch(() => null)) as Partial<CmsSettings> | null;
  if (!patch) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  try {
    const store = loadCms();
    store.settings = { ...store.settings, ...patch };
    saveCms(store);
    return NextResponse.json(store.settings);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save settings.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
