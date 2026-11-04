import assert from "node:assert/strict";
import { existsSync, mkdtempSync, promises as fsp, utimesSync, writeFileSync } from "node:fs";
import { createServer, request as httpRequest } from "node:http";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import zlib from "node:zlib";
import {
  ByteLru,
  HtmlCache,
  RenderLimiter,
  attachHtmlCache,
  cacheKeyFor,
  describeHtmlCache,
  contentFingerprint,
  decodeEntry,
  encodeEntry,
  entryState,
  htmlCacheConfig,
  installHtmlCacheOnActiveServers,
  installHtmlCacheWithRetry,
  isStorable,
  storableHeaders,
} from "./server-cache.mjs";

const get = (method, url) => ({ method, url, headers: { host: "gaf.healthcare" } });

test("cacheKeyFor keys anonymous GET/HEAD page requests on path plus normalized query", () => {
  assert.equal(cacheKeyFor(get("GET", "/doctors")), "/doctors");
  assert.equal(cacheKeyFor(get("HEAD", "/ar/doctors/india/radiation-oncology")), "/ar/doctors/india/radiation-oncology");
  assert.equal(cacheKeyFor(get("GET", "/doctors?page=2&utm_source=x&fbclid=y")), "/doctors?page=2");
  assert.equal(cacheKeyFor(get("GET", "/doctors?b=1&a=2")), "/doctors?a=2&b=1");
  assert.equal(cacheKeyFor(get("GET", "/sitemap-en.xml")), "/sitemap-en.xml");
  assert.equal(cacheKeyFor(get("GET", "/robots.txt")), "/robots.txt");
});

test("cacheKeyFor sends CMS, API, assets, cookies and odd queries straight to Next", () => {
  assert.equal(cacheKeyFor(get("POST", "/doctors")), null);
  assert.equal(cacheKeyFor(get("GET", "/cms/articles")), null);
  assert.equal(cacheKeyFor(get("GET", "/api/cms/login")), null);
  assert.equal(cacheKeyFor(get("GET", "/_next/static/chunks/main.js")), null);
  assert.equal(cacheKeyFor(get("GET", "/_next/image?url=x")), null);
  assert.equal(cacheKeyFor(get("GET", "/uploads/2026/photo.webp")), null);
  assert.equal(cacheKeyFor(get("GET", "/brand/logo.svg")), null);
  assert.equal(cacheKeyFor({ ...get("GET", "/doctors"), headers: { cookie: "gaf_cms=token" } }), null);
  assert.equal(cacheKeyFor({ ...get("GET", "/doctors"), headers: { cookie: "a=b; gaf_cms_edition=ar" } }), null);
  assert.equal(cacheKeyFor({ ...get("GET", "/doctors"), headers: { cookie: "_ga=GA1.1" } }), "/doctors");
  assert.equal(cacheKeyFor({ ...get("GET", "/doctors"), headers: { authorization: "Basic x" } }), null);
  assert.equal(cacheKeyFor({ ...get("GET", "/doctors"), headers: { "x-gaf-render": "1" } }), null);
  assert.equal(cacheKeyFor(get("GET", "/doctors?a=1&b=2&c=3&d=4&e=5")), null);
  assert.equal(cacheKeyFor(get("GET", `/doctors?q=${"x".repeat(300)}`)), null);
});

