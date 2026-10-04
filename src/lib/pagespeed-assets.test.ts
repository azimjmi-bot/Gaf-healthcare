import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
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

test("production config inlines CSS so the homepage has no blocking stylesheet request", () => {
  const config = readFileSync(join(process.cwd(), "next.config.mjs"), "utf8");
  assert.match(config, /inlineCss:\s*true/);
});

test("English root layout does not construct unused Noto families", () => {
  const layout = readFileSync(join(process.cwd(), "src/app/layout.tsx"), "utf8");
  assert.doesNotMatch(layout, /Noto_Sans/);
  assert.doesNotMatch(layout, /Noto_Sans_Arabic/);
  assert.match(layout, /LocaleFontLinks/);
  assert.match(layout, /clientMessagesFor/);
});

test("route-only stylesheets are no longer part of the global CSS", () => {
  const globals = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  for (const prefix of [
    "\n.cms-shell {",
    "\n.cms-nav {",
    "\n.tanzania-hub",
    "\n.hp-hero {",
    "\n.treatment-card {",
    "\n.treatment-filters {",
  ]) {
    assert.ok(!globals.includes(prefix), `${prefix.trim()} should live in a route stylesheet`);
  }
  for (const file of [
    "src/app/cms/cms.css",
    "src/styles/origin-hub.css",
    "src/styles/treatments.css",
    "src/styles/hospital-profile.css",
  ]) {
    assert.ok(existsSync(join(process.cwd(), file)), file);
  }
  const cmsLayout = readFileSync(join(process.cwd(), "src/app/cms/layout.tsx"), "utf8");
  assert.match(cmsLayout, /import "\.\/cms\.css"/);
  const card = readFileSync(join(process.cwd(), "src/components/treatment-card.tsx"), "utf8");
  assert.match(card, /styles\/treatments\.css/);
  const seals = readFileSync(join(process.cwd(), "src/components/accreditation-seals.tsx"), "utf8");
  assert.match(seals, /styles\/hospital-profile\.css/);
});

test("every origin-country hub imports the hub stylesheet", () => {
  const appDir = join(process.cwd(), "src/app");
  const hubs = readdirSync(appDir)
    .map((dir) => join(appDir, dir, "treatment-in-india/page.tsx"))
    .filter((file) => existsSync(file));
  assert.ok(hubs.length >= 30);
  for (const file of hubs) {
    const source = readFileSync(file, "utf8");
    assert.match(source, /styles\/origin-hub\.css/, file);
    assert.match(source, /styles\/treatments\.css/, file);
  }
});

test("logos ship from /_next/static so the CDN caches them immutably", () => {
  for (const file of ["src/components/site-header.tsx", "src/components/site-footer.tsx"]) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    assert.doesNotMatch(source, /"\/brand\/gaf-healthcare[^"]*\.svg"/, file);
    assert.match(source, /@\/assets\/brand\/gaf-healthcare/, file);
  }
  assert.ok(existsSync(join(process.cwd(), "src/assets/brand/gaf-healthcare-light.svg")));
});

test("legacy polyfill module is replaced for the modern browserslist", () => {
  const config = readFileSync(join(process.cwd(), "next.config.mjs"), "utf8");
  assert.match(config, /NormalModuleReplacementPlugin/);
  assert.match(config, /polyfill-module/);
  const shim = readFileSync(join(process.cwd(), "src/lib/polyfills/modern-browsers.js"), "utf8");
  assert.doesNotMatch(shim, /Array\.prototype\.(at|flat|flatMap)\s*=/);
  assert.doesNotMatch(shim, /Object\.fromEntries\s*=/);
});

test("homepage estimate CTA stays off the LocaleLink client graph", () => {
  const source = readFileSync(join(process.cwd(), "src/components/pseo-estimate-cta.tsx"), "utf8");
  assert.doesNotMatch(source, /locale-link/);
  assert.doesNotMatch(source, /"use client"/);
});

