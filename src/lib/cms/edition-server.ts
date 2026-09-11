import { cookies } from "next/headers";
import { CMS_EDITION_COOKIE, parseCmsEdition, type CmsEdition } from "@/lib/cms/edition";

export async function editionFromCookies(): Promise<CmsEdition> {
  const jar = await cookies();
  return parseCmsEdition(jar.get(CMS_EDITION_COOKIE)?.value);
}
