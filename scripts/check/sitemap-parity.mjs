#!/usr/bin/env node
/**
 * Deterministic sitemap comparison.
 *
 * Sitemaps carry `<lastmod>` values that are the render time for pages whose
 * freshness is not content-derived, so two captures of the same code are
 * never byte-identical. Hashing the whole document therefore either fails on
 * every run or, if `<lastmod>` is stripped, hides a dropped or broken value.
 *
 * This module parses both documents and compares them element by element:
 *
 *   fatal        namespace or declaration changed; a URL added, removed or
 *                reordered; changefreq, priority, image or any other child
 *                differs; a `<lastmod>` appeared or disappeared; a `<lastmod>`
 *                is not a valid W3C datetime or lies in the future
 *   tolerated    a `<lastmod>` value changed to a time inside the capture
 *                window (between the earlier capture and the later one),
 *                which is exactly what a "now" timestamp does
 *   fatal        a `<lastmod>` value changed to a time outside that window:
 *                a content-derived date moved, which is a regression or an
 *                edit that must be explained
 *
 * Without capture timestamps every `<lastmod>` change is tolerated and
 * reported as drift so a raw file comparison still works.
 *
 *   node scripts/check/sitemap-parity.mjs --before /tmp/a/sitemap-en.xml --after http://localhost:43129/sitemap-en.xml
 */

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const DECLARATION = /^<\?xml[^>]*\?>/;
const W3C_DATETIME =
  /^(\d{4})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?)?)?$/;

function text(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return match ? match[1] : undefined;
}

function children(block, drop) {
  let rest = block;
  for (const tag of drop) rest = rest.replace(new RegExp(`<${tag}>[^<]*</${tag}>`, "g"), "");
  return rest.trim();
}

/** Parse a urlset or sitemapindex produced by `sitemapXml` / `sitemapIndexXml`. */
export function parseSitemap(xml) {
  const declaration = xml.match(DECLARATION)?.[0] ?? "";
  const root = xml.match(/<(urlset|sitemapindex)\b([^>]*)>/);
  if (!root) throw new Error("not a sitemap: no <urlset> or <sitemapindex> root");
  const kind = root[1];
  const namespaces = root[2].trim();
  const itemTag = kind === "urlset" ? "url" : "sitemap";
  const items = [];
  const re = new RegExp(`<${itemTag}>([\\s\\S]*?)</${itemTag}>`, "g");
  let match;
  while ((match = re.exec(xml))) {
    const block = match[1];
    const loc = text(block, "loc");
    if (loc === undefined) throw new Error(`<${itemTag}> without <loc>`);
    items.push({
      loc,
      lastmod: text(block, "lastmod"),
      changefreq: text(block, "changefreq"),
      priority: text(block, "priority"),
      images: [...block.matchAll(/<image:loc>([^<]*)<\/image:loc>/g)].map((m) => m[1]),
      other: children(block, ["loc", "lastmod", "changefreq", "priority"]).replace(
        /<image:image>[\s\S]*?<\/image:image>/g,
        "",
      ),
    });
  }
  const tail = xml.slice(xml.lastIndexOf(`</${kind}>`) + kind.length + 3).trim();
  return { declaration, kind, namespaces, items, trailing: tail };
}

