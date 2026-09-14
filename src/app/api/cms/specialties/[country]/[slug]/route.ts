import { NextResponse } from "next/server";
import { getBaseSpecialtyPage, saveableSpecialtyPageFields, specialtyPageKey } from "@/data/specialty-pages";
import type { SpecialtyPagePatch } from "@/data/specialty-pages/types";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCatalogCms, saveCatalogCms } from "@/lib/cms/catalog-store";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ country: string; slug: string }> },
) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { country, slug } = await params;
  if (!getBaseSpecialtyPage(country, slug)) {
    return NextResponse.json({ error: "Specialty page not found." }, { status: 404 });
  }
  const body = (await request.json().catch(() => null)) as SpecialtyPagePatch | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid specialty-page content." }, { status: 400 });
  }
  if (body.status && !["draft", "published"].includes(body.status)) {
    return NextResponse.json({ error: "Invalid publication status." }, { status: 400 });
  }
  const edition = editionFromRequest(request);
  const store = loadCatalogCms(edition);
  const key = specialtyPageKey(country, slug);
  store.specialtyPageOverrides[key] = saveableSpecialtyPageFields(body);
  saveCatalogCms(store, edition);
  return NextResponse.json({ ok: true, key });
}
