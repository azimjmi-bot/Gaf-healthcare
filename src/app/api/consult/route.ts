import { NextResponse } from "next/server";

/**
 * Validation failures come back as a code, not as prose.
 *
 * The API has no reliable way to know which language the visitor is reading —
 * the form posts from /consult and, once Arabic is published, from /ar/consult
 * — and a route handler is the wrong place to hold copy anyway. The client maps
 * these to consult.error.* in its own locale.
 */
export type ConsultErrorCode =
  | "invalidRequest"
  | "name"
  | "email"
  | "phone"
  | "selection"
  | "consent";

function reject(error: ConsultErrorCode) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return reject("invalidRequest");
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const consent = Boolean(body.consent);
  const treatment = String(body.treatment || "").trim();
  const timeline = String(body.timeline || "").trim();

  if (name.length < 2) return reject("name");
  if (!email.includes("@")) return reject("email");
  if (phone.length < 6) return reject("phone");
  if (!treatment || !timeline) return reject("selection");
  if (!consent) return reject("consent");

  const reference = `VEL-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, reference });
}
