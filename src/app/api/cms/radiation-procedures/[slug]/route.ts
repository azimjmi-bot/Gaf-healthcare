import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCatalogCms, saveCatalogCms } from "@/lib/cms/catalog-store";
import type { RadiationProcedurePagePatch } from "@/lib/cms/catalog-types";
import { publishableRadiationPatch } from "@/lib/cms/radiation-procedure-admin";
import { getProcedure, RADIATION_PROCEDURES } from "@/lib/taxonomy";

function cleanPatch(body: RadiationProcedurePagePatch): RadiationProcedurePagePatch | null {
  if (body.status !== "draft" && body.status !== "published") return null;
  const faqs = Array.isArray(body.faqs)
    ? body.faqs
        .filter((row) => row && typeof row.q === "string" && typeof row.a === "string")
        .map((row) => ({ q: row.q.trim(), a: row.a.trim() }))
        .filter((row) => row.q || row.a)
    : undefined;
  const note = Array.isArray(body.note)
    ? body.note.filter((row) => typeof row === "string").map((row) => row.trim()).filter(Boolean)
    : undefined;
  return {
    status: body.status,
    h1: typeof body.h1 === "string" ? body.h1.trim() : undefined,
    description: typeof body.description === "string" ? body.description.trim() : undefined,
    quickAnswer: typeof body.quickAnswer === "string" ? body.quickAnswer.trim() : undefined,
    note,
    faqs,
  };
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (editionFromRequest(request) !== "ar") {
    return NextResponse.json(
      { error: "Radiation procedure pages are stored on the Arabic catalog. Open this screen with the Arabic edition." },
      { status: 400 },
    );
  }
  const { slug } = await params;
  const taxon = getProcedure(slug);
  if (!taxon || !(RADIATION_PROCEDURES as readonly string[]).includes(taxon.name)) {
    return NextResponse.json({ error: "Procedure not found." }, { status: 404 });
  }
  const body = (await request.json().catch(() => null)) as RadiationProcedurePagePatch | null;
  if (!body) return NextResponse.json({ error: "Invalid procedure content." }, { status: 400 });
  const patch = cleanPatch(body);
  if (!patch) return NextResponse.json({ error: "Invalid publication status." }, { status: 400 });
  const gate = publishableRadiationPatch(taxon.name, patch);
  if (!gate.ok) {
    return NextResponse.json(
      { error: "This draft cannot be published until the FAQ completeness check passes.", issues: gate.issues },
      { status: 400 },
    );
  }
  const store = loadCatalogCms("ar");
  const previous = store.radiationProcedurePageOverrides[taxon.slug];
  store.radiationProcedurePageOverrides[taxon.slug] = {
    ...patch,
    faqs: patch.faqs?.length ? patch.faqs : previous?.faqs,
  };
  saveCatalogCms(store, "ar");
  return NextResponse.json({ ok: true, slug: taxon.slug, status: patch.status, issues: gate.issues });
}
