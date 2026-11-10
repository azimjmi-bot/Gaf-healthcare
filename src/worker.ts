/**
 * Cloudflare Worker `main` (see wrangler.jsonc). `opennextjs-cloudflare build`
 * generates `.open-next/worker.js` from the Next build; this file wraps it so
 * content storage is installed and hydrated before any request reaches Next.
 *
 * The generated module is imported under the `gaf-open-next-worker` alias
 * (wrangler.jsonc `alias`) so the type checker is not asked to load a bundle
 * that exists only after the build; its declared shape is in
 * `src/worker/open-next.d.ts`. The Durable Object classes OpenNext may bind
 * must be re-exported from the entry module, or wrangler cannot find them.
 */
import openNext from "gaf-open-next-worker";
import { createWorker } from "./worker/runtime";

export { BucketCachePurge, DOQueueHandler, DOShardedTagCache } from "gaf-open-next-worker";

export default createWorker(openNext.fetch);
