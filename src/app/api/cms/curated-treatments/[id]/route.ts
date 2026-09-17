import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import {
  loadCuratedTreatments,
  normalizeCuratedTreatment,
  saveCuratedTreatments,
  uniqueCuratedTreatmentSlug,
  validateTreatmentForSave,
} from "@/lib/cms/curated-treatment-store";
import type { CuratedTreatment } from "@/lib/cms/curated-treatment-types";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const treatment = loadCuratedTreatments().treatments.find(
    (row) => row.id === id,
  );
  return treatment
    ? NextResponse.json(treatment)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request: Request, context: Context) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const patch = (await request.json().catch(() => null)) as
    | Partial<CuratedTreatment>
    | null;
  if (!patch) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const { id } = await context.params;
  try {
    const store = loadCuratedTreatments();
    const index = store.treatments.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const current = store.treatments[index];
    const requestedSlug = patch.slug ?? current.slug;
    const slug = uniqueCuratedTreatmentSlug(store, requestedSlug, current.id);
    const previousSlugs =
      slug === current.slug
        ? current.previousSlugs
        : [...current.previousSlugs, current.slug];
    const next = normalizeCuratedTreatment({
      ...current,
      ...patch,
      id: current.id,
      createdAt: current.createdAt,
      slug,
      previousSlugs,
      translations: {
        ...current.translations,
        ...(patch.translations ?? {}),
      },
      updatedAt: new Date().toISOString(),
    });
    const errors = validateTreatmentForSave(next, store);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }
    store.treatments[index] = next;
    saveCuratedTreatments(store);
    return NextResponse.json(next);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save Treatment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.id === id);
  if (!treatment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  treatment.status = "archived";
  treatment.updatedAt = new Date().toISOString();
  saveCuratedTreatments(store);
  return NextResponse.json({ ok: true });
}
