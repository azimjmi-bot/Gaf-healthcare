/**
 * Runs once when the Next.js server starts, whichever command started it
 * (`npm start`, `next start`, a hosting panel). Applies the HTTP tuning from
 * server-tuning.mjs inside the serving process: public `Vary` so the CDN can
 * cache HTML, and a keep-alive timeout above the reverse proxy's idle timeout
 * so idle connections are not reset under the proxy. See that file for why.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const tuning = await import("../server-tuning.mjs");
  tuning.installResponseHooks();
  tuning.tuneActiveHttpServers();
}