test("isStorable keeps public 200/404 documents and refuses cookies, private or binary bodies", () => {
  const html = { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=300" };
  assert.equal(isStorable(200, html, 1000), true);
  assert.equal(isStorable(404, html, 1000), true);
  assert.equal(isStorable(200, { ...html, "set-cookie": ["a=b"] }, 1000), false);
  assert.equal(isStorable(200, { ...html, "cache-control": "private, no-store" }, 1000), false);
  assert.equal(isStorable(301, html, 0), false);
  assert.equal(isStorable(500, html, 10), false);
  assert.equal(isStorable(200, { "content-type": "image/webp" }, 10), false);
  assert.equal(isStorable(200, { "content-type": "application/xml" }, 10), true);
  assert.equal(isStorable(200, html, 5 * 1024 * 1024), false);
});

test("storableHeaders drops hop-by-hop and per-response headers", () => {
  assert.deepEqual(
    storableHeaders({
      "Content-Type": "text/html",
      "content-length": "12",
      "content-encoding": "gzip",
      date: "x",
      connection: "keep-alive",
      "set-cookie": ["a=b"],
      etag: "abc",
      "x-gaf-locale": "ar",
      vary: ["Accept-Encoding", "RSC"],
    }),
    { "content-type": "text/html", "x-gaf-locale": "ar", vary: "Accept-Encoding, RSC" },
  );
});

test("entries round-trip through the on-disk encoding and age into fresh, stale, expired", () => {
  const entry = {
    key: "/doctors",
    status: 200,
    headers: { "content-type": "text/html" },
    encoding: "gzip",
    body: zlib.gzipSync("<html>hi</html>"),
    storedAt: 1_000,
    freshMs: 100,
  };
  const decoded = decodeEntry(encodeEntry(entry));
  assert.equal(decoded.key, "/doctors");
  assert.equal(decoded.status, 200);
  assert.equal(zlib.gunzipSync(decoded.body).toString(), "<html>hi</html>");
  assert.equal(decodeEntry(Buffer.from("xx")), null);
  assert.equal(entryState(entry, 1_050, 500), "fresh");
  assert.equal(entryState(entry, 1_200, 500), "stale");
  assert.equal(entryState(entry, 1_700, 500), "expired");
});

test("ByteLru evicts least recently used entries once the byte budget is exceeded", () => {
  const lru = new ByteLru(10);
  const body = (n) => ({ body: Buffer.alloc(n) });
  lru.set("a", body(4));
  lru.set("b", body(4));
  lru.get("a");
  lru.set("c", body(4));
  assert.equal(lru.get("b"), undefined);
  assert.ok(lru.get("a"));
  assert.ok(lru.get("c"));
  assert.equal(lru.bytes, 8);
  lru.set("huge", body(11));
  assert.equal(lru.get("huge"), undefined);
  assert.equal(lru.size, 2);
});

test("RenderLimiter runs foreground work before background and caps concurrency", async () => {
  const limiter = new RenderLimiter(1);
  const order = [];
  await limiter.acquire();
  const background = limiter.acquire(true).then(() => order.push("background"));
  const foreground = limiter.acquire(false).then(() => order.push("foreground"));
  assert.equal(limiter.waiting, 2);
  limiter.release();
  await foreground;
  assert.deepEqual(order, ["foreground"]);
  limiter.release();
  await background;
  assert.deepEqual(order, ["foreground", "background"]);
});

test("htmlCacheConfig reads seconds and megabytes from the environment", () => {
  const config = htmlCacheConfig({ GAF_HTML_FRESH_S: "120", GAF_HTML_MEMORY_MB: "8", GAF_RENDER_CONCURRENCY: "0" });
  assert.equal(config.freshMs, 120_000);
  assert.equal(config.memoryBytes, 8 * 1024 * 1024);
  assert.equal(config.renderConcurrency, 1);
  assert.equal(htmlCacheConfig({ GAF_HTML_CACHE: "off" }).enabled, false);
  assert.equal(htmlCacheConfig({}).enabled, true);
  assert.equal(htmlCacheConfig({}).loopback, true);
  assert.equal(htmlCacheConfig({ GAF_HTML_LOOPBACK: "off" }).loopback, false);
});

test("contentFingerprint changes when a content file is edited", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "gaf-content-"));
  writeFileSync(path.join(dir, "cms.json"), "{}");
  const before = contentFingerprint(dir);
  writeFileSync(path.join(dir, "cms.json"), "{\"a\":1}");
  utimesSync(path.join(dir, "cms.json"), new Date(Date.now() + 5_000), new Date(Date.now() + 5_000));
  assert.notEqual(contentFingerprint(dir), before);
});

const BYTES_XML =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  "<url><loc>https://gaf.healthcare/doctors/india/radiation-oncology</loc></url></urlset>\n";

