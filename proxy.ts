import { NextResponse, type NextRequest } from "next/server";

const CMS_COOKIE = "gaf_cms";

function cmsPassword() {
  return process.env.CMS_PASSWORD || "gaf-local";
}

async function cmsToken(password: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("gaf-cms-desk"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(password));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/cms/login" || pathname === "/api/cms/login") {
    return NextResponse.next();
  }
  const expected = await cmsToken(cmsPassword());
  const token = request.cookies.get(CMS_COOKIE)?.value;
  if (token === expected) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/cms")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const login = new URL("/cms/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/cms/:path*", "/api/cms/:path*"],
};
