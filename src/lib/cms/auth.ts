import { createHmac } from "crypto";
import { cookies } from "next/headers";

export const CMS_COOKIE = "gaf_cms";

export function cmsPassword() {
  return process.env.CMS_PASSWORD || "gaf-local";
}

export function cmsToken(password = cmsPassword()) {
  return createHmac("sha256", "gaf-cms-desk").update(password).digest("hex");
}

export async function isCmsSession() {
  const jar = await cookies();
  return jar.get(CMS_COOKIE)?.value === cmsToken();
}

export async function requireCmsSession() {
  if (!(await isCmsSession())) {
    const err = new Error("Unauthorized");
    err.cause = 401;
    throw err;
  }
}
