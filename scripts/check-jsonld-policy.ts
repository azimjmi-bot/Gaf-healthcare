/**
 * End-to-end check of the group (d) JSON-LD policy against a running server.
 *
 * The unit tests in src/server-tests/jsonld-policy.test.ts assert what the
 * emitters produce; this asserts what the pages actually serve, which is the
 * only place the JsonLd suppression, the proxy's locale handling and the real
 * overlay data all meet. Run it against `npm run build && npm run start`:
 *
 *   BASE_URL=http://127.0.0.1:43117 npm run check:jsonld-policy
 */
import { ENGLISH_ALTERNATES_BASELINE } from "../src/server-tests/english-alternates-fixture";
import { mapLimit, publishedArabicPaths } from "./published-arabic";

const BASE = process.env.BASE_URL || "http://127.0.0.1:43127";
const SITE = "https://gaf.healthcare";
const LOCALE_PREFIXES = ["ar", "ru", "fr", "sw"];

/** Fragments that name a real-world thing rather than a document. */
const ENTITY_FRAGMENTS = new Set(["person", "hospital", "organisation", "procedure", "website"]);

/**
 * Page types that have never emitted structured data. Group (d) was about the
 * identity and language of the nodes we already publish, not about adding nodes
 * to ranking English pages, so these stay empty and are recorded rather than
 * flagged. A page type leaving this list must gain JSON-LD deliberately.
 */
const PAGES_WITHOUT_JSONLD = new Set([
  "hospital faculty sub-page",
  "hospital procedures sub-page",
  "treatments index",
  "blogs index",
  "blog post",
  "consult",
]);

/** Node types that may carry inLanguage; everything else is a real-world entity. */
const LOCALISED_DOCUMENT_TYPES = new Set([
  "WebPage",
  "MedicalWebPage",
  "ProfilePage",
  "CollectionPage",
  "FAQPage",
  "BreadcrumbList",
  "ItemList",
]);

/**
 * Page types whose JSON-LD is a real-world entity and nothing else, so there is
 * no document node to hang inLanguage on. Adding one would mean publishing a
 * new node on a ranking English page, which group (d) deliberately does not do.
 */
const ENTITY_ONLY_PAGES = new Set(["home"]);

const BLOCK = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
const ROBOTS = /<meta name="robots" content="([^"]*)"/;

function decode(raw: string) {
  return raw
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

type Fetched = { status: number; indexable: boolean; blocks: unknown[]; raw: string[] };

const cache = new Map<string, Promise<Fetched>>();

function load(url: string) {
  const key = url.startsWith("http") ? url : new URL(url, BASE).toString();
  const existing = cache.get(key);
  if (existing) return existing;
  const pending = (async (): Promise<Fetched> => {
    const target = key.startsWith(SITE) ? `${BASE}${key.slice(SITE.length)}` : key;
    const response = await fetch(target, { redirect: "manual" });
    if (response.status !== 200) {
      return { status: response.status, indexable: false, blocks: [], raw: [] };
    }
    const html = await response.text();
    const blocks: unknown[] = [];
    const raw: string[] = [];
    for (const match of html.matchAll(BLOCK)) {
      const text = decode(match[1]).trim();
      if (!text) continue;
      raw.push(text);
      blocks.push(JSON.parse(text));
    }
    const robots = html.match(ROBOTS)?.[1] ?? "";
    return { status: 200, indexable: !robots.includes("noindex"), blocks, raw };
  })();
  cache.set(key, pending);
  return pending;
}

function walk(value: unknown, visit: (node: Record<string, unknown>) => void) {
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
  } else if (value && typeof value === "object") {
    visit(value as Record<string, unknown>);
    for (const item of Object.values(value)) walk(item, visit);
  }
}

function siteUrlsIn(value: unknown, out = new Set<string>()) {
  if (typeof value === "string") {
    if (value.startsWith(SITE)) out.add(value);
  } else if (Array.isArray(value)) {
    for (const item of value) siteUrlsIn(item, out);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) siteUrlsIn(item, out);
  }
  return out;
}

function idsIn(blocks: unknown[]) {
  const entity = new Set<string>();
  const document = new Set<string>();
  for (const block of blocks) {
    walk(block, (node) => {
      const id = node["@id"];
      if (typeof id !== "string") return;
      const fragment = id.split("#")[1] ?? "";
      (ENTITY_FRAGMENTS.has(fragment) ? entity : document).add(id);
    });
  }
  return { entity, document };
}

