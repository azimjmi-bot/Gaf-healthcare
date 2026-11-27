import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { consultStore, type LeadStatus } from "@/lib/consult-store";

const ALLOWED_STATUSES = new Set<LeadStatus>(["new", "reviewed", "contacted", "archived"]);

export async function GET() {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = await consultStore().listLeads(100);
  return NextResponse.json(
    { leads },
    { headers: { "cache-control": "no-store, private" } },
  );
}

export async function PATCH(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    status?: LeadStatus;
  } | null;
  const id = String(body?.id || "").trim();
  const status = body?.status;
  if (!id || !status || !ALLOWED_STATUSES.has(status)) {
    return NextResponse.json({ error: "Invalid lead status update" }, { status: 400 });
  }
  const updated = await consultStore().updateLeadStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json(
    { ok: true, lead: updated },
    { headers: { "cache-control": "no-store, private" } },
  );
}
