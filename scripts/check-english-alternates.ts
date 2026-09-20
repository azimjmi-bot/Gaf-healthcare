#!/usr/bin/env tsx
/**
 * End-to-end counterpart to src/server-tests/english-alternates-baseline.test.ts.
 *
 * The unit test pins what withLocaleMetadata() computes. This fetches the same
 * sample through a running server so the locale rewrite in src/proxy.ts is in
 * the path, which is where an i18n routing regression would actually show up.
 *
 *   npm run dev
 *   npm run check:alternates            # defaults to the npm run dev port
 *   BASE_URL=http://127.0.0.1:43133 npm run check:alternates
 */
import {
  ENGLISH_ALTERNATES_BASELINE,
  type AlternatesBaseline,
} from "@/server-tests/english-alternates-fixture";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:43127";
const LOCALE_PREFIXED = /^https:\/\/gaf\.healthcare\/(ru|fr|ar|sw)(\/|$)/;

type Head = { status: number; canonical: string | null; languages: Record<string, string> };

async function readHead(path: string): Promise<Head> {
  const response = await fetch(BASE + path);
  const html = await response.text();
  const end = html.indexOf("</head>");
  const head = (end === -1 ? html : html.slice(0, end)).replace(/></g, ">\n<");
  const languages: Record<string, string> = {};
  for (const match of head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)) {
    languages[match[1]] = match[2];
  }
  return {
    status: response.status,
    canonical: head.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null,
    languages,
  };
}

function alternateKeys(head: Head) {
  return Object.keys(head.languages)
    .filter((key) => key !== "x-default")
    .sort();
}

function problemsFor(row: AlternatesBaseline, head: Head) {
  const problems: string[] = [];
  const served = row.served ?? "hreflang";

  if (served === "404") {
    if (head.status !== 404) problems.push(`expected HTTP 404, got ${head.status}`);
    return problems;
  }

  if (head.status !== 200) problems.push(`HTTP ${head.status}`);

  if (served === "noindex") {
    if (head.canonical) problems.push(`now serves a canonical: ${head.canonical}`);
    if (alternateKeys(head).length > 0) problems.push("now serves hreflang");
    return problems;
  }

  if (!head.canonical) {
    problems.push("no canonical");
  } else if (LOCALE_PREFIXED.test(head.canonical)) {
    problems.push(`canonical carries a locale prefix: ${head.canonical}`);
  }

  if (served === "canonical-only") {
    if (alternateKeys(head).length > 0) {
      problems.push('now serves hreflang — drop served: "canonical-only" from the fixture');
    }
    return problems;
  }

  const keys = alternateKeys(head);
  const want = [...row.published].sort();
  if (keys.join(",") !== want.join(",")) {
    problems.push(`hreflang is [${keys.join(", ")}], expected [${want.join(", ")}]`);
  }
  if (row.published.length > 0 && head.languages["x-default"] !== head.languages.en) {
    problems.push("x-default does not match the en alternate");
  }
  return problems;
}

function summarise(row: AlternatesBaseline, head: Head) {
  switch (row.served ?? "hreflang") {
    case "404":
      return "404 as expected";
    case "noindex":
      return "noindex, no canonical";
    case "canonical-only":
      return "canonical only, no hreflang (recorded gap)";
    default:
      return alternateKeys(head).join(", ");
  }
}

async function main() {
  console.log(`Checking ${ENGLISH_ALTERNATES_BASELINE.length} page types against ${BASE}\n`);
  let failed = 0;

  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    let head: Head;
    try {
      head = await readHead(row.path);
    } catch (error) {
      failed += 1;
      console.log(`FAIL  ${row.label}\n      ${row.path}\n      unreachable: ${String(error)}`);
      continue;
    }
    const problems = problemsFor(row, head);
    if (problems.length === 0) {
      console.log(`ok    ${row.label} — ${summarise(row, head)}`);
      continue;
    }
    failed += 1;
    console.log(`FAIL  ${row.label}\n      ${row.path}`);
    for (const problem of problems) console.log(`      ${problem}`);
  }

  console.log(
    failed === 0
      ? "\nAll served responses match the pinned baseline."
      : `\n${failed} page type(s) drifted from the pinned baseline.`,
  );
  process.exitCode = failed === 0 ? 0 : 1;
}

void main();