function localePrefixOf(url: string) {
  const path = url.slice(SITE.length).split("#")[0] || "/";
  return LOCALE_PREFIXES.find((code) => path === `/${code}` || path.startsWith(`/${code}/`));
}

async function main() {
  const problems: string[] = [];
  const stats = { pages: 0, blocks: 0, suppressed: 0, noJsonLd: 0, urlsChecked: 0 };

  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    if (row.served === "404") continue;
    const arabicPublished = row.published.includes("ar");
    const english = await load(`${SITE}${row.path}`);
    const arabic = await load(`${SITE}/ar${row.path === "/" ? "" : row.path}`);

    for (const [locale, page] of [["en", english], ["ar", arabic]] as const) {
      if (page.status !== 200) {
        if (locale === "en") problems.push(`${row.label}: English page returned ${page.status}`);
        continue;
      }
      stats.pages += 1;
      stats.blocks += page.blocks.length;

      // A page that is not indexable must make no structured-data claims.
      if (!page.indexable) {
        if (page.blocks.length > 0) {
          problems.push(`${row.label} [${locale}]: noindex page emits ${page.blocks.length} JSON-LD block(s)`);
        } else {
          stats.suppressed += 1;
        }
        continue;
      }

      if (PAGES_WITHOUT_JSONLD.has(row.label)) {
        if (page.blocks.length > 0) {
          problems.push(
            `${row.label} [${locale}]: gained JSON-LD; remove it from PAGES_WITHOUT_JSONLD if intended`,
          );
        } else {
          stats.noJsonLd += 1;
        }
        continue;
      }
      if (page.blocks.length === 0) {
        problems.push(`${row.label} [${locale}]: indexable page emits no JSON-LD`);
        continue;
      }

      let pageTagged = 0;
      for (const block of page.blocks) {
        const node = block as Record<string, unknown>;
        if (node["@context"] !== "https://schema.org") {
          problems.push(`${row.label} [${locale}]: block missing @context`);
        }
        // Documents declare the page language; entities must not, since their
        // @id is shared with the other language's page.
        let tagged = 0;
        walk(node, (inner) => {
          const types = [inner["@type"]].flat().map(String);
          const isDocument = types.some((type) => LOCALISED_DOCUMENT_TYPES.has(type));
          if ("inLanguage" in inner) {
            tagged += 1;
            if (!isDocument) {
              problems.push(`${row.label} [${locale}]: ${types.join("+")} is an entity but declares inLanguage`);
            } else if (inner.inLanguage !== locale) {
              problems.push(
                `${row.label} [${locale}]: ${types.join("+")} inLanguage is ${JSON.stringify(inner.inLanguage)}`,
              );
            }
          } else if (isDocument && inner === node) {
            problems.push(`${row.label} [${locale}]: top-level ${types.join("+")} declares no inLanguage`);
          }
        });
        pageTagged += tagged;
      }
      // A page needs one document node declaring its language. Pages whose only
      // node is a real-world entity have nowhere to put it; there the <html lang>
      // attribute and the hreflang block carry the signal instead.
      if (pageTagged === 0 && !ENTITY_ONLY_PAGES.has(row.label)) {
        problems.push(`${row.label} [${locale}]: no node declares the page language`);
      }

      // Nothing may point a crawler at a URL that 404s or carries noindex.
      for (const url of siteUrlsIn(page.blocks)) {
        const prefix = localePrefixOf(url);
        if (!prefix) continue;
        stats.urlsChecked += 1;
        const target = await load(url.split("#")[0]);
        if (target.status !== 200) {
          problems.push(`${row.label} [${locale}]: references ${url} which returned ${target.status}`);
        } else if (!target.indexable) {
          problems.push(`${row.label} [${locale}]: references noindex ${url}`);
        }
      }
    }

    if (!arabicPublished || arabic.status !== 200 || !arabic.indexable) continue;
    if (PAGES_WITHOUT_JSONLD.has(row.label)) continue;

    const en = idsIn(english.blocks);
    const ar = idsIn(arabic.blocks);
    for (const id of ar.entity) {
      if (localePrefixOf(id)) {
        problems.push(`${row.label}: Arabic entity @id is locale-prefixed: ${id}`);
      }
      if (en.entity.size && !en.entity.has(id)) {
        problems.push(`${row.label}: Arabic entity @id ${id} has no English counterpart`);
      }
    }
    for (const id of ar.document) {
      if (!localePrefixOf(id)) {
        problems.push(`${row.label}: Arabic document @id is not locale-scoped: ${id}`);
      }
      if (en.document.has(id)) {
        problems.push(`${row.label}: Arabic document @id ${id} collides with English`);
      }
    }
    if (en.document.size > 0 && ar.document.size === 0) {
      problems.push(`${row.label}: Arabic page emits no document @id`);
    }
  }

  console.log(
    `Checked ${stats.pages} rendered pages, ${stats.blocks} JSON-LD blocks, ` +
      `${stats.urlsChecked} localised URL references.\n` +
      `${stats.suppressed} noindex pages emitted none; ${stats.noJsonLd} page types carry none by design.`,
  );
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exitCode = 1;
    return;
  }
  console.log("JSON-LD policy holds on every sampled page.");

  if (!(await sweepPublishedArabic())) process.exitCode = 1;
}