/** Spin up a fake Next handler behind the cache and return helpers. */
async function startStack(options = {}) {
  const renders = [];
  let now = 1_000_000;
  const dir = mkdtempSync(path.join(os.tmpdir(), "gaf-html-cache-"));
  const contentDir = mkdtempSync(path.join(os.tmpdir(), "gaf-html-content-"));
  writeFileSync(path.join(contentDir, "cms.json"), "{}");
  const handler = (req, res) => {
    const url = new URL(req.url, "http://x");
    if (url.pathname === "/robots.txt" && req.headers["x-gaf-render"]) {
      // The cache's boot-time loopback probe; not a page render.
      res.writeHead(200, { "content-type": "text/plain" });
      return res.end("User-agent: *\n");
    }
    renders.push(req.url);
    if (url.pathname === "/redirect") {
      res.writeHead(301, { location: "/doctors" });
      return res.end();
    }
    if (url.pathname === "/missing") {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=300" });
      return res.end("<h1>Not found</h1>");
    }
    if (url.pathname === "/private") {
      res.writeHead(200, { "content-type": "text/html", "set-cookie": "session=1" });
      return res.end("<h1>private</h1>");
    }
    if (url.pathname === "/sitemap-bytes.xml") {
      // Next streams Route Handler bodies as Uint8Array chunks, not Buffers or strings.
      const encoder = new TextEncoder();
      res.writeHead(200, { "content-type": "application/xml", "cache-control": "public, s-maxage=300" });
      res.write(encoder.encode(BYTES_XML.slice(0, 40)));
      res.write(encoder.encode(BYTES_XML.slice(40)));
      return res.end(new Uint8Array(0));
    }
    const body = `<html><body>${url.pathname} render ${renders.length}</body></html>`;
    const headers = {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
      vary: "RSC, Accept-Encoding",
      "x-gaf-locale": url.pathname.startsWith("/ar") ? "ar" : "en",
    };
    const delay = options.renderMs || 0;
    setTimeout(() => {
      if (/gzip/.test(req.headers["accept-encoding"] || "")) {
        res.writeHead(200, { ...headers, "content-encoding": "gzip" });
        res.end(zlib.gzipSync(body));
      } else {
        res.writeHead(200, headers);
        res.end(body);
      }
    }, delay);
  };
  const cache = new HtmlCache({
    dir,
    contentDir,
    buildId: "test-build",
    env: {},
    freshMs: 1_000,
    staleMs: 10_000,
    notFoundFreshMs: 500,
    renderConcurrency: options.concurrency || 2,
    now: () => now,
    log: () => {},
  });
  const server = createServer((req, res) => {
    cache.handle(req, res, handler).catch((error) => {
      res.writeHead(500);
      res.end(String(error));
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  cache.start(server);
  if (options.loopback !== false) assert.equal(await cache.ready, true, "loopback probe succeeds locally");
  const port = server.address().port;
  const fetchRaw = (pathname, { method = "GET", headers = {} } = {}) =>
    new Promise((resolve, reject) => {
      const req = httpRequest({ host: "127.0.0.1", port, path: pathname, method, headers }, (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", async () => {
          // A miss streams to the client before the entry is compressed and
          // stored; wait for that so the next request sees the entry.
          if (res.headers["x-gaf-cache"] === "MISS") {
            for (let i = 0; i < 200 && cache.inflight.size > 0; i += 1) {
              await new Promise((tick) => setTimeout(tick, 5));
            }
          }
          resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) });
        });
      });
      req.on("error", reject);
      req.end();
    });
  const text = (res) =>
    (res.headers["content-encoding"] === "gzip" ? zlib.gunzipSync(res.body) : res.body).toString();
  return {
    cache,
    port,
    renders,
    fetchRaw,
    text,
    dir,
    contentDir,
    advance: (ms) => {
      now += ms;
    },
    close: () =>
      new Promise((resolve) => {
        cache.stop();
        server.close(resolve);
      }),
  };
}

