/**
 * Preview Worker entry. Production and staging keep `src/worker.ts`.
 * Packed hydration runs only after the preview env asserts that the sole
 * content bucket is `gaf-content-preview`.
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
      bucket: env["gaf-content-preview"] as R2BucketLike,
      assets: env.ASSETS,
      assetKeys: ASSET_KEYS,
      versionCheckIntervalMs: hooks.versionCheckIntervalMs,
      log: hooks.log,
      onContentPublished: hooks.onContentPublished,
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
