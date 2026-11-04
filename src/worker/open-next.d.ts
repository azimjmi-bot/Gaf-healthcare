/**
 * Shape of the worker module `opennextjs-cloudflare build` writes to
 * `.open-next/worker.js`, which wrangler.jsonc aliases to this name. It does
 * not exist until that build has run, so the entry's import is typed here
 * rather than from the generated file.
 */
declare module "gaf-open-next-worker" {
  import type { ExecutionContextLike, WorkerEnv } from "@/worker/runtime";

  const worker: {
    fetch(request: Request, env: WorkerEnv, ctx: ExecutionContextLike): Promise<Response>;
  };
  export default worker;
  export class DOQueueHandler {}
  export class DOShardedTagCache {}
  export class BucketCachePurge {}
}
