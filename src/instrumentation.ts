/**
 * Runs once when the Next.js server starts, whichever command started it
 * (`npm start`, `next start`, a hosting panel preset). Installs the two
 * serving layers from inside the process:
 *
 * - server-tuning.mjs: public `Vary` so CDNs can cache HTML, a keep-alive
 *   timeout above the reverse proxy's idle timeout, and a heap guard when the
 *   process was started without a heap limit;
 * - server-cache.mjs: the origin HTML cache, wrapped around the HTTP server
 *   `next start` opened before this hook ran. `server.mjs` creates its own
 *   server after this hook and attaches the cache itself, so under `npm start`
 *   there is nothing to wrap here and the cache is installed exactly once.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  // On Cloudflare Workers there is no HTTP server to tune or wrap: the
  // platform owns the socket and the Worker entry owns content storage.
  if (typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") return;
  const tuning = await import("../server-tuning.mjs");
  tuning.installResponseHooks();
  tuning.tuneActiveHttpServers();
  const guard = tuning.installHeapGuard();
  if (guard) {
    console.log(
      `[gaf] heap guard on: collecting above ${Math.round(guard.softLimitBytes / 1048576)} MB ` +
        "(start with --max-old-space-size to let V8 manage this instead)",
    );
  }
  console.log(`[gaf] build ${tuning.buildLabel()}`);
  const entry = (globalThis as Record<symbol, unknown>)[Symbol.for("gaf.server-entry")];
  if (entry === "server.mjs") return;
  const caching = await import("../server-cache.mjs");
  // Not awaited: Next waits for register() and the retry window may be 15 s.
  void caching.installHtmlCacheWithRetry(process.cwd()).catch((error: Error) => {
    console.error(`[gaf] html cache: install failed (${error.message})`);
  });
}
