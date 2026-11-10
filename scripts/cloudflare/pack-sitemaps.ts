/**
 * Writes each locale sitemap as a Worker asset.
 *
 * The English catalog is about 7,400 URLs. Building it inside a request
 * exceeds the Worker CPU limit (Cloudflare error 1102) before the response
 * can be cached. Node has no such limit, and the same `buildLocaleSitemap`
 * function the Next route uses produces the file. Unpublished locales stay
 * empty urlsets, matching the live routes. The Worker serves these files
 * from `/_gaf/sitemaps/` and keeps that path off the public web.
 *
 * A CMS edit made after this build is in the sitemap on the next production
 * deploy. The request path does not rebuild the file.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { LOCALES } from "../../src/lib/i18n/languages";
import { buildLocaleSitemap } from "../../src/lib/i18n/sitemap-entries";
import { sitemapXml } from "../../src/lib/i18n/sitemap-xml";

const destination = process.argv[2];
if (!destination) {
  console.error("usage: pack-sitemaps.ts <directory>");
  process.exit(1);
}

mkdirSync(destination, { recursive: true });

for (const locale of LOCALES) {
  const xml = sitemapXml(buildLocaleSitemap(locale));
  if (!xml.includes("<urlset")) {
    console.error(`[cf:build] sitemap ${locale} is not a urlset`);
    process.exit(1);
  }
  const urls = xml.split("<url>").length - 1;
  if (locale === "en" && urls < 1000) {
    console.error(`[cf:build] english sitemap has ${urls} urls; generation did not load the catalog`);
    process.exit(1);
  }
  if (!xml.includes("https://gaf.healthcare") && urls > 0) {
    console.error(`[cf:build] sitemap ${locale} has urls outside https://gaf.healthcare`);
    process.exit(1);
  }
  const file = path.join(destination, `${locale}.xml`);
  writeFileSync(file, xml);
  console.log(`[cf:build] sitemap ${locale}: ${urls} urls, ${Buffer.byteLength(xml)} bytes`);
}
