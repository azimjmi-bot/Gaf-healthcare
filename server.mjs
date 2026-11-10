// Production entry (`npm start`). Runs the same Next.js server as `next start`
// with two layers in front of it:
//
// - the HTTP tuning from server-tuning.mjs (public `Vary` so CDNs can cache
//   HTML, keep-alive above the reverse proxy's idle timeout);
// - the origin HTML cache from server-cache.mjs, which answers anonymous
//   public pages from memory/disk, renders each miss once, and limits how
//   many renders run at a time so crawl bursts cannot queue every request
//   past the proxy timeout.
//
// src/instrumentation.ts installs both layers from inside Next for hosts
// that start the app with plain `next start` instead of this file.
process.env.NODE_ENV ||= "production";

import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { attachHtmlCache, createHtmlCache, describeHtmlCache } from "./server-cache.mjs";
import {
  buildLabel,
  installHeapGuard,
  installResponseHooks,
  keepAliveTimeoutMs,
  publicVary,
  tuneHttpServer,
} from "./server-tuning.mjs";

export { publicVary };

const root = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  // Tells src/instrumentation.ts (which runs inside app.prepare()) that this
  // file attaches the cache itself, so it must not look for a server to wrap.
  globalThis[Symbol.for("gaf.server-entry")] = "server.mjs";
  const { default: next } = await import("next");
  const port = Number.parseInt(process.env.PORT || "3000", 10);
  const hostname = process.env.HOST || "0.0.0.0";
  const app = next({ dev: false, hostname, port });
  const handle = app.getRequestHandler();
  await app.prepare();
  installResponseHooks();
  const server = createServer((req, res) => {
    handle(req, res);
  });
  tuneHttpServer(server);
  const built = createHtmlCache(root);
  const cache = built ? attachHtmlCache(server, built) : null;
  // Normally off here: the npm start script passes --max-old-space-size.
  const guard = installHeapGuard();
  server.listen(port, hostname, () => {
    console.log(
      `▲ GAF Healthcare ready on http://${hostname}:${port} (build ${buildLabel()}, public Vary, ` +
        `keep-alive ${keepAliveTimeoutMs()} ms, heap guard ${guard ? "on" : "off"}, ${describeHtmlCache(cache)})`,
    );
  });
}

// Allow `import { publicVary } from "../server.mjs"` in tests without starting a server.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
