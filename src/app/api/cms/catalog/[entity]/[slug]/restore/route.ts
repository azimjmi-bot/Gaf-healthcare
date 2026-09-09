import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { loadCatalogCms, saveCatalogCms } from "@/lib/cms/catalog-store";

export async function POST(_req: Request, ctx: { params: Promise<{ entity: string; slug: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { entity, slug } = await ctx.params;
  try {
    const cms = loadCatalogCms();
    if (entity === "doctors") cms.doctorsDeleted = cms.doctorsDeleted.filter((s) => s !== slug);
    else if (entity === "hospitals") cms.hospitalsDeleted = cms.hospitalsDeleted.filter((s) => s !== slug);
    else if (entity === "treatments") cms.treatmentsDeleted = cms.treatmentsDeleted.filter((s) => s !== slug);
    else return NextResponse.json({ error: "Unknown catalog." }, { status: 400 });
    saveCatalogCms(cms);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not restore.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
