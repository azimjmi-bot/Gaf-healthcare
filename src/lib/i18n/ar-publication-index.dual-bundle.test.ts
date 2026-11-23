/**
 * Cross-bundle regression for the PR #54 BLOCKED finding.
 *
 * Architecture under test:
 * - Worker entry evaluates one copy of the publication-index module and installs.
 * - OpenNext server evaluates a second copy (different module instance).
 * - Both must resolve the same index via Symbol.for on globalThis.
 *
 * This file loads two distinct .mjs file URLs (entry vs opennext) so Node
 * cannot collapse them into one module record. Single-graph imports alone are
 * not treated as proof of dual-bundle behaviour.
 */
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, test } from "node:test";
import {
  AR_PUBLICATION_INDEX_GLOBAL_KEY,
  arPathIsIndexedPublished,
  buildArPublicationIndexDocument,
  clearArPublicationIndex,
  hasArPublicationIndex,
  installArPublicationIndex,
} from "@/lib/i18n/ar-publication-index";
import { languageOptions } from "@/lib/i18n/language-options";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { useArPublicationIndexForMetadata } from "@/lib/i18n/locale-publication";
import { setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { MANIFEST_KEY, R2ContentStorage, StorageHydrationError, type ContentManifest } from "@/lib/storage/r2";
import { ASSET_KEYS, groupsForRequest } from "@/worker/runtime";
import { COST_ARTICLES_KEY } from "@/data/cost-articles/asset";
import { CATALOG_SEED_KEY } from "@/lib/catalog-seed";

const HERE = dirname(fileURLToPath(import.meta.url));

async function loadDualBundles() {
  const entryUrl = pathToFileURL(join(HERE, "dual-bundle/entry-ar-publication-index.mjs")).href;
  const nextUrl = pathToFileURL(join(HERE, "dual-bundle/opennext-ar-publication-index.mjs")).href;
  const entry = await import(entryUrl);
  const opennext = await import(nextUrl);
  assert.notEqual(entryUrl, nextUrl);
  assert.notEqual(entry.BUNDLE_ID, opennext.BUNDLE_ID);
  // Distinct module namespace objects — proof we did not load one shared ESM record.
  assert.notEqual(entry, opennext);
  assert.notEqual(entry.installArPublicationIndex, opennext.installArPublicationIndex);
  return { entry, opennext };
}

afterEach(() => {
  clearArPublicationIndex();
  setContentStorage(undefined);
});

test("pre-fix dual-bundle failure: module-scoped copies do NOT share install", async () => {
  const entryUrl = pathToFileURL(join(HERE, "dual-bundle/entry-module-scoped.mjs")).href;
  const nextUrl = pathToFileURL(join(HERE, "dual-bundle/opennext-module-scoped.mjs")).href;
  const entry = await import(entryUrl);
  const opennext = await import(nextUrl);
  entry.clearArPublicationIndex();
  opennext.clearArPublicationIndex();
  entry.installArPublicationIndex({ version: 1, paths: ["/doctors"] });
  assert.equal(entry.hasArPublicationIndex(), true);
  assert.equal(
    opennext.hasArPublicationIndex(),
    false,
    "module-scoped OpenNext copy remains empty — reproduces PR #54 BLOCKED architecture",
  );
});

test("dual-bundle: entry install is visible to a separate OpenNext module instance", async () => {
  const { entry, opennext } = await loadDualBundles();
  entry.clearArPublicationIndex();
  assert.equal(entry.hasArPublicationIndex(), false);
  assert.equal(opennext.hasArPublicationIndex(), false);

  entry.installArPublicationIndex({
    version: 1,
    generatedAt: "2026-11-23T00:00:00.000Z",
    paths: ["/", "/doctors", "/hospitals", "/treatments"],
  });

  assert.equal(entry.hasArPublicationIndex(), true, "entry sees its own install");
  assert.equal(opennext.hasArPublicationIndex(), true, "OpenNext copy must see entry install");
  assert.equal(opennext.arPathIsIndexedPublished("/doctors"), true);
  assert.equal(opennext.arPathIsIndexedPublished("/missing"), false);

  // Production TypeScript module must share the same Symbol.for registry.
  assert.equal(hasArPublicationIndex(), true, "TS module shares global registry");
  assert.equal(arPathIsIndexedPublished("/hospitals"), true);

  opennext.clearArPublicationIndex();
  assert.equal(entry.hasArPublicationIndex(), false, "clear from OpenNext clears entry view");
  assert.equal(hasArPublicationIndex(), false);
});

test("dual-bundle: production install is visible to both synthetic bundles", async () => {
  const { entry, opennext } = await loadDualBundles();
  clearArPublicationIndex();
  installArPublicationIndex(buildArPublicationIndexDocument(["/doctors", "/treatments"]));
  assert.equal(entry.hasArPublicationIndex(), true);
  assert.equal(opennext.hasArPublicationIndex(), true);
  assert.equal(entry.arPathIsIndexedPublished("/doctors"), true);
  assert.equal(opennext.arPathIsIndexedPublished("/treatments"), true);
});

test("dual-bundle: Symbol.for key is the documented stable cross-bundle id", () => {
  assert.equal(AR_PUBLICATION_INDEX_GLOBAL_KEY, "gaf.ar-publication-index");
  clearArPublicationIndex();
  installArPublicationIndex(buildArPublicationIndexDocument(["/doctors"]));
  const reg = (globalThis as Record<symbol, { paths: Set<string> | null }>)[
    Symbol.for(AR_PUBLICATION_INDEX_GLOBAL_KEY)
  ];
  assert.ok(reg);
  assert.ok(reg.paths instanceof Set);
  assert.equal(reg.paths.has("/doctors"), true);
});

test("dual-bundle incident: entry skips AR hydrate while OpenNext probes use shared index", async () => {
  const { entry, opennext } = await loadDualBundles();
  clearArPublicationIndex();

  const CONTENT: Record<string, string> = {
    "content/cms.json": '{"articles":[]}',
    "content/catalog-cms.json": "{}",
    "content/curated-treatments.json": '{"treatments":[]}',
    "content/ar/cms.json": '{"articles":[]}',
    "content/ar/catalog-cms.json": JSON.stringify({
      doctorOverrides: {},
      hospitalOverrides: {},
      treatmentOverrides: {},
      doctorsAdded: [],
      hospitalsAdded: [],
      treatmentsAdded: [],
      doctorsDeleted: [],
      hospitalsDeleted: [],
      treatmentsDeleted: [],
      pad: "x".repeat(2048),
    }),
    "content/ai-generations.json": '{"generations":[]}',
  };
  const bucket = new FakeR2Bucket(CONTENT);
  const manifest: ContentManifest = {
    version: 1,
    generatedAt: "2026-11-23T00:00:00.000Z",
    keys: Object.keys(CONTENT),
  };
  bucket.seed(MANIFEST_KEY, JSON.stringify(manifest));

  const catalog = JSON.stringify({
    doctors: [
      {
        slug: "dr-a-anitha-1",
        name: "Dr. A Anitha",
        featured: false,
        specialty: "Nephrology",
        experience: "20+ years",
        qualifications: "MBBS",
        designation: "Senior Consultant",
        hospitalName: "Apollo",
        hospitalHref: "/x/",
        hospitalSlug: "apollo-hospitals-bannerghatta-road",
        hospitalCaption: "Apollo",
        city: "Bengaluru",
        cityCountry: "Bengaluru, India",
        specializations: ["Nephrology"],
        proceduresExpertise: ["Dialysis"],
        education: ["MBBS"],
        affiliations: [],
        awards: [],
        research: [],
        memberships: [],
        languages: "English, Hindi",
        consultationFee: "",
      },
    ],
    hospitals: [
      {
        slug: "apollo-hospitals-bannerghatta-road",
        href: "/x/",
        name: "Apollo Hospitals, Bannerghatta Road",
        city: "Bengaluru",
        established: "2007",
        beds: "250",
        accreditation: "JCI",
        bio: "Campus",
        specialty: "Radiation Oncology",
        image: "",
        summary: "",
      },
    ],
    treatments: [],
  });

  const storage = new R2ContentStorage({
    content: bucket,
    static: new FakeR2Bucket(),
    assets: {
      async fetch(input: string | URL | Request) {
        const url = new URL(input instanceof Request ? input.url : String(input));
        if (url.pathname === `/_gaf/${CATALOG_SEED_KEY}`) return new Response(catalog, { status: 200 });
        if (url.pathname === `/_gaf/${COST_ARTICLES_KEY}`) return new Response("{}", { status: 200 });
        if (url.pathname === "/ar-ro-directory.css") return new Response(".x{}", { status: 200 });
        return new Response("Not Found", { status: 404 });
      },
    },
    assetKeys: ASSET_KEYS,
    log: () => {},
  });
  setContentStorage(storage);
  await storage.ensureHydrated("en");
  assert.equal(storage.isHydrated("ar"), false);

  // Worker-entry bundle installs; OpenNext bundle (and TS helpers) must see it.
  entry.installArPublicationIndex(
    buildArPublicationIndexDocument(["/", "/doctors", "/hospitals", "/treatments"]),
  );
  assert.equal(opennext.hasArPublicationIndex(), true);
  assert.equal(hasArPublicationIndex(), true);
  assert.deepEqual([...groupsForRequest("/doctors")], ["en"], "entry skip uses shared index");
  assert.equal(useArPublicationIndexForMetadata(), true);

  const before = bucket.calls.filter((c) => c.op === "get" && String(c.key).startsWith("content/ar/")).length;
  assert.doesNotThrow(() => languageOptions("/doctors"));
  assert.doesNotThrow(() => languageOptions("/hospitals"));
  assert.doesNotThrow(() => languageOptions("/treatments"));
  const meta = withLocaleMetadata({ title: "t" }, "/doctors", "en", ["en", "ar"]);
  const languages = (meta.alternates as { languages?: Record<string, string> }).languages ?? {};
  assert.ok(languages.ar, "hreflang ar retained from shared index");
  const after = bucket.calls.filter((c) => c.op === "get" && String(c.key).startsWith("content/ar/")).length;
  assert.equal(after, before, "no content/ar/* R2 gets while AR cold");
  assert.equal(storage.isHydrated("ar"), false);

  // Ungated live path still throws — proves AR CMS remains unhydrated.
  assert.throws(
    () => storage.read("content/ar/catalog-cms.json"),
    (error: unknown) => error instanceof StorageHydrationError,
  );
});