test("a page is rendered once, served compressed or plain, and persisted on disk", async () => {
  const stack = await startStack();
  try {
    const miss = await stack.fetchRaw("/doctors", { headers: { "accept-encoding": "gzip, br" } });
    assert.equal(miss.status, 200);
    assert.equal(miss.headers["x-gaf-cache"], "MISS");
    assert.equal(miss.headers["content-encoding"], "gzip");
    assert.equal(miss.headers.vary, "RSC, Accept-Encoding");
    assert.equal(miss.headers["x-gaf-locale"], "en");
    assert.match(stack.text(miss), /\/doctors render 1/);

    const hit = await stack.fetchRaw("/doctors", { headers: { "accept-encoding": "gzip" } });
    assert.equal(hit.headers["x-gaf-cache"], "HIT");
    assert.equal(stack.text(hit), stack.text(miss));

    const plain = await stack.fetchRaw("/doctors");
    assert.equal(plain.headers["x-gaf-cache"], "HIT");
    assert.equal(plain.headers["content-encoding"], undefined);
    assert.equal(plain.headers["content-length"], String(plain.body.length));
    assert.match(plain.body.toString(), /\/doctors render 1/);

    const head = await stack.fetchRaw("/doctors", { method: "HEAD" });
    assert.equal(head.headers["x-gaf-cache"], "HIT");
    assert.equal(head.body.length, 0);

    // A HEAD miss renders as GET internally: headers only on the wire, body stored.
    const headMiss = await stack.fetchRaw("/hospitals", { method: "HEAD" });
    assert.equal(headMiss.headers["x-gaf-cache"], "MISS");
    assert.equal(headMiss.body.length, 0);
    const afterHead = await stack.fetchRaw("/hospitals");
    assert.equal(afterHead.headers["x-gaf-cache"], "HIT");
    assert.match(afterHead.body.toString(), /\/hospitals render 2/);

    assert.deepEqual(stack.renders, ["/doctors", "/hospitals"]);
    const files = await fsp.readdir(stack.dir);
    assert.equal(files.filter((name) => name.endsWith(".bin")).length, 2);

    stack.cache.memory.clear();
    const fromDisk = await stack.fetchRaw("/doctors");
    assert.equal(fromDisk.headers["x-gaf-cache"], "HIT");
    assert.deepEqual(stack.renders, ["/doctors", "/hospitals"]);
  } finally {
    await stack.close();
  }
});

test("tracking parameters share one entry while real query strings get their own", async () => {
  const stack = await startStack();
  try {
    await stack.fetchRaw("/doctors?utm_source=google");
    const hit = await stack.fetchRaw("/doctors?gclid=abc");
    assert.equal(hit.headers["x-gaf-cache"], "HIT");
    const page2 = await stack.fetchRaw("/doctors?page=2");
    assert.equal(page2.headers["x-gaf-cache"], "MISS");
    assert.deepEqual(stack.renders, ["/doctors?utm_source=google", "/doctors?page=2"]);
  } finally {
    await stack.close();
  }
});

test("simultaneous requests for one URL share a single render", async () => {
  const stack = await startStack({ renderMs: 150 });
  try {
    const responses = await Promise.all([
      stack.fetchRaw("/hospitals"),
      stack.fetchRaw("/hospitals"),
      stack.fetchRaw("/hospitals"),
    ]);
    assert.deepEqual(stack.renders, ["/hospitals"]);
    assert.deepEqual(
      responses.map((res) => res.headers["x-gaf-cache"]).sort(),
      ["HIT", "HIT", "MISS"],
    );
    assert.equal(stack.cache.stats.coalesced, 2);
  } finally {
    await stack.close();
  }
});

test("the render limiter keeps distinct misses to the configured concurrency", async () => {
  const stack = await startStack({ renderMs: 100, concurrency: 1 });
  try {
    const started = Date.now();
    await Promise.all(["/a", "/b", "/c"].map((p) => stack.fetchRaw(p)));
    assert.ok(Date.now() - started >= 250, "three renders at concurrency 1 run back to back");
    assert.deepEqual(stack.renders, ["/a", "/b", "/c"]);
  } finally {
    await stack.close();
  }
});

