// Production entry (`npm start`). Runs the same Next.js server as `next start`,
// with one change: the `Vary` header on every response is reduced to the
// values a CDN can act on.
//
// The App Router appends `Vary: rsc, next-router-state-tree, next-router-prefetch,
// next-router-segment-prefetch` to every response. Hostinger CDN treats a
// response that varies on custom request headers as uncacheable and marks it
// `x-hcdn-cache-status: DYNAMIC`, so even pages that send
// `Cache-Control: public, s-maxage=300` were fetched from this origin on every
// crawler and visitor request. Next.js already assumes CDNs key only on the
// URL: client navigations and prefetches carry a `_rsc` search param that is a
// hash of those headers, and the server redirects any RSC request whose hash
// does not match (see `experimental.validateRSCRequestHeaders`). Dropping the
// header names from `Vary` therefore changes nothing for correctness and lets
// the edge cache serve public HTML.
process.env.NODE_ENV ||= "production";

import { createServer } from "node:http";
import { pathToFileURL } from "node:url";

const ROUTER_VARY = new Set([
  "rsc",
  "next-router-state-tree",
  "next-router-prefetch",
  "next-router-segment-prefetch",
  "next-url",
]);

/** Keep standard negotiation values (e.g. Accept-Encoding), drop router ones. */
export function publicVary(value) {
  const values = Array.isArray(value) ? value : [value];
  const kept = [];
  for (const entry of values) {
    for (const part of String(entry).split(",")) {
      const name = part.trim();
      if (!name || ROUTER_VARY.has(name.toLowerCase())) continue;
      if (!kept.some((seen) => seen.toLowerCase() === name.toLowerCase())) kept.push(name);
    }
  }
  return kept;
}

function sanitizeVary(res) {
  const current = res.getHeader("vary");
  if (current === undefined) return;
  const kept = publicVary(current);
  if (kept.length === 0) res.removeHeader("vary");
  else res.setHeader("vary", kept.join(", "));
}

function sanitizeHeaderBag(headers) {
  if (!headers) return headers;
  if (Array.isArray(headers)) {
    // Raw [name, value, name, value, ...] form.
    const out = [];
    for (let i = 0; i + 1 < headers.length; i += 2) {
      const name = headers[i];
      if (String(name).toLowerCase() === "vary") {
        const kept = publicVary(headers[i + 1]);
        if (kept.length === 0) continue;
        out.push(name, kept.join(", "));
      } else {
        out.push(name, headers[i + 1]);
      }
    }
    return out;
  }
  for (const name of Object.keys(headers)) {
    if (name.toLowerCase() !== "vary") continue;
    const kept = publicVary(headers[name]);
    if (kept.length === 0) delete headers[name];
    else headers[name] = kept.join(", ");
  }
  return headers;
}

function withPublicVary(res) {
  const writeHead = res.writeHead;
  res.writeHead = function patchedWriteHead(statusCode, reasonOrHeaders, maybeHeaders) {
    sanitizeVary(this);
    if (maybeHeaders !== undefined) {
      return writeHead.call(this, statusCode, reasonOrHeaders, sanitizeHeaderBag(maybeHeaders));
    }
    if (reasonOrHeaders !== undefined && typeof reasonOrHeaders !== "string") {
      return writeHead.call(this, statusCode, sanitizeHeaderBag(reasonOrHeaders));
    }
    return writeHead.call(this, statusCode, reasonOrHeaders);
  };
  return res;
}

async function main() {
  const { default: next } = await import("next");
  const port = Number.parseInt(process.env.PORT || "3000", 10);
  const hostname = process.env.HOST || "0.0.0.0";
  const app = next({ dev: false, hostname, port });
  const handle = app.getRequestHandler();
  await app.prepare();
  createServer((req, res) => {
    handle(req, withPublicVary(res));
  }).listen(port, hostname, () => {
    console.log(`▲ GAF Healthcare ready on http://${hostname}:${port} (public Vary)`);
  });
}

// Allow `import { publicVary } from "../server.mjs"` in tests without starting a server.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
