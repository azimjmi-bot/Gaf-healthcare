#!/usr/bin/env node
/**
 * Capture what a crawler receives from a running server and diff it against
 * an earlier capture. Used to prove that a framework upgrade or a hosting
 * change left every public surface byte-equivalent once volatile tokens
 * (build id, chunk hashes, nonces, flight payload) are normalised.
 *
 *   node scripts/check/ssr-snapshot.mjs --base http://localhost:43129 --out /tmp/before.json
 *   node scripts/check/ssr-snapshot.mjs --base http://localhost:43129 --compare /tmp/before.json
 *   node scripts/check/ssr-snapshot.mjs --base ... --compare before.json --html-dir /tmp/snap-html
 *
 * Every request carries a `gaf_snapshot` cookie so the origin HTML cache is
 * bypassed and the document is rendered by the framework on each capture.
 * The server must be started with a hostname that matches `--base`
 * (`next start -H localhost` for http://localhost:PORT); otherwise Next treats
 * the proxy's locale rewrite as external and /ar pages render in English.
 *
 * Sitemap responses are compared element by element (scripts/check/sitemap-parity.mjs):
 * URL set and order, namespaces, changefreq, priority and images must match,
 * and a <lastmod> may only move to a time inside the window between the two
 * captures, which is what render-time timestamps do. Anything else is a diff.
 *
 * Exits 1 when `--compare` finds any difference or a fetch fails.
 */

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { compareSitemaps } from "./sitemap-parity.mjs";

const args = process.argv.slice(2);
function flag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

const BASE = flag("base", process.env.SSR_CHECK_BASE || "http://localhost:43129").replace(/\/$/, "");
const OUT = flag("out", "");
const COMPARE = flag("compare", "");
const HTML_DIR = flag("html-dir", "");
const URL_FILE = flag("urls", "");
const TIMEOUT_MS = Number(flag("timeout", "120000"));
const CONCURRENCY = Number(flag("concurrency", "2"));

/**
 * Public surfaces by family. Profile slugs are the first entries of their
 * directories at the time of writing; a 404 on one of them is itself a diff
 * worth seeing, so they are not discovered dynamically.
 */
const DEFAULT_PATHS = [
  "/",
  "/doctors",
  "/doctors/india",
  "/doctors/india/radiation-oncology",
  "/doctors/india/delhi-ncr/radiation-oncology",
  "/doctors/india/radiation-oncology?page=2",
  "/doctors/dr-anbarasi-kumaresan",
  "/hospitals",
  "/hospitals/india",
  "/hospitals/india/radiation-oncology",
  "/hospitals/apollo-proton-cancer-centre",
  "/costs",
  "/costs/india",
  "/costs/india/bariatric-surgery",
  "/costs/india/bariatric-surgery/gastric-balloon",
  "/treatments",
  "/treatments/breast-cancer-treatment-in-india",
  "/treatments/prostate-cancer-treatment-in-india",
  "/blogs",
  "/blogs/best-hospitals-pediatric-heart-surgery-india",
  "/blogs/asd-closure-in-children",
  "/specialties",
  "/kenya/treatment-in-india",
  "/ar",
  "/ar/doctors/india/radiation-oncology",
  "/ar/doctors/india/radiation-oncology?page=2",
  "/ar/doctors/dr-anbarasi-kumaresan",
  "/ar/hospitals",
  "/ar/hospitals/apollo-proton-cancer-centre",
  "/ar/costs/india",
  "/ar/treatments/breast-cancer-treatment-in-india",
  "/ar/blogs/asd-closure-in-children",
  "/fr/hospitals",
  "/robots.txt",
  "/sitemap.xml",
  "/sitemap_index.xml",
  "/sitemap-en.xml",
  "/sitemap-ar.xml",
  "/sitemap-blogs.xml",
  // Redirects: next.config, legacyRedirects, proxy canonicalisation.
  "/destinations",
  "/doctor/dr-naresh-trehan",
  "/wp-sitemap.xml",
  "/doctors/india/Radiation-Oncology",
  "/ar/cms",
  // 410s from src/proxy.ts and the app's own 404.
  "/wp-admin",
  "/blogs/asd-closure-in-children/feed",
  "/index.php",
  "/this-page-does-not-exist",
  // CMS gate: unauthenticated requests are redirected to the login page.
  "/cms",
  "/api/cms/state",
];

