import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { HOME_DESTINATIONS } from "@/data/home";

test("homepage destination cards use local cached images, not Unsplash", () => {
  for (const place of HOME_DESTINATIONS) {
    assert.match(place.image, /^\/images\/destinations\/.+\.webp$/);
    assert.ok(existsSync(join(process.cwd(), "public", place.image)), place.image);
  }
});

test("next config caches the brand SVG PageSpeed flagged", () => {
  const config = readFileSync(join(process.cwd(), "next.config.mjs"), "utf8");
  assert.match(config, /source: "\/brand\/:file\*"/);
  assert.match(config, /max-age=31536000/);
});

test("analytics is deferred off the first document", () => {
  const layout = readFileSync(join(process.cwd(), "src/app/layout.tsx"), "utf8");
  assert.match(layout, /DeferredAnalytics/);
  assert.doesNotMatch(layout, /next\/script/);
  assert.doesNotMatch(layout, /strategy="lazyOnload"/);
});
