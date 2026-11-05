/**
 * Temporary preview request diagnostic. Numbers only: no bucket names,
 * object keys, or checksums. The preview Worker adds the header after the
 * HTML cache has stored its copy, and writes the same line to the Worker log.
 */
export const PREVIEW_DIAGNOSTIC_HEADER = "x-gaf-preview-diag";

export type PreviewHydrationSample = {
  versionReads: number;
  manifestReads: number;
  packHits: number;
  packMisses: number;
  packRejected: number;
  packErrors: number;
  packReads: number;
  packBytes: number;
  inflateMs: number;
  snapshotMs: number;
  hydrateMs: number;
  versionCheckMs: number;
};

export type PreviewHtmlCache = "hit" | "miss" | "none";

const HEADLESS = new Set([101, 204, 205, 304]);

export function emptyPreviewHydrationSample(): PreviewHydrationSample {
  return {
    versionReads: 0,
    manifestReads: 0,
    packHits: 0,
    packMisses: 0,
    packRejected: 0,
    packErrors: 0,
    packReads: 0,
    packBytes: 0,
    inflateMs: 0,
    snapshotMs: 0,
    hydrateMs: 0,
    versionCheckMs: 0,
  };
}

function delta(after: number, before: number): number {
  return Math.max(0, Math.round(after - before));
}

export function previewHtmlCache(header: string | null): PreviewHtmlCache {
  return header === "hit" || header === "miss" ? header : "none";
}

/** One request's change in the isolate's counters. `isolateHydrated` is the state before the request. */
export function previewDiagnosticValue(input: {
  isolateHydrated: boolean;
  before: PreviewHydrationSample;
  after: PreviewHydrationSample;
  htmlCache: PreviewHtmlCache;
}): string {
  const { before, after } = input;
  const hydrateMs = delta(after.hydrateMs, before.hydrateMs) + delta(after.versionCheckMs, before.versionCheckMs);
  return [
    `isolate=${input.isolateHydrated ? "warm" : "cold"}`,
    `version_r2=${delta(after.versionReads, before.versionReads)}`,
    `manifest_r2=${delta(after.manifestReads, before.manifestReads)}`,
    `pack_hits=${delta(after.packHits, before.packHits)}`,
    `pack_misses=${delta(after.packMisses, before.packMisses) + delta(after.packErrors, before.packErrors)}`,
    `pack_rejected=${delta(after.packRejected, before.packRejected)}`,
    `pack_r2=${delta(after.packReads, before.packReads)}`,
    `pack_bytes=${delta(after.packBytes, before.packBytes)}`,
    `inflate_ms=${delta(after.inflateMs, before.inflateMs)}`,
    `snapshot_ms=${delta(after.snapshotMs, before.snapshotMs)}`,
    `hydrate_ms=${hydrateMs}`,
    `html=${input.htmlCache}`,
  ].join(";");
}

export function previewDiagnosticLogLine(value: string): string {
  return `preview diag ${value}`;
}

export function withPreviewDiagnostic(response: Response, value: string): Response {
  const headers = new Headers(response.headers);
  headers.set(PREVIEW_DIAGNOSTIC_HEADER, value);
  return new Response(HEADLESS.has(response.status) ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
