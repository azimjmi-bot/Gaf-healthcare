/**
 * Runs once when the Next.js server starts, whichever command started it
 * (`npm start`, `next start`, a hosting panel). Applies the HTTP tuning from
 * server-tuning.mjs inside the serving process: public `Vary` so the CDN can
 * cache HTML, a keep-alive timeout above the reverse proxy's idle timeout so
 * idle connections are not reset under the proxy, and a heap guard when the
 * process was started without a heap limit. See that file for why.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
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
}
