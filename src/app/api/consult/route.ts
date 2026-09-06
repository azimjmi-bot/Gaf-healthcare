import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const consent = Boolean(body.consent);
  const treatment = String(body.treatment || "").trim();
  const timeline = String(body.timeline || "").trim();

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please share your name." }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Please share a valid email." }, { status: 400 });
  }
  if (phone.length < 6) {
    return NextResponse.json({ ok: false, error: "Please share a phone number." }, { status: 400 });
  }
  if (!treatment || !timeline) {
    return NextResponse.json(
      { ok: false, error: "Please choose a treatment interest and a travel window." },
      { status: 400 },
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Consent is required to prepare a dossier." },
      { status: 400 },
    );
  }

  const reference = `VEL-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, reference });
}
