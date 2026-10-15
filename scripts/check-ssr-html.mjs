#!/usr/bin/env node
/**
 * Verify that pages deliver their written content as server-rendered HTML.
 *
 * For every URL the script fetches the document exactly as a crawler would
 * (no JavaScript), strips <script>/<style>/<noscript> blocks and then checks
 * what is left: the <h1> and its text, the amount of visible prose, FAQ
 * markup where the page is expected to carry one, Arabic script and RTL on
 * /ar pages, and the current pagination number where a page is requested.
 * It reports whether a React flight payload (self.__next_f) is present, which
 * is informational: App Router HTML carries one, the static Arabic documents
 * do not, and both are crawler-visible.
 *
 *   npm run check:ssr                              # against http://127.0.0.1:43127
 *   npm run check:ssr -- --base https://gaf.healthcare
 *   npm run check:ssr -- --urls my-urls.txt        # one path per line, "# faq" / "# page=2" flags
 *   npm run check:ssr -- --json report.json
 *
 * Exits 1 when any page fails a required check.
 */

import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
function flag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

const BASE = flag("base", process.env.SSR_CHECK_BASE || "http://127.0.0.1:43127").replace(/\/$/, "");
const TIMEOUT_MS = Number(flag("timeout", "90000"));
const CONCURRENCY = Number(flag("concurrency", "3"));
const JSON_OUT = flag("json", "");
const URL_FILE = flag("urls", "");

/** @typedef {{ path: string; faq?: boolean; page?: number; status?: number[]; minText?: number }} Target */

/** @type {Target[]} */
const DEFAULT_TARGETS = [
  { path: "/" },
  { path: "/doctors" },
  { path: "/doctors/India" },
  { path: "/doctors/India/Radiation-Oncology", faq: true },
  { path: "/doctors/India/Delhi-NCR/Radiation-Oncology", faq: true },
  { path: "/doctors/India/Medical-Oncology", faq: true },
  { path: "/doctors/India/Radiation-Oncology?page=2", page: 2 },
  { path: "/hospitals" },
  { path: "/hospitals/India" },
  { path: "/hospitals/India/Radiation-Oncology" },
  { path: "/costs" },
  { path: "/costs/India" },
  { path: "/treatments" },
  { path: "/blogs" },
  { path: "/ar" },
  { path: "/ar/doctors", faq: true },
  { path: "/ar/doctors/India", faq: true },
  { path: "/ar/doctors/India/Radiation-Oncology", faq: true },
  { path: "/ar/doctors/India/Delhi-NCR/Radiation-Oncology", faq: true },
  { path: "/ar/doctors/India/Medical-Oncology", faq: true },
  { path: "/ar/doctors/India/Neurosurgery", faq: true },
  { path: "/ar/doctors/India/Radiation-Oncology?page=2", page: 2 },
  { path: "/ar/doctors/India/Medical-Oncology?page=2", page: 2 },
  { path: "/ar/hospitals", faq: true },
  { path: "/ar/hospitals/India", faq: true },
  { path: "/ar/costs", faq: true },
  { path: "/ar/costs/India", faq: true },
  // Unpublished Arabic surfaces 404 by design (locale-publication.ts); a 200
  // here would mean they went live and should then carry content too.
  { path: "/ar/treatments", status: [200, 404] },
  { path: "/ar/blogs", status: [200, 404] },
];

/**
 * Profile pages are discovered from a directory so the list does not hard-code
 * a doctor or hospital slug that the CMS might later unpublish.
 */
const DISCOVERY = [
  { from: "/doctors/India/Radiation-Oncology", pattern: /href="(\/doctors\/[a-z0-9-]+)"/, locales: ["", "/ar"] },
  { from: "/hospitals/India", pattern: /href="(\/hospitals\/[a-z0-9-]+)"/, locales: ["", "/ar"] },
];

function parseUrlFile(file) {
  return readFileSync(file, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [path, ...rest] = line.split(/\s+#\s*/);
      const flags = rest.join(" ");
      /** @type {Target} */
      const target = { path };
      if (/\bfaq\b/.test(flags)) target.faq = true;
      const page = flags.match(/page=(\d+)/);
      if (page) target.page = Number(page[1]);
      return target;
    });
}

async function fetchDocument(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = performance.now();
  try {
    const response = await fetch(`${BASE}${path}`, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "user-agent": "gaf-ssr-check/1.0 (+crawler-html audit)", accept: "text/html" },
    });
    const html = await response.text();
    return {
      status: response.status,
      location: response.headers.get("location"),
      html,
      ms: Math.round(performance.now() - started),
      bytes: Buffer.byteLength(html),
    };
  } finally {
    clearTimeout(timer);
  }
}

function stripNonContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function textOf(markup) {
  return markup
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ARABIC = /[\u0600-\u06FF]/;

function analyse(target, response) {
  const isArabic = target.path === "/ar" || target.path.startsWith("/ar/");
  const visible = stripNonContent(response.html);
  const text = textOf(visible);
  const h1Match = visible.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? textOf(h1Match[1]) : "";
  const htmlTag = response.html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const lang = htmlTag.match(/\blang="([^"]*)"/)?.[1] ?? "";
  const dir = htmlTag.match(/\bdir="([^"]*)"/)?.[1] ?? "";
  const faqJsonLd = /"@type"\s*:\s*"FAQPage"/.test(response.html);
  const faqHeadings = (visible.match(/<h3\b/gi) ?? []).length;
  const faqHeadingText = /أسئلة شائعة|Frequently asked|FAQ/i.test(text);
  const flight = response.html.includes("self.__next_f");
  const current = visible.match(/aria-current="page"[^>]*>\s*(\d+)\s*</)?.[1];
  const robots = response.html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  const canonical = response.html.match(/rel="canonical" href="([^"]*)"/)?.[1] ?? "";

  const failures = [];
  const allowed = target.status ?? [200];
  if (!allowed.includes(response.status)) {
    failures.push(`status ${response.status}${response.location ? ` → ${response.location}` : ""}`);
  }
  if (response.status === 200) {
    if (!h1) failures.push("no <h1> text in HTML");
    if (text.length < (target.minText ?? 400)) failures.push(`only ${text.length} chars of visible text`);
    if (isArabic) {
      if (lang !== "ar") failures.push(`html lang="${lang}"`);
      if (dir !== "rtl") failures.push(`html dir="${dir}"`);
      if (h1 && !ARABIC.test(h1)) failures.push("H1 is not Arabic");
    }
    if (target.faq && !faqJsonLd && !(faqHeadingText && faqHeadings >= 3)) {
      failures.push("FAQ content missing from HTML");
    }
    if (target.page && current !== String(target.page)) {
      failures.push(`pager shows page ${current ?? "?"} not ${target.page}`);
    }
  }

  return {
    path: target.path,
    status: response.status,
    ms: response.ms,
    kb: Math.round(response.bytes / 1024),
    h1,
    textChars: text.length,
    faq: faqJsonLd ? "jsonld" : faqHeadingText ? `headings(${faqHeadings})` : "-",
    flight,
    page: current ?? "",
    robots,
    canonical,
    failures,
  };
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function discoverTargets() {
  const found = [];
  for (const rule of DISCOVERY) {
    try {
      const response = await fetchDocument(rule.from);
      const match = response.html.match(rule.pattern);
      if (!match) continue;
      for (const prefix of rule.locales) found.push({ path: `${prefix}${match[1]}` });
    } catch {
      // The directory itself is in the default list and will report the error.
    }
  }
  return found;
}

function pad(value, width) {
  const text = String(value);
  return text.length >= width ? text : text + " ".repeat(width - text.length);
}

async function main() {
  const targets = URL_FILE ? parseUrlFile(URL_FILE) : [...DEFAULT_TARGETS, ...(await discoverTargets())];
  console.log(`Checking ${targets.length} URLs against ${BASE}\n`);

  const rows = await mapLimit(targets, CONCURRENCY, async (target) => {
    try {
      return analyse(target, await fetchDocument(target.path));
    } catch (error) {
      return {
        path: target.path,
        status: 0,
        ms: 0,
        kb: 0,
        h1: "",
        textChars: 0,
        faq: "-",
        flight: false,
        page: "",
        robots: "",
        canonical: "",
        failures: [`fetch failed: ${error instanceof Error ? error.message : String(error)}`],
      };
    }
  });

  for (const row of rows) {
    const mark = row.failures.length ? "FAIL" : "ok  ";
    console.log(
      `${mark} ${pad(row.status, 4)} ${pad(`${row.ms}ms`, 8)} ${pad(`${row.kb}KB`, 7)} ${pad(row.flight ? "flight" : "static", 7)} ${pad(row.faq, 13)} ${pad(row.page || "-", 3)} ${row.path}`,
    );
    if (row.h1) console.log(`       H1: ${row.h1.slice(0, 110)}`);
    for (const failure of row.failures) console.log(`       ! ${failure}`);
  }

  const failed = rows.filter((row) => row.failures.length);
  console.log(`\n${rows.length - failed.length}/${rows.length} pages deliver their content as server HTML.`);
  if (JSON_OUT) {
    writeFileSync(JSON_OUT, JSON.stringify({ base: BASE, checkedAt: new Date().toISOString(), rows }, null, 2));
    console.log(`Report written to ${JSON_OUT}`);
  }
  if (failed.length) {
    console.error(`\n${failed.length} page(s) failed:`);
    for (const row of failed) console.error(`  ${row.path}: ${row.failures.join("; ")}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
