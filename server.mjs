// Production entry (`npm start`). Runs the same Next.js server as `next start`
// with the HTTP tuning from server-tuning.mjs applied explicitly: public
// `Vary` so Hostinger CDN can cache HTML, and a keep-alive timeout above the
// reverse proxy's idle timeout. src/instrumentation.ts applies the same
// tuning from inside Next for hosts that start the app another way.
process.env.NODE_ENV ||= "production";

import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import {
  installHeapGuard,
  installResponseHooks,
  keepAliveTimeoutMs,
  publicVary,
  tuneHttpServer,
} from "./server-tuning.mjs";

export { publicVary };

async function main() {
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
  // Normally off here: the npm start script passes --max-old-space-size.
  const guard = installHeapGuard();
  server.listen(port, hostname, () => {
    console.log(
      `▲ GAF Healthcare ready on http://${hostname}:${port} (public Vary, keep-alive ${keepAliveTimeoutMs()} ms, ` +
        `heap guard ${guard ? "on" : "off"})`,
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
