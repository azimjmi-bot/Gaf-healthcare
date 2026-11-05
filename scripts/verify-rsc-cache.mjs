/**
 * Temporary live check for the preview Worker's RSC cache.
 * Not part of the application. Safe to delete after the run.
 */
const BASE = "https://gaf-healthcare-preview.gafhealthcare.workers.dev";

function line(label, row) {
  console.log(
    [
      label.padEnd(22),
      `status=${row.status}`,
      `cf-cache-status=${row.cfCache ?? "(absent)"}`,
      `x-gaf-rsc-cache=${row.rscCache ?? "(absent)"}`,
      `x-gaf-html-cache=${row.htmlCache ?? "(absent)"}`,
      `type=${row.type ?? "(absent)"}`,
      `location=${row.location ?? "(none)"}`,
      `bytes=${row.bytes}`,
      `time=${row.ms}ms`,
    ].join("  "),
  );
}

async function get(path, headers = {}) {
  const started = performance.now();
  const response = await fetch(new URL(path, BASE), {
    method: "GET",
    redirect: "manual",
    signal: AbortSignal.timeout(30_000),
    headers: {
      accept: "*/*",
      "user-agent": "gaf-rsc-cache-verify/1.0",
      ...headers,
    },
  });
  const body = await response.arrayBuffer();
  return {
    status: response.status,
    cfCache: response.headers.get("cf-cache-status"),
    rscCache: response.headers.get("x-gaf-rsc-cache"),
    htmlCache: response.headers.get("x-gaf-html-cache"),
    type: response.headers.get("content-type"),
    location: response.headers.get("location"),
    bytes: body.byteLength,
    text: new TextDecoder().decode(body),
    ms: Math.round(performance.now() - started),
  };
}

/**
 * Next embeds `?_rsc=<token>` in bootstrap or prefetch markup when the flight
 * varies on router headers. A request that sends only `RSC: 1` has an empty
 * hash, and Next accepts that as the bare `?_rsc` parameter.
 */
function rscTokenFromHtml(html) {
  const match = html.match(/["']?\?_rsc=([A-Za-z0-9]+)/);
  return match ? match[1] : "";
}

function rscPath(pathname, token) {
  return token ? `${pathname}?_rsc=${token}` : `${pathname}?_rsc`;
}

const html = await get("/doctors");
line("1 HTML /doctors", html);
const token = rscTokenFromHtml(html.text);
console.log(`rsc token=${token || "(empty)"} source=${token ? "html" : "no-_rsc-in-html"}`);

const doctorsFlight = rscPath("/doctors", token);
const specialtiesFlight = rscPath("/specialties", token);

const miss = await get(doctorsFlight, { RSC: "1" });
line("2 RSC miss /doctors", miss);

const hit = await get(doctorsFlight, { RSC: "1" });
line("3 RSC repeat /doctors", hit);

const burstStarted = performance.now();
const burst = await Promise.all(
  Array.from({ length: 20 }, () => get(specialtiesFlight, { RSC: "1" })),
);
const burstMs = Math.round(performance.now() - burstStarted);
burst.forEach((row, index) => line(`4 burst ${String(index + 1).padStart(2, "0")}`, row));

const statuses = burst.reduce((counts, row) => {
  counts[row.status] = (counts[row.status] ?? 0) + 1;
  return counts;
}, {});
const cf = burst.reduce((counts, row) => {
  const key = row.cfCache ?? "(absent)";
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});
const rsc = burst.reduce((counts, row) => {
  const key = row.rscCache ?? "(absent)";
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});
console.log(`burst wall=${burstMs}ms  http=${JSON.stringify(statuses)}  cf-cache-status=${JSON.stringify(cf)}  x-gaf-rsc-cache=${JSON.stringify(rsc)}`);

if (hit.cfCache !== "HIT") {
  console.error(`ASSERTION FAILED: repeat RSC cf-cache-status is ${hit.cfCache ?? "(absent)"}, expected HIT`);
  process.exitCode = 1;
}
