import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { CMS_EDITION_COOKIE, parseCmsEdition } from "@/lib/cms/edition";

export async function POST(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { edition?: string } | null;
  const edition = parseCmsEdition(body?.edition);
  const response = NextResponse.json({ edition });
  response.cookies.set(CMS_EDITION_COOKIE, edition, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
