import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { legacyRedirects } from "../../legacy-redirects.mjs";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { isLegacyGonePath } from "@/lib/legacy-urls";

function parseSimpleCsv(filePath: string) {
  const lines = readFileSync(filePath, "utf8").trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row;
  });
}

test("nested treatment audit enforces verified-only redirect policy", () => {
  const rows = parseSimpleCsv(join(process.cwd(), "docs/seo-nested-treatment-redirect-audit.csv"));
  assert.equal(rows.length, 142);

  const verified = rows.filter((r) => r.confidence === "VERIFIED");
  const candidates = rows.filter((r) => r.confidence === "CANDIDATE");
  const noMatch = rows.filter((r) => r.confidence === "NO_MATCH");

  assert.equal(verified.length, 1);
  assert.equal(candidates.length, 12);
  assert.equal(noMatch.length, 129);

  const legacySources = new Set(legacyRedirects.map((r) => r.source));
  const verifiedPath = new URL(verified[0].old_url).pathname;
  assert.ok(legacySources.has(verifiedPath), "verified pacemaker redirect must stay active");

  for (const row of [...candidates, ...noMatch]) {
    const oldPath = new URL(row.old_url).pathname;
    assert.equal(
      legacySources.has(oldPath),
      false,
      `unverified nested treatment ${oldPath} (${row.confidence}) must not be redirected`,
    );
  }
});

test("Arabic curated treatment destinations for brain-tumor-surgery and spine-tumor-surgery remain unpublished", () => {
  const arSlugs = new Set(publishedCuratedTreatments("ar").map((t) => t.slug));
  assert.equal(arSlugs.has("brain-tumor-surgery-in-india"), false);
  assert.equal(arSlugs.has("spine-tumor-surgery-in-india"), false);
});

test("legacyRedirects destinations do not target 410 Gone paths or unpublished locales", () => {
  for (const rule of legacyRedirects) {
    assert.equal(
      isLegacyGonePath(rule.destination),
      false,
      `redirect destination ${rule.destination} must not return 410`,
    );
    assert.equal(
      /^\/(ru|fr|sw)(\/|$)/.test(rule.destination),
      false,
      `redirect destination ${rule.destination} must not target unpublished locale`,
    );
  }
});

test("410 Gone exact paths and unpublished locales stay absent from EN and AR sitemaps", () => {
  const enPaths = new Set(buildLocaleSitemap("en").map((e) => new URL(e.url).pathname));
  const arPaths = new Set(buildLocaleSitemap("ar").map((e) => new URL(e.url).pathname));
  const legacyUrlsSrc = readFileSync(join(process.cwd(), "src/lib/legacy-urls.ts"), "utf8");
  const gonePaths = [...legacyUrlsSrc.matchAll(/"(\/(?:doctors|hospitals)\/[^"]+)"/g)].map(
    (m) => m[1],
  );

  assert.equal(gonePaths.length, 40);
  for (const path of gonePaths) {
    assert.equal(enPaths.has(path), false, `${path} is 410 Gone and must not be in EN sitemap`);
    assert.equal(arPaths.has(`/ar${path}`), false, `${path} must not be in AR sitemap`);
  }
  for (const p of [...enPaths, ...arPaths]) {
    assert.equal(/^\/(ru|fr|sw)(\/|$)/.test(p), false, `unpublished locale in sitemap: ${p}`);
  }
});
