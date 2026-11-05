/**
 * Preview Worker entry. Production and staging keep `src/worker.ts`.
 * CONTENT is the preview pack bucket `gaf-content-preview`.
 * STATIC is `gaf-static-preview` and serves `/uploads` the same way production does.
 * Pack bodies are reused from the colo-local Cache API (`gaf-preview-packs`).
 * The version document and manifest stay on R2.
 */
import openNext from "gaf-open-next-worker";
import { PackedPreviewStorage } from "@/lib/storage/packed-preview-storage";
import { assertPreviewRuntime, type PreviewPackError } from "@/lib/storage/packed-edition";
import type { R2BucketLike } from "@/lib/storage/r2";
import { ASSET_KEYS, createWorker, type ExecutionContextLike, type WorkerEnv } from "@/worker/runtime";

const worker = createWorker(openNext.fetch, {
  createContent(env, hooks) {
    assertPreviewRuntime(env);
    return new PackedPreviewStorage({
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
  },
});

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
      return previewError(error as PreviewPackError);
    }
    return worker.fetch(request, env, ctx);
  },
};

export default preview;
