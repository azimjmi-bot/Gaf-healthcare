import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { catalogTreatments } from "@/lib/treatments";

type Choice = { value: string; label: string; meta?: string };

function choices(kind: string): Choice[] {
  if (kind === "doctors") {
    return doctorsForLocale("en").map((row) => ({
      value: row.slug,
      label: row.name,
      meta: `${row.specialty} · ${row.city}`,
    }));
  }
  if (kind === "hospitals") {
    return hospitalsForLocale("en").map((row) => ({
      value: row.slug,
      label: row.name,
      meta: `${row.city}, ${row.country}`,
    }));
  }
  if (kind === "costs") {
    return catalogTreatments.map((row) => ({
      value: row.slug,
      label: row.name,
      meta: row.category,
    }));
  }
  if (kind === "related") {
    return loadCuratedTreatments().treatments.map((row) => ({
      value: row.slug,
      label:
        row.translations.en?.name ||
        row.baseName ||
        row.slug,
      meta: row.specialtySlug,
    }));
  }
  return [];
}

export async function GET(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind") ?? "";
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const selected = new Set(
    (url.searchParams.get("selected") ?? "").split(",").filter(Boolean),
  );
  const rows = choices(kind)
    .filter((row) => {
      if (selected.has(row.value)) return true;
      if (!q) return false;
      return `${row.label} ${row.meta ?? ""}`.toLowerCase().includes(q);
    })
    .sort((a, b) => Number(selected.has(b.value)) - Number(selected.has(a.value)))
    .slice(0, 40);
  return NextResponse.json(rows);
}
