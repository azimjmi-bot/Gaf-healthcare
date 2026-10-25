#!/usr/bin/env node
/**
 * Runs after `opennextjs-cloudflare build` (npm run cf:build).
 *
 * 1. Removes `uploads/` from the Worker assets. CMS media is served from the
 *    STATIC R2 bucket only, so an upload or deletion made through the CMS is
 *    live on the next request; a copy baked into the deploy would keep
 *    serving deleted files until the next release.
 * 2. Checks that the one `public/` file the renderer reads at request time
 *    (the Arabic radiation stylesheet) shipped as a Worker asset, since the
 *    R2 backend loads it from the ASSETS binding during hydration.
 * 3. Copies the static doctor/hospital catalog (`src/data/ginger-catalog.json`)
 *    into the assets under `/_gaf/` so the Worker can load it through the
 *    ASSETS binding at hydration (src/lib/catalog-seed.ts). wrangler.jsonc
 *    routes `/_gaf/*` to the Worker, which answers 404, so the file is part of
 *    the deploy without being a public URL. Also checks the catalog did not
 *    get bundled into the server script after all.
 * 4. Rewrites every non-ASCII character left in the generated JavaScript as a
 *    `\uXXXX` escape. esbuild already escapes strings and identifiers, but it
 *    copies regular-expression literals verbatim, and a handful of Arabic
 *    regexes (`/[,،]/`, `/أسئلة شائعة/`, ...) were enough to make V8 store the
 *    whole ~30 MB Worker script as a two-byte string: the code alone then
 *    costs ~62 MiB of the 128 MiB isolate. `\uXXXX` is the same code unit in
 *    a regex, a string or a comment, so behaviour is unchanged; only the
 *    in-memory representation of the script halves.
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const assets = path.join(root, ".open-next", "assets");
const worker = path.join(root, ".open-next", "worker.js");

if (!existsSync(worker) || !existsSync(assets)) {
  console.error("[cf:build] .open-next/ is incomplete; run `npx opennextjs-cloudflare build` first.");
  process.exit(1);
}

const uploads = path.join(assets, "uploads");
if (existsSync(uploads)) {
  rmSync(uploads, { recursive: true, force: true });
  console.log("[cf:build] removed uploads/ from Worker assets (media is served from the STATIC bucket)");
}

const stylesheet = path.join(assets, "ar-ro-directory.css");
if (!existsSync(stylesheet) || statSync(stylesheet).size === 0) {
  console.error("[cf:build] public/ar-ro-directory.css did not ship as a Worker asset; the Arabic radiation pages need it.");
  process.exit(1);
}
console.log(`[cf:build] ar-ro-directory.css is a Worker asset (${statSync(stylesheet).size} bytes)`);

const CATALOG_KEY = "src/data/ginger-catalog.json";
const catalogSource = path.join(root, CATALOG_KEY);
const catalogAsset = path.join(assets, "_gaf", CATALOG_KEY);
if (!existsSync(catalogSource) || statSync(catalogSource).size === 0) {
  console.error(`[cf:build] ${CATALOG_KEY} is missing; the Worker cannot serve doctors or hospitals without it.`);
  process.exit(1);
}
mkdirSync(path.dirname(catalogAsset), { recursive: true });
copyFileSync(catalogSource, catalogAsset);
console.log(`[cf:build] ${CATALOG_KEY} copied to assets/_gaf/ (${statSync(catalogAsset).size} bytes, served only through the ASSETS binding)`);

const handler = path.join(root, ".open-next", "server-functions", "default", "handler.mjs");
const firstDoctorSlug = JSON.parse(readFileSync(catalogSource, "utf8")).doctors[0]?.slug;
if (firstDoctorSlug && readFileSync(handler, "utf8").includes(`"${firstDoctorSlug}"`)) {
  console.error(`[cf:build] ${CATALOG_KEY} is bundled into handler.mjs; a static import of it must have come back (see src/lib/catalog-seed.ts).`);
  process.exit(1);
}
console.log("[cf:build] the server bundle does not embed the catalog");

const COST_KEY = "src/data/cost-articles.pack";
const costAsset = path.join(assets, "_gaf", COST_KEY);
const tsx = path.join(root, "node_modules", ".bin", "tsx");
const packed = spawnSync(tsx, ["scripts/cloudflare/pack-cost-articles.ts", costAsset], {
  cwd: root,
  stdio: "inherit",
});
if (packed.status !== 0) {
  console.error("[cf:build] cost-article pack failed");
  process.exit(packed.status ?? 1);
}
if (!existsSync(costAsset) || statSync(costAsset).size === 0) {
  console.error(`[cf:build] ${COST_KEY} was not written`);
  process.exit(1);
}
const marker = "broader kidney-care ecosystem";
if (readFileSync(handler, "utf8").includes(marker)) {
  console.error(
    "[cf:build] cost-article prose is still bundled into handler.mjs; the Cloudflare build must use external-registry.ts",
  );
  process.exit(1);
}
console.log(`[cf:build] ${COST_KEY} is a Worker asset (${statSync(costAsset).size} bytes) and is not in the server bundle`);

const NON_ASCII = /[^\x00-\x7f]/g;
const toEscape = (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`;

function* scripts(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Traced `node_modules/` and `.next/` copies are inputs OpenNext has
      // already bundled into handler.mjs; wrangler never reads them.
      if (file !== assets && entry.name !== "node_modules" && entry.name !== ".next") yield* scripts(file);
    } else if (/\.(m|c)?js$/.test(entry.name)) {
      yield file;
    }
  }
}

let rewrittenFiles = 0;
let rewrittenChars = 0;
for (const file of scripts(path.join(root, ".open-next"))) {
  const source = readFileSync(file, "utf8");
  if (!NON_ASCII.test(source)) continue;
  NON_ASCII.lastIndex = 0;
  const count = source.match(NON_ASCII).length;
  // Per UTF-16 code unit on purpose: a surrogate pair written as two `\u`
  // escapes is read back as one code point by `u`-flag regexes and as the same
  // two code units everywhere else.
  writeFileSync(file, source.replace(NON_ASCII, toEscape));
  rewrittenFiles += 1;
  rewrittenChars += count;
}
console.log(
  `[cf:build] escaped ${rewrittenChars} non-ASCII character(s) in ${rewrittenFiles} generated script(s) so the Worker source stays one byte per character`,
);
