/**
 * OpenNext configuration for the Cloudflare Workers build
 * (`npm run cf:build`). Hostinger does not read this file; it keeps running
 * `npm run build` + `npm start`.
 *
 * - Incremental cache in R2 so the ISR routes (`/ar/doctors/*` and the
 *   sitemaps, `revalidate = 300`) keep the same five-minute semantics they
 *   have with Next's file-system cache on Hostinger. The bucket is the static
 *   bucket under the default `incremental-cache/` prefix.
 * - Memory queue for revalidation: the Worker calls itself through
 *   `WORKER_SELF_REFERENCE`, no Durable Object required. Tags are unused
 *   (no `revalidateTag` calls), so the tag cache stays "dummy".
 * - `buildCommand` is the project's own build so Next runs with webpack, the
 *   4 GB heap and the static-asset stash the Hostinger build relies on.
 */
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

const config = {
  ...defineCloudflareConfig({
    incrementalCache: r2IncrementalCache,
    queue: memoryQueue,
  }),
  buildCommand: "npm run build",
};

export default config;