/** `Date.parse` for a W3C datetime; `null` when the value is not one. */
export function parseLastmod(value) {
  if (typeof value !== "string" || !W3C_DATETIME.test(value)) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

/**
 * Compare two sitemap documents.
 *
 * `window` is `{ from, to }` in epoch ms: the earlier capture time and the
 * later one. `skewMs` widens it on both sides for clock differences.
 */
export function compareSitemaps(beforeXml, afterXml, { window, skewMs = 5 * 60_000, now = Date.now() } = {}) {
  const before = parseSitemap(beforeXml);
  const after = parseSitemap(afterXml);
  const problems = [];
  const drift = [];
  const fail = (loc, field, a, b) => problems.push({ loc, field, before: a, after: b });

  if (before.declaration !== after.declaration) fail("", "declaration", before.declaration, after.declaration);
  if (before.kind !== after.kind) fail("", "root", before.kind, after.kind);
  if (before.namespaces !== after.namespaces) fail("", "namespaces", before.namespaces, after.namespaces);
  if (before.trailing !== after.trailing) fail("", "trailing", before.trailing, after.trailing);

  const beforeLocs = before.items.map((item) => item.loc);
  const afterLocs = after.items.map((item) => item.loc);
  const beforeSet = new Set(beforeLocs);
  const afterSet = new Set(afterLocs);
  for (const loc of beforeLocs) if (!afterSet.has(loc)) fail(loc, "url", "<present>", "<absent>");
  for (const loc of afterLocs) if (!beforeSet.has(loc)) fail(loc, "url", "<absent>", "<present>");
  const sharedBefore = beforeLocs.filter((loc) => afterSet.has(loc));
  const sharedAfter = afterLocs.filter((loc) => beforeSet.has(loc));
  const reordered = sharedBefore.findIndex((loc, index) => sharedAfter[index] !== loc);
  if (reordered !== -1) fail(sharedBefore[reordered], "order", `position ${reordered}`, `position ${sharedAfter.indexOf(sharedBefore[reordered])}`);
  const duplicates = afterLocs.filter((loc, index) => afterLocs.indexOf(loc) !== index);
  for (const loc of new Set(duplicates)) fail(loc, "duplicate", "once", `${afterLocs.filter((l) => l === loc).length} times`);

  const afterByLoc = new Map(after.items.map((item) => [item.loc, item]));
  for (const a of before.items) {
    const b = afterByLoc.get(a.loc);
    if (!b) continue;
    for (const field of ["changefreq", "priority", "other"]) {
      if (a[field] !== b[field]) fail(a.loc, field, a[field], b[field]);
    }
    if (a.images.join("|") !== b.images.join("|")) fail(a.loc, "images", a.images.join(" "), b.images.join(" "));

    if ((a.lastmod === undefined) !== (b.lastmod === undefined)) {
      fail(a.loc, "lastmod", a.lastmod ?? "<absent>", b.lastmod ?? "<absent>");
      continue;
    }
    if (b.lastmod === undefined || a.lastmod === b.lastmod) continue;
    const ms = parseLastmod(b.lastmod);
    if (ms === null) {
      fail(a.loc, "lastmod", a.lastmod, `${b.lastmod} (not a W3C datetime)`);
    } else if (ms > now + skewMs) {
      fail(a.loc, "lastmod", a.lastmod, `${b.lastmod} (in the future)`);
    } else if (window && (ms < window.from - skewMs || ms > window.to + skewMs)) {
      fail(a.loc, "lastmod", a.lastmod, `${b.lastmod} (outside the capture window)`);
    } else {
      drift.push({ loc: a.loc, before: a.lastmod, after: b.lastmod });
    }
  }

  return { problems, drift, urls: after.items.length };
}

async function load(source) {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source, { headers: { cookie: "gaf_snapshot=1" } });
    if (!response.ok) throw new Error(`${source} → ${response.status}`);
    return response.text();
  }
  return readFileSync(source, "utf8");
}

async function main() {
  const args = process.argv.slice(2);
  const flag = (name) => {
    const index = args.indexOf(`--${name}`);
    return index === -1 ? undefined : args[index + 1];
  };
  const beforeSource = flag("before");
  const afterSource = flag("after");
  if (!beforeSource || !afterSource) {
    console.error("usage: sitemap-parity.mjs --before <file|url> --after <file|url> [--from ISO --to ISO]");
    process.exit(2);
  }
  const from = flag("from");
  const to = flag("to");
  const window = from && to ? { from: Date.parse(from), to: Date.parse(to) } : undefined;
  const [beforeXml, afterXml] = await Promise.all([load(beforeSource), load(afterSource)]);
  const result = compareSitemaps(beforeXml, afterXml, { window });
  for (const problem of result.problems) {
    console.log(`${problem.field.padEnd(12)} ${problem.loc}\n  - ${problem.before}\n  + ${problem.after}`);
  }
  console.log(
    `${result.urls} URLs, ${result.problems.length} problem(s), ${result.drift.length} lastmod value(s) ${window ? "moved inside the capture window" : "changed"}.`,
  );
  process.exitCode = result.problems.length ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
