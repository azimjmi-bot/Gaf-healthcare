import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import {
  blankCuratedTreatment,
  loadCuratedTreatments,
  saveCuratedTreatments,
} from "@/lib/cms/curated-treatment-store";

export async function GET() {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(loadCuratedTreatments().treatments);
}

export async function POST() {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const store = loadCuratedTreatments();
    const treatment = blankCuratedTreatment(store);
    store.treatments.unshift(treatment);
    saveCuratedTreatments(store);
    return NextResponse.json(treatment);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create Treatment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