test("stale entries are served immediately and refreshed in the background", async () => {
  const stack = await startStack();
  try {
    await stack.fetchRaw("/blogs");
    stack.advance(5_000);
    const stale = await stack.fetchRaw("/blogs");
    assert.equal(stale.headers["x-gaf-cache"], "STALE");
    assert.equal(stale.headers.age, "5");
    assert.match(stale.body.toString(), /render 1/);
    for (let i = 0; i < 100 && (stack.renders.length < 2 || stack.cache.inflight.size > 0); i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.deepEqual(stack.renders, ["/blogs", "/blogs"]);
    const fresh = await stack.fetchRaw("/blogs");
    assert.equal(fresh.headers["x-gaf-cache"], "HIT");
    assert.match(fresh.body.toString(), /render 2/);

    stack.advance(20_000);
    const expired = await stack.fetchRaw("/blogs");
    assert.equal(expired.headers["x-gaf-cache"], "MISS");
  } finally {
    await stack.close();
  }
});

test("404 pages are cached with their shorter freshness", async () => {
  const stack = await startStack();
  try {
    const first = await stack.fetchRaw("/missing");
    assert.equal(first.status, 404);
    assert.equal(first.headers["x-gaf-cache"], "MISS");
    const second = await stack.fetchRaw("/missing");
    assert.equal(second.status, 404);
    assert.equal(second.headers["x-gaf-cache"], "HIT");
    stack.advance(700);
    const stale = await stack.fetchRaw("/missing");
    assert.equal(stale.headers["x-gaf-cache"], "STALE");
  } finally {
    await stack.close();
  }
});

test("Uint8Array response chunks are stored and replayed byte-for-byte", async () => {
  const stack = await startStack();
  try {
    const miss = await stack.fetchRaw("/sitemap-bytes.xml");
    assert.equal(miss.status, 200);
    assert.equal(miss.headers["x-gaf-cache"], "MISS");
    assert.equal(miss.body.toString("utf8"), BYTES_XML);
    const hit = await stack.fetchRaw("/sitemap-bytes.xml");
    assert.equal(hit.headers["x-gaf-cache"], "HIT");
    assert.equal(hit.headers["content-type"], "application/xml");
    assert.equal(hit.body.toString("utf8"), BYTES_XML);
    assert.equal(hit.headers["content-length"], String(Buffer.byteLength(BYTES_XML)));
    assert.deepEqual(stack.renders, ["/sitemap-bytes.xml"]);
  } finally {
    await stack.close();
  }
});

test("redirects and cookie-setting responses are streamed through, never stored", async () => {
  const stack = await startStack();
  try {
    const redirect = await stack.fetchRaw("/redirect");
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.location, "/doctors");
    assert.equal(redirect.headers["x-gaf-cache"], "MISS");
    const again = await stack.fetchRaw("/redirect");
    assert.equal(again.headers["x-gaf-cache"], "MISS");
    const priv = await stack.fetchRaw("/private");
    assert.equal(priv.headers["x-gaf-cache"], "MISS");
    assert.equal(priv.headers["set-cookie"][0], "session=1");
    assert.deepEqual(stack.renders, ["/redirect", "/redirect", "/private"]);
    assert.equal(stack.cache.memory.size, 0);
    assert.equal(stack.cache.stats.skipped, 3);
    assert.equal((await fsp.readdir(stack.dir)).filter((name) => name.endsWith(".bin")).length, 0);
  } finally {
    await stack.close();
  }
});

test("without a working loopback, stale pages are refreshed on the request itself", async () => {
  const stack = await startStack({ loopback: false });
  try {
    // Simulate a host that refuses self-connections.
    await stack.cache.ready;
    stack.cache.loopbackOk = false;
    await stack.fetchRaw("/costs");
    stack.advance(5_000);
    const refreshed = await stack.fetchRaw("/costs");
    assert.equal(refreshed.headers["x-gaf-cache"], "MISS");
    assert.match(refreshed.body.toString(), /render 2/);
    assert.equal((await stack.fetchRaw("/costs")).headers["x-gaf-cache"], "HIT");
    assert.deepEqual(stack.renders, ["/costs", "/costs"]);
  } finally {
    await stack.close();
  }
});