function readPaths(file) {
  return readFileSync(file, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

const PATHS = URL_FILE ? readPaths(URL_FILE) : DEFAULT_PATHS;

const HEADERS_OF_INTEREST = [
  "content-type",
  "location",
  "cache-control",
  "cdn-cache-control",
  "x-robots-tag",
  "x-gaf-locale",
  "vary",
  "link",
];

async function fetchDocument(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${BASE}${path}`, {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) gaf-ssr-snapshot",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        cookie: "gaf_snapshot=1",
      },
    });
    const body = await response.text();
    const headers = {};
    for (const name of HEADERS_OF_INTEREST) {
      const value = response.headers.get(name);
      if (value !== null) headers[name] = value;
    }
    return { status: response.status, headers, body };
  } finally {
    clearTimeout(timer);
  }
}

function sha(text) {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

/**
 * Remove or tokenise everything that legitimately changes between two builds
 * of identical source: hashed asset names, the build id, nonces, React's
 * flight payload and inline bootstrap scripts (JSON-LD is kept and compared
 * separately), and HTML comments.
 */
function normaliseHtml(html, buildLabel) {
  let out = html;
  if (buildLabel) out = out.split(buildLabel).join("__BUILD__");
  return out
    .replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/_next\/static\/(chunks|css|media)\/[^"' )]+/g, "/_next/static/$1/__ASSET__")
    .replace(/\/_next\/static\/[A-Za-z0-9_-]+\/_(buildManifest|ssgManifest)\.js/g, "/_next/static/__BUILD__/_$1.js")
    .replace(/\bnonce="[^"]*"/g, 'nonce="__NONCE__"')
    .replace(/\bid="(:[A-Za-z0-9]+:|«[^»]*»|_R_[A-Za-z0-9_]+_)"/g, 'id="__REACT_ID__"')
    .replace(/\b(aria-(?:controls|labelledby|describedby)|for|href="#)(=?"?)(:[A-Za-z0-9]+:|«[^»]*»|_R_[A-Za-z0-9_]+_)/g, "$1$2__REACT_ID__")
    .replace(/<link rel="preload" as="(script|style|font)"[^>]*>/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    try {
      blocks.push(JSON.stringify(JSON.parse(match[1])));
    } catch {
      blocks.push(`__INVALID__:${match[1].trim().slice(0, 200)}`);
    }
  }
  return blocks.sort();
}

function pick(re, text) {
  return text.match(re)?.[1] ?? "";
}

function analyse(path, response) {
  const { body, headers } = response;
  const isHtml = /text\/html/.test(headers["content-type"] || "");
  const buildLabel = pick(/\/_next\/static\/([A-Za-z0-9_-]{8,})\/_buildManifest\.js/, body);
  const normalised = isHtml ? normaliseHtml(body, buildLabel) : body;
  const isSitemap = /xml/.test(headers["content-type"] || "") && /<(urlset|sitemapindex)\b/.test(body);
  const htmlTag = body.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const alternates = [...body.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/gi)]
    .map(([, lang, href]) => `${lang} ${href}`)
    .sort();
  const text = normalised
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    path,
    status: response.status,
    headers,
    lang: pick(/\blang="([^"]*)"/, htmlTag),
    dir: pick(/\bdir="([^"]*)"/, htmlTag),
    title: pick(/<title>([\s\S]*?)<\/title>/i, body).trim(),
    description: pick(/<meta name="description" content="([^"]*)"/i, body),
    robots: pick(/<meta name="robots" content="([^"]*)"/i, body),
    canonical: pick(/<link rel="canonical" href="([^"]*)"/i, body),
    alternates,
    h1: pick(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i, normalised).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    jsonLd: isHtml ? extractJsonLd(body) : [],
    textChars: text.length,
    // Sitemaps are compared structurally (see compareSitemaps) because their
    // <lastmod> values are render times; a raw hash would differ on every run.
    textHash: isSitemap ? "sitemap" : sha(text),
    bodyHash: isSitemap ? "sitemap" : sha(normalised),
    sitemap: isSitemap,
    bytes: Buffer.byteLength(body),
    normalised,
  };
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function fileNameFor(path) {
  return `${path.replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+/, "") || "root"}.html`;
}

function firstDifference(a, b) {
  const left = a.split("\n");
  const right = b.split("\n");
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (left[i] !== right[i]) {
      return {
        line: i + 1,
        before: (left[i] ?? "<missing>").slice(0, 240),
        after: (right[i] ?? "<missing>").slice(0, 240),
      };
    }
  }
  return null;
}

const COMPARED_FIELDS = [
  "status",
  "headers",
  "lang",
  "dir",
  "title",
  "description",
  "robots",
  "canonical",
  "alternates",
  "h1",
  "jsonLd",
  "textHash",
  "bodyHash",
];

/** Older snapshots predate the `sitemap` flag; derive it from the stored body. */
function isSitemapEntry(entry) {
  if (typeof entry.sitemap === "boolean") return entry.sitemap;
  return /xml/.test(entry.headers?.["content-type"] || "") && /<(urlset|sitemapindex)\b/.test(entry.normalised || "");
}

function compare(before, after) {
  const problems = [];
  const drift = [];
  const beforeByPath = new Map(before.entries.map((entry) => [entry.path, entry]));
  const window =
    before.capturedAt && after.capturedAt
      ? { from: Date.parse(before.capturedAt) - (before.durationMs ?? 0), to: Date.parse(after.capturedAt) }
      : undefined;
  for (const entry of after.entries) {
    const previous = beforeByPath.get(entry.path);
    if (!previous) {
      problems.push({ path: entry.path, field: "path", before: "<absent>", after: "<present>" });
      continue;
    }
    const sitemapAfter = isSitemapEntry(entry);
    const sitemapBefore = isSitemapEntry(previous);
    if (sitemapAfter || sitemapBefore) {
      if (!(sitemapAfter && sitemapBefore)) {
        problems.push({ path: entry.path, field: "sitemap", before: String(sitemapBefore), after: String(sitemapAfter) });
        continue;
      }
      if (JSON.stringify(previous.status) !== JSON.stringify(entry.status)) {
        problems.push({ path: entry.path, field: "status", before: previous.status, after: entry.status });
      }
      if (JSON.stringify(previous.headers) !== JSON.stringify(entry.headers)) {
        problems.push({ path: entry.path, field: "headers", before: JSON.stringify(previous.headers), after: JSON.stringify(entry.headers) });
      }
      let result;
      try {
        result = compareSitemaps(previous.normalised, entry.normalised, { window });
      } catch (error) {
        problems.push({ path: entry.path, field: "sitemap", before: "parsed", after: error.message });
        continue;
      }
      for (const problem of result.problems) {
        problems.push({ path: entry.path, field: `sitemap.${problem.field}`, before: `${problem.loc} ${problem.before}`, after: `${problem.loc} ${problem.after}` });
      }
      drift.push({ path: entry.path, urls: result.urls, lastmod: result.drift.length });
      continue;
    }
    for (const field of COMPARED_FIELDS) {
      const a = JSON.stringify(previous[field]);
      const b = JSON.stringify(entry[field]);
      if (a === b) continue;
      const problem = { path: entry.path, field, before: a, after: b };
      if (field === "bodyHash" && previous.normalised && entry.normalised) {
        problem.diff = firstDifference(previous.normalised, entry.normalised);
      }
      problems.push(problem);
    }
  }
  return { problems, drift };
}

async function main() {
  const started = Date.now();
  const entries = await mapLimit(PATHS, CONCURRENCY, async (path) => {
    try {
      const response = await fetchDocument(path);
      const entry = analyse(path, response);
      console.log(`${String(entry.status).padEnd(4)} ${String(Math.round(entry.bytes / 1024)).padStart(5)} KB  ${path}`);
      return entry;
    } catch (error) {
      console.log(`ERR  ${path}  ${error.message}`);
      return { path, status: 0, error: error.message, headers: {}, jsonLd: [], alternates: [] };
    }
  });

  if (HTML_DIR) {
    mkdirSync(HTML_DIR, { recursive: true });
    for (const entry of entries) {
      if (entry.normalised) writeFileSync(join(HTML_DIR, fileNameFor(entry.path)), entry.normalised);
    }
  }

  const snapshot = {
    base: BASE,
    capturedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
    entries,
  };

  if (OUT) {
    writeFileSync(OUT, JSON.stringify(snapshot, null, 2));
    console.log(`\nWrote ${entries.length} entries to ${OUT}`);
  }

  const failed = entries.filter((entry) => entry.status === 0);
  if (failed.length) {
    console.error(`\n${failed.length} request(s) failed`);
    process.exitCode = 1;
  }

  if (COMPARE) {
    const before = JSON.parse(readFileSync(COMPARE, "utf8"));
    const { problems, drift } = compare(before, snapshot);
    for (const row of drift) {
      console.log(`\n${row.path}  sitemap: ${row.urls} URLs structurally identical, ${row.lastmod} <lastmod> value(s) moved inside the capture window`);
    }
    if (problems.length === 0) {
      console.log(`\nNo differences against ${COMPARE} (${entries.length} URLs, ${COMPARED_FIELDS.length} fields each; sitemaps compared element by element).`);
      return;
    }
    console.log(`\n${problems.length} difference(s) against ${COMPARE}:`);
    for (const problem of problems) {
      console.log(`\n${problem.path}  [${problem.field}]`);
      if (problem.diff) {
        console.log(`  first differing line ${problem.diff.line}`);
        console.log(`  - ${problem.diff.before}`);
        console.log(`  + ${problem.diff.after}`);
      } else {
        console.log(`  - ${String(problem.before).slice(0, 400)}`);
        console.log(`  + ${String(problem.after).slice(0, 400)}`);
      }
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