/**
 * The same language and identity rules, across every published Arabic URL.
 *
 * The pass above walks one page per type, which is the right granularity for
 * catching an emitter changing shape. It is the wrong granularity for catching
 * a single facet out of a hundred serving the wrong inLanguage, and a facet
 * gate opens a hundred at a time.
 */
const isHome = (path: string) => path === "/ar";

/**
 * The by-design-empty page types from PAGES_WITHOUT_JSONLD, recognised by
 * shape rather than by fixture label, since the sweep has no labels.
 */
function carriesNoJsonLdByDesign(path: string) {
  const segments = path.split("/").filter(Boolean).slice(1);
  if (segments[0] === "hospitals" && segments[2] === "doctors") return true;
  if (segments[0] === "hospitals" && segments[2] === "procedures") return true;
  return segments[0] === "treatments" || segments[0] === "blogs" || segments[0] === "consult";
}

async function sweepPublishedArabic() {
  const paths = await publishedArabicPaths(BASE);
  console.log(`\nSweeping ${paths.length} published Arabic URLs from sitemap-ar.xml`);
  let blocks = 0;

  const results = await mapLimit(paths, 12, async (path) => {
    const page = await load(`${SITE}${path}`);
    const found: string[] = [];
    if (page.status !== 200) return { path, found: [`HTTP ${page.status}`], blocks: 0 };
    // Everything here is in sitemap-ar.xml, so everything here must be indexable.
    if (!page.indexable) found.push("listed in sitemap-ar.xml but serves noindex");
    if (page.blocks.length === 0 && !carriesNoJsonLdByDesign(path)) {
      found.push("indexable page emits no JSON-LD");
    }

    let documents = 0;
    for (const block of page.blocks) {
      const node = block as Record<string, unknown>;
      if (node["@context"] !== "https://schema.org") found.push("block missing @context");
      walk(node, (inner) => {
        const types = [inner["@type"]].flat().map(String);
        const isDocument = types.some((type) => LOCALISED_DOCUMENT_TYPES.has(type));
        if ("inLanguage" in inner) {
          if (!isDocument) found.push(`${types.join("+")} is an entity but declares inLanguage`);
          else if (inner.inLanguage !== "ar") {
            found.push(`${types.join("+")} inLanguage is ${JSON.stringify(inner.inLanguage)}`);
          } else documents += 1;
        }
        const id = inner["@id"];
        if (typeof id !== "string" || !id.startsWith(SITE)) return;
        const fragment = id.split("#")[1] ?? "";
        const prefixed = Boolean(localePrefixOf(id));
        if (ENTITY_FRAGMENTS.has(fragment) && prefixed) {
          found.push(`entity @id is locale-prefixed: ${id}`);
        }
        if (isDocument && fragment && !ENTITY_FRAGMENTS.has(fragment) && !prefixed) {
          found.push(`document @id is not locale-scoped: ${id}`);
        }
      });
    }
    if (documents === 0 && page.blocks.length > 0 && !isHome(path)) {
      found.push("no node declares the page language");
    }
    return { path, found, blocks: page.blocks.length };
  });

  const broken: typeof results = [];
  for (const row of results) {
    blocks += row.blocks;
    if (row.found.length > 0) broken.push(row);
  }
  for (const row of broken.slice(0, 20)) {
    console.error(`FAIL  ${row.path}`);
    for (const problem of row.found) console.error(`      ${problem}`);
  }
  if (broken.length > 20) console.error(`      ... and ${broken.length - 20} more`);
  console.log(
    broken.length === 0
      ? `JSON-LD policy holds across all ${paths.length} published Arabic URLs (${blocks} blocks).`
      : `${broken.length} of ${paths.length} published Arabic URLs break the policy.`,
  );
  return broken.length === 0;
}

void main();