test("without a loopback, a saturated limiter still answers stale pages immediately", async () => {
  const stack = await startStack({ loopback: false, renderMs: 150, concurrency: 1 });
  try {
    await stack.cache.ready;
    stack.cache.loopbackOk = false;
    await stack.fetchRaw("/about");
    stack.advance(5_000);
    const busy = stack.fetchRaw("/slow-1");
    await new Promise((resolve) => setTimeout(resolve, 30));
    const stale = await stack.fetchRaw("/about");
    assert.equal(stale.headers["x-gaf-cache"], "STALE");
    assert.match(stale.body.toString(), /render 1/);
    await busy;
    assert.deepEqual(stack.renders, ["/about", "/slow-1"]);
  } finally {
    await stack.close();
  }
});

test("a client that disconnects mid-render does not poison the cache", async () => {
  const stack = await startStack({ renderMs: 200 });
  try {
    await new Promise((resolve) => {
      const req = httpRequest({ host: "127.0.0.1", port: stack.port, path: "/gone" }, () => {});
      req.on("error", () => {});
      req.end();
      setTimeout(() => {
        req.destroy();
        resolve();
      }, 20);
    });
    for (let i = 0; i < 100 && stack.cache.inflight.size > 0; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.equal(stack.cache.memory.size, 0);
    const later = await stack.fetchRaw("/gone");
    assert.equal(later.headers["x-gaf-cache"], "MISS");
    assert.equal(later.status, 200);
  } finally {
    await stack.close();
  }
});

test("CMS sessions bypass the cache entirely", async () => {
  const stack = await startStack();
  try {
    await stack.fetchRaw("/doctors");
    const preview = await stack.fetchRaw("/doctors", { headers: { cookie: "gaf_cms=token" } });
    assert.equal(preview.headers["x-gaf-cache"], undefined);
    assert.match(preview.body.toString(), /render 2/);
    const anonymous = await stack.fetchRaw("/doctors");
    assert.equal(anonymous.headers["x-gaf-cache"], "HIT");
    assert.match(anonymous.body.toString(), /render 1/);
  } finally {
    await stack.close();
  }
});

test("editing content starts a new cache generation", async () => {
  const stack = await startStack();
  try {
    await stack.fetchRaw("/treatments");
    assert.equal((await stack.fetchRaw("/treatments")).headers["x-gaf-cache"], "HIT");
    writeFileSync(path.join(stack.contentDir, "cms.json"), "{\"edited\":true}");
    const future = new Date(Date.now() + 10_000);
    utimesSync(path.join(stack.contentDir, "cms.json"), future, future);
    assert.equal(stack.cache.refreshGeneration(), true);
    assert.equal(stack.cache.refreshGeneration(), false);
    const after = await stack.fetchRaw("/treatments");
    assert.equal(after.headers["x-gaf-cache"], "MISS");
    assert.deepEqual(stack.renders, ["/treatments", "/treatments"]);
  } finally {
    await stack.close();
  }
});

test("attachHtmlCache wraps an already-listening server's request listener once", async () => {
  const renders = [];
  const server = createServer((req, res) => {
    if (!req.headers["x-gaf-render"]) renders.push(req.url);
    res.writeHead(200, { "content-type": "text/html", "cache-control": "public, s-maxage=60" });
    res.end("<h1>wrapped</h1>");
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const dir = mkdtempSync(path.join(os.tmpdir(), "gaf-attach-"));
  const cache = new HtmlCache({ dir, env: {}, log: () => {} });
  try {
    assert.equal(attachHtmlCache(server, cache, { warm: [] }), cache);
    assert.equal(attachHtmlCache(server, cache, { warm: [] }), null);
    const { port } = server.address();
    const fetchHeaders = () =>
      new Promise((resolve, reject) => {
        httpRequest({ host: "127.0.0.1", port, path: "/wrapped" }, (res) => {
          res.resume();
          res.on("end", () => resolve(res.headers));
        })
          .on("error", reject)
          .end();
      });
    assert.equal((await fetchHeaders())["x-gaf-cache"], "MISS");
    assert.equal((await fetchHeaders())["x-gaf-cache"], "HIT");
    assert.deepEqual(renders, ["/wrapped"]);
  } finally {
    cache.stop();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("installHtmlCacheOnActiveServers finds a listening server the way instrumentation does", async () => {
  const server = createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html", "cache-control": "public, s-maxage=60" });
    res.end("<h1>next start</h1>");
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const root = mkdtempSync(path.join(os.tmpdir(), "gaf-root-"));
  try {
    assert.ok(installHtmlCacheOnActiveServers(root, { warm: [], env: {}, log: () => {} }) >= 1);
    const { port } = server.address();
    const headers = await new Promise((resolve, reject) => {
      httpRequest({ host: "127.0.0.1", port, path: "/from-next-start" }, (res) => {
        res.resume();
        res.on("end", () => resolve(res.headers));
      })
        .on("error", reject)
        .end();
    });
    assert.equal(headers["x-gaf-cache"], "MISS");
    assert.ok(existsSync(path.join(root, ".next", "cache", "gaf-html")));
  } finally {
    server[Symbol.for("gaf.html-cache.attached")]?.stop();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("installHtmlCacheWithRetry explains itself and catches a listener opened after it ran", async () => {
  const lines = [];
  const log = (line) => lines.push(line);
  assert.equal(await installHtmlCacheWithRetry("/nonexistent", { env: { GAF_HTML_CACHE: "off" }, log }), 0);
  assert.match(lines.at(-1), /html cache off \(GAF_HTML_CACHE=off\)/);

  // The poll timer is unref'd (a real server keeps the loop alive); hold it here.
  const hold = setTimeout(() => {}, 10_000);
  try {
    assert.equal(await installHtmlCacheWithRetry("/nonexistent", { warm: [], env: {}, log, retryMs: 300 }), 0);
    assert.match(lines.at(-1), /no listening http server found within 0 s/);
    assert.match(lines.at(-1), /Active handles:/);
  } finally {
    clearTimeout(hold);
  }

  const root = mkdtempSync(path.join(os.tmpdir(), "gaf-root-"));
  const pending = installHtmlCacheWithRetry(root, { warm: [], env: {}, log, retryMs: 5_000 });
  const server = createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html", "cache-control": "public, s-maxage=60" });
    res.end("<h1>late listener</h1>");
  });
  await new Promise((resolve) => setTimeout(resolve, 100));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    assert.ok((await pending) >= 1);
    assert.match(lines.at(-1), /html cache on: .* \(attached to the next start listener after \d+ ms\)/);
    const { port } = server.address();
    const headers = await new Promise((resolve, reject) => {
      httpRequest({ host: "127.0.0.1", port, path: "/late" }, (res) => {
        res.resume();
        res.on("end", () => resolve(res.headers));
      })
        .on("error", reject)
        .end();
    });
    assert.equal(headers["x-gaf-cache"], "MISS");
  } finally {
    server[Symbol.for("gaf.html-cache.attached")]?.stop();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("describeHtmlCache summarises the active configuration", () => {
  assert.equal(describeHtmlCache(null), "html cache off");
  assert.match(describeHtmlCache({ config: htmlCacheConfig({}) }), /fresh 60 min, stale 168 h, 2 concurrent renders/);
});

test("the disk sweep removes expired files and enforces the byte cap", async () => {
  const stack = await startStack();
  try {
    await stack.fetchRaw("/one");
    await stack.fetchRaw("/two");
    const before = await stack.cache.sweepDisk();
    assert.equal(before.removed, 0);
    stack.cache.config.diskBytes = 1;
    const capped = await stack.cache.sweepDisk();
    assert.ok(capped.removed >= 1);
    assert.ok(capped.bytes <= 1 || capped.removed === 2);
  } finally {
    await stack.close();
  }
});
