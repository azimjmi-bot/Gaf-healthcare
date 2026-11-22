#!/usr/bin/env node
/**
 * Staging-only HTTP validation for PR #51 negative cache.
 * Targets gaf-healthcare-staging-negcache (workers.dev). Never production.
 */
import { performance } from "node:perf_hooks";
import { writeFileSync } from "node:fs";

const BASE = process.env.GAF_STAGING_NEG_BASE || "https://gaf-healthcare-staging-negcache.gafhealthcare.workers.dev";
const OUT = process.env.GAF_STAGING_NEG_OUT || "/opt/cursor/artifacts/p1-staging-validation-results.json";

async function fetchOnce(path, init = {}) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const started = performance.now();
  const response = await fetch(url, {
    redirect: "manual",
    headers: {
      "user-agent": "gaf-staging-negcache-validate/1.0",
      ...(init.headers || {}),
    },
    ...init,
  });
  const ms = performance.now() - started;
  const text = await response.text();
  return {
    url,
    status: response.status,
    ms: +ms.toFixed(2),
    cache: response.headers.get("x-gaf-html-cache"),
    rscCache: response.headers.get("x-gaf-rsc-cache"),
    robots: response.headers.get("x-robots-tag"),
    cacheControl: response.headers.get("cache-control"),
    location: response.headers.get("location"),
    cfRay: response.headers.get("cf-ray"),
    bodyBytes: text.length,
    hasCanonical: /rel=["']canonical["']/i.test(text),
    hasNoindex: /noindex/i.test(text) || (response.headers.get("x-robots-tag") || "").includes("noindex"),
    snippet: text.slice(0, 180).replace(/\s+/g, " "),
  };
}

function pct(sorted, p) {
  if (!sorted.length) return null;
  return sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
}

async function sample(path, n, label) {
  const rows = [];
  for (let i = 0; i < n; i++) rows.push(await fetchOnce(path));
  const times = rows.map((r) => r.ms).sort((a, b) => a - b);
  return {
    label,
    path,
    n,
    p50: pct(times, 50),
    p95: pct(times, 95),
    statuses: [...new Set(rows.map((r) => r.status))],
    caches: [...new Set(rows.map((r) => r.cache))],
    samples: rows,
  };
}

async function main() {
  const results = {
    base: BASE,
    startedAt: new Date().toISOString(),
    cases: {},
  };

  // Warm isolate a bit.
  await fetchOnce("/");

  const unknownEn = `/treatments/negcache-audit-${Date.now()}-en`;
  const unknownAr = `/ar/treatments/negcache-audit-${Date.now()}-ar`;

  results.cases.first404en = await fetchOnce(unknownEn);
  results.cases.repeat404en = await sample(unknownEn, 8, "repeat-404-en");
  results.cases.first404ar = await fetchOnce(unknownAr);
  results.cases.repeat404ar = await sample(unknownAr, 5, "repeat-404-ar");

  results.cases.queryVariants = {
    a: await fetchOnce(`${unknownEn}?utm_source=x&fbclid=1`),
    b: await fetchOnce(`${unknownEn}?page=99&foo=bar`),
  };

  results.cases.concurrent = await Promise.all(
    Array.from({ length: 5 }, (_, i) => fetchOnce(`/hospitals/negcache-race-${Date.now()}-${i}`)),
  );

  // Non-404 statuses should not be negative-cached as 404. Use known redirect if available.
  results.cases.redirectPacemaker = await fetchOnce("/treatments/cardiology/pacemaker-implantation");
  results.cases.knownCommercial = await fetchOnce("/treatments/pacemaker-implantation-in-india");

  // Forced authorization / CMS cookie should not store (status may still 404).
  const authedPath = `/blogs/negcache-authed-${Date.now()}`;
  results.cases.authed404 = await fetchOnce(authedPath, { headers: { cookie: "gaf_cms=staging-probe" } });
  results.cases.authed404again = await fetchOnce(authedPath);

  // Perf: flag is ON on this worker. First miss vs repeats for a fresh URL.
  const perfPath = `/doctors/negcache-perf-${Date.now()}`;
  const coldMiss = await fetchOnce(perfPath);
  const warmHits = await sample(perfPath, 20, "warm-404-hits");
  results.cases.perfOn = { coldMiss, warmHits };

  // SEO headers on 404
  results.cases.seo404 = {
    status: results.cases.first404en.status,
    robots: results.cases.first404en.robots,
    hasCanonical: results.cases.first404en.hasCanonical,
    hasNoindex: results.cases.first404en.hasNoindex,
  };

  results.finishedAt = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
