/**
 * Builds the Arabic publication index Worker asset used so English catalogue
 * routes can emit hreflang without hydrating the full Arabic R2 edition.
 *
 * Staleness model matches packed sitemaps: refreshed on the next production
 * `cf:build` / deploy after CMS publication changes.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { buildArPublicationIndexDocument } from "../../src/lib/i18n/ar-publication-index";
import { canonicalFacetPath } from "../../src/lib/i18n/facet-canonical";
import { localePathIsPublished } from "../../src/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "../../src/lib/i18n/sitemap-entries";

const ORIGIN = "https://gaf.healthcare";
const out = process.argv[2];
if (!out) {
  console.error("usage: pack-ar-publication-index.ts <file>");
  process.exit(1);
}

const entries = buildLocaleSitemap("ar");
const paths: string[] = [];
for (const entry of entries) {
  const loc = entry.url;
  if (!loc.startsWith(`${ORIGIN}/ar`) && loc !== `${ORIGIN}/ar`) continue;
  const englishPath =
    loc === `${ORIGIN}/ar` || loc === `${ORIGIN}/ar/`
      ? "/"
      : loc.slice(`${ORIGIN}/ar`.length) || "/";
  if (!localePathIsPublished("ar", englishPath)) continue;
  if (canonicalFacetPath(englishPath, "ar").toLowerCase() !== englishPath.toLowerCase()) continue;
  paths.push(englishPath);
}

const document = buildArPublicationIndexDocument(paths);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(document)}\n`);
console.log(
  `[cf:build] ar publication index: ${document.paths.length} paths, ${Buffer.byteLength(JSON.stringify(document))} bytes`,
);
