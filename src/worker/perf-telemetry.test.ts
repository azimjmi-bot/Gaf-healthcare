import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyPerfRoute,
  DEFAULT_PERF_SAMPLE_RATE,
  formatPerfSample,
  shouldSamplePerf,
  timeHydration,
} from "@/worker/perf-telemetry";

test("classifyPerfRoute uses bounded route categories and ignores locale prefixes", () => {
  assert.equal(classifyPerfRoute("/"), "home");
  assert.equal(classifyPerfRoute("/treatments/pacemaker-implantation-in-india"), "treatment");
  assert.equal(classifyPerfRoute("/ar/treatments/ivf-treatment-in-india"), "treatment");
  assert.equal(classifyPerfRoute("/doctors/dr-naresh-trehan"), "doctor");
  assert.equal(classifyPerfRoute("/hospitals/wockhardt-hospital"), "hospital");
  assert.equal(classifyPerfRoute("/costs/pacemaker-implantation"), "cost");
  assert.equal(classifyPerfRoute("/blogs/some-post"), "blog");
  assert.equal(classifyPerfRoute("/nigeria/treatment-in-india"), "country");
  assert.equal(classifyPerfRoute("/cms/articles/1"), "cms");
  assert.equal(classifyPerfRoute("/api/consult"), "api");
  assert.equal(classifyPerfRoute("/sitemap-en.xml"), "sitemap");
  assert.equal(classifyPerfRoute("/_next/image"), "image");
});

test("classifyPerfRoute never needs query strings and stays stable if one is passed", () => {
  assert.equal(classifyPerfRoute("/doctors/dr-a?utm_source=x&gclid=1"), "doctor");
});

test("shouldSamplePerf is deterministic and respects rate bounds", () => {
  assert.equal(shouldSamplePerf("/doctors", 0), false);
  assert.equal(shouldSamplePerf("/doctors", 1), true);
  const a = shouldSamplePerf("/treatments/x", DEFAULT_PERF_SAMPLE_RATE, 0);
  const b = shouldSamplePerf("/treatments/x", DEFAULT_PERF_SAMPLE_RATE, 0);
  assert.equal(a, b);
});

test("formatPerfSample emits label=value pairs without URLs or query strings", () => {
  const line = formatPerfSample({
    route: "treatment",
    status: 200,
    cache: "miss",
    worker_ms: 412.2,
    hydrate_ms: 200,
    hydrate_en_ms: 120,
    hydrate_ar_ms: 80,
    r2_reads: 12,
    ssr_ms: 180,
    groups: "en+ar",
  });
  assert.match(line, /^perf /);
  assert.match(line, /route=treatment/);
  assert.match(line, /status=200/);
  assert.match(line, /cache=miss/);
  assert.match(line, /worker_ms=412/);
  assert.match(line, /r2_reads=12/);
  assert.match(line, /groups=en\+ar/);
  assert.doesNotMatch(line, /https?:/);
  assert.doesNotMatch(line, /utm_/);
  assert.doesNotMatch(line, /\?/);
});

test("timeHydration records per-group and total durations and read deltas", async () => {
  const counter = { count: 10 };
  const timing = await timeHydration(
    ["en", "ar"],
    async (group) => {
      counter.count += group === "en" ? 3 : 5;
      await new Promise((resolve) => setTimeout(resolve, 5));
    },
    counter,
  );
  assert.ok(timing.totalMs >= 5);
  assert.ok((timing.byGroup.en ?? 0) >= 5);
  assert.ok((timing.byGroup.ar ?? 0) >= 5);
  assert.equal(timing.r2Reads, 8);
});
