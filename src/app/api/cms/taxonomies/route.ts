import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCms, saveCms } from "@/lib/cms/store";

export async function PUT(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as {
    categories?: string[];
    tags?: string[];
  } | null;
  try {
    const edition = editionFromRequest(request);
    const store = loadCms(edition);
    if (body?.categories) store.categories = body.categories.filter(Boolean);
    if (body?.tags) store.tags = body.tags.filter(Boolean);
    saveCms(store, edition);
    return NextResponse.json({ categories: store.categories, tags: store.tags });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save taxonomies.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
