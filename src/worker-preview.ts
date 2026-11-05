/**
 * Preview Worker entry. Production and staging keep `src/worker.ts`.
 * CONTENT is the preview pack bucket `gaf-content-preview`.
 * STATIC is `gaf-static-preview` and serves `/uploads` the same way production does.
 * Pack bodies are reused from the colo-local Cache API (`gaf-preview-packs`).
 * The version document and manifest stay on R2.
 */
import openNext from "gaf-open-next-worker";
import { PackedPreviewStorage } from "@/lib/storage/packed-preview-storage";
import {
  emptyPreviewHydrationSample,
  previewDiagnosticLogLine,
  previewDiagnosticValue,
  previewHtmlCache,
  withPreviewDiagnostic,
  type PreviewHydrationSample,
} from "@/lib/storage/packed-preview-diagnostics";
import { assertPreviewRuntime, type PreviewPackError } from "@/lib/storage/packed-edition";
import { ASSET_KEYS, createWorker, type ExecutionContextLike, type WorkerEnv } from "@/worker/runtime";

let active: PackedPreviewStorage | null = null;

const worker = createWorker(openNext.fetch, {
  createContent(env, hooks) {
    assertPreviewRuntime(env);
    const storage = new PackedPreviewStorage({
      bucket: env.CONTENT,
      staticBucket: env.STATIC,
      assets: env.ASSETS,
      assetKeys: ASSET_KEYS,
      versionCheckIntervalMs: hooks.versionCheckIntervalMs,
      log: hooks.log,
      onContentPublished: hooks.onContentPublished,
      onStaticChange: hooks.onStaticChange,
      sharedPackCache: true,
    });
    active = storage;
    return storage;
  },
});

function hydrationSample(storage: PackedPreviewStorage | null): PreviewHydrationSample {
  return storage ? storage.hydrationSample() : emptyPreviewHydrationSample();
}

function diagnose(response: Response, before: PreviewHydrationSample, isolateHydrated: boolean): Response {
  const value = previewDiagnosticValue({
    isolateHydrated,
    before,
    after: hydrationSample(active),
    htmlCache: previewHtmlCache(response.headers.get("x-gaf-html-cache")),
  });
  console.error(`[gaf] ${previewDiagnosticLogLine(value)}`);
  return withPreviewDiagnostic(response, value);
}

export { BucketCachePurge, DOQueueHandler, DOShardedTagCache } from "gaf-open-next-worker";

function previewError(error: unknown): Response {
  const message = error instanceof Error ? error.message : "preview pack environment is not isolated";
  return new Response(message, {
    status: 503,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

const preview = {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContextLike): Promise<Response> {
    try {
      assertPreviewRuntime(env);
    } catch (error) {
      return diagnose(previewError(error as PreviewPackError), emptyPreviewHydrationSample(), false);
    }
    const before = hydrationSample(active);
    const isolateHydrated = active?.isHydrated("en") ?? false;
    const response = await worker.fetch(request, env, ctx);
    return diagnose(response, before, isolateHydrated);
  },
};

export default preview;
