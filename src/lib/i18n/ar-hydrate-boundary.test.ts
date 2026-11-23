/**
 * Regression: PR #49 production incident
 * StorageHydrationError: content/ar/catalog-cms.json was read before the group was hydrated
 *
 * English catalogue routes skip AR hydrate when the publication index is loaded,
 * but layout/header languageOptions used to call localePathIsPublished("ar"),
 * which reads the Arabic catalog CMS file.
 */
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { COST_ARTICLES_KEY } from "@/data/cost-articles/asset";
import { CATALOG_SEED_KEY } from "@/lib/catalog-seed";
import {
  buildArPublicationIndexDocument,
  clearArPublicationIndex,
  installArPublicationIndex,
} from "@/lib/i18n/ar-publication-index";
import { languageOptions } from "@/lib/i18n/language-options";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import {
  localePageState,
  localePathIsPublished,
  publishedLocalesForPath,
  useArPublicationIndexForMetadata,
} from "@/lib/i18n/locale-publication";
import { setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { GROUP_LAYOUT, MANIFEST_KEY, R2ContentStorage, StorageHydrationError, type ContentManifest } from "@/lib/storage/r2";
import {
  ASSET_KEYS,
  createWorker,
  groupsForRequest,
  type ExecutionContextLike,
  type WorkerEnv,
} from "@/worker/runtime";

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

const STYLESHEET = ".ar-ro{}";
/** Minimal valid seed so `doctorsForLocale` can materialize English before probing AR. */
const CATALOG = JSON.stringify({
  doctors: [
    {
      slug: "dr-a-anitha-1",
      name: "Dr. A Anitha",
      featured: false,
      specialty: "Nephrology",
      experience: "20+ years Experience",
      qualifications: "MBBS, DNB (Nephrology)",
      designation: "Senior Consultant",
      hospitalName: "Apollo Hospitals, Bannerghatta Road, Bengaluru",
      hospitalHref: "/destinations/india/hospitals/apollo-hospitals/apollo-hospitals-bannerghatta-road/",
      hospitalSlug: "apollo-hospitals-bannerghatta-road",
      hospitalCaption: "Apollo Hospitals",
      city: "Bengaluru",
      cityCountry: "Bengaluru, India",
      specializations: ["Nephrology"],
      proceduresExpertise: ["Dialysis", "Hemodialysis"],
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
      href: "/destinations/india/hospitals/apollo-hospitals/apollo-hospitals-bannerghatta-road/",
      name: "Apollo Hospitals, Bannerghatta Road",
      city: "Bengaluru",
      established: "2007",
      beds: "250",
      accreditation: "JCI · NABH",
      bio: "Apollo Hospitals, Bannerghatta Road is a 250-bed JCI campus in Bengaluru.",
      specialty: "Radiation Oncology",
      image: "",
      summary: "",
    },
  ],
  treatments: [],
});
const CATALOG_PATH = `/_gaf/${CATALOG_SEED_KEY}`;
const COST_ARTICLES_PATH = `/_gaf/${COST_ARTICLES_KEY}`;
const DEPLOY_ASSETS = {
  "/ar-ro-directory.css": STYLESHEET,
  [CATALOG_PATH]: CATALOG,
  [COST_ARTICLES_PATH]: "{}",
};

function fakeAssets(files: Record<string, string> = DEPLOY_ASSETS) {
  return {
    async fetch(input: string | URL | Request) {
      const url = new URL(input instanceof Request ? input.url : String(input));
      const body = files[url.pathname];
      if (body === undefined) return new Response("Not Found", { status: 404 });
      return new Response(body, { status: 200 });
    },
  };
}

function seededContent() {
  const bucket = new FakeR2Bucket(CONTENT);
  const manifest: ContentManifest = {
    version: 1,
    generatedAt: "2026-11-23T00:00:00.000Z",
    keys: Object.keys(CONTENT),
  };
  bucket.seed(MANIFEST_KEY, JSON.stringify(manifest));
  return bucket;
}

function makeEnv(overrides: Partial<WorkerEnv> = {}): WorkerEnv & { CONTENT: FakeR2Bucket } {
  return {
    CONTENT: seededContent(),
    STATIC: new FakeR2Bucket(),
    ASSETS: fakeAssets(),
    ...overrides,
  } as WorkerEnv & { CONTENT: FakeR2Bucket };
}

function ctx(): ExecutionContextLike {
  return { waitUntil() {}, passThroughOnException() {} };
}

const quiet = { log: () => {}, versionCheckIntervalMs: 0 };

afterEach(() => {
  clearArPublicationIndex();
  setContentStorage(undefined);
});

test("incident reproduction: Worker EN /doctors with index — languageOptions in Next must not read AR catalog", async () => {
  const index = JSON.stringify(
    buildArPublicationIndexDocument(["/", "/doctors", "/hospitals", "/treatments", "/blogs"]),
  );
  const env = makeEnv({
    ASSETS: fakeAssets({ ...DEPLOY_ASSETS, "/_gaf/ar-publication-index.json": index }),
  });
  const indexed = new Set(["/", "/doctors", "/hospitals", "/treatments", "/blogs"]);
  const seen: string[] = [];
  const worker = createWorker(async (request) => {
    const path = new URL(request.url).pathname;
    seen.push(path);
    // Mirrors layout.tsx / site-header.tsx on every document render.
    const options = languageOptions(path);
    assert.ok(options.some((option) => option.locale === "ar"), `${path} offers Arabic`);
    const meta = withLocaleMetadata({ title: path }, path, "en", ["en", "ar"]);
    const languages = (meta.alternates as { languages?: Record<string, string> }).languages ?? {};
    if (indexed.has(path)) {
      assert.ok(languages.ar, `${path} keeps hreflang ar from index`);
    } else {
      assert.equal(languages.ar, undefined, `${path} not in index → no invented AR hreflang`);
    }
    return new Response("ok");
  }, quiet);

  for (const path of ["/doctors", "/hospitals", "/treatments", "/treatments/demo"]) {
    const response = await worker.fetch(new Request(`https://staging.example${path}`), env, ctx());
    assert.equal(response.status, 200, path);
  }
  assert.deepEqual(seen, ["/doctors", "/hospitals", "/treatments", "/treatments/demo"]);

  const storage = worker.storage();
  assert.ok(storage);
  assert.equal(storage.isHydrated("en"), true);
  assert.equal(storage.isHydrated("ar"), false, "EN catalogue must not hydrate AR when index is present");

  const arGets = env.CONTENT.calls.filter(
    (c) => c.op === "get" && String(c.key).startsWith("content/ar/"),
  ).length;
  assert.equal(arGets, 0, "no content/ar/* R2 gets on EN catalogue renders");
});

test("pre-fix failure mode: unhydrated AR catalog read throws StorageHydrationError", async () => {
  const bucket = seededContent();
  const storage = new R2ContentStorage({
    content: bucket,
    static: new FakeR2Bucket(),
    assets: fakeAssets(),
    assetKeys: ASSET_KEYS,
    log: () => {},
  });
  setContentStorage(storage);
  await storage.ensureHydrated("en");
  clearArPublicationIndex();
  assert.equal(storage.isHydrated("ar"), false);
  assert.throws(
    () => storage.read("content/ar/catalog-cms.json"),
    (error: unknown) => error instanceof StorageHydrationError,
  );
});

test("pre-fix call graph: localePageState(ar) throws when AR cold; gated helpers use index", async () => {
  const bucket = seededContent();
  const storage = new R2ContentStorage({
    content: bucket,
    static: new FakeR2Bucket(),
    assets: fakeAssets(),
    assetKeys: ASSET_KEYS,
    log: () => {},
  });
  setContentStorage(storage);
  await storage.ensureHydrated("en");
  installArPublicationIndex(buildArPublicationIndexDocument(["/", "/doctors", "/hospitals", "/treatments"]));
  assert.equal(storage.isHydrated("ar"), false);
  assert.equal(useArPublicationIndexForMetadata(), true);

  // This is the production failure path before the gate: languageOptions →
  // localePathIsPublished("ar") → localePageState → doctorsForLocale("ar") →
  // content/ar/catalog-cms.json.
  assert.throws(
    () => localePageState("ar", "/doctors"),
    (error: unknown) => error instanceof StorageHydrationError,
  );

  // Gated helpers must answer from the index without touching AR storage.
  const before = bucket.calls.filter((c) => c.op === "get" && String(c.key).startsWith("content/ar/")).length;
  assert.equal(localePathIsPublished("ar", "/doctors"), true);
  assert.doesNotThrow(() => languageOptions("/doctors"));
  assert.doesNotThrow(() => withLocaleMetadata({ title: "t" }, "/doctors", "en", ["en", "ar"]));
  const after = bucket.calls.filter((c) => c.op === "get" && String(c.key).startsWith("content/ar/")).length;
  assert.equal(after, before);
});

test("Arabic Worker routes hydrate AR and render languageOptions without incident", async () => {
  const index = JSON.stringify(
    buildArPublicationIndexDocument(["/", "/doctors", "/hospitals", "/treatments"]),
  );
  const env = makeEnv({
    ASSETS: fakeAssets({ ...DEPLOY_ASSETS, "/_gaf/ar-publication-index.json": index }),
  });
  const worker = createWorker(async (request) => {
    const path = new URL(request.url).pathname;
    assert.doesNotThrow(() => languageOptions(path));
    return new Response("ok");
  }, quiet);

  for (const path of ["/ar/doctors", "/ar/hospitals", "/ar/treatments"]) {
    const response = await worker.fetch(new Request(`https://staging.example${path}`), env, ctx());
    assert.equal(response.status, 200, path);
  }
  assert.equal(worker.storage()?.isHydrated("ar"), true);
});

test("with index, publication probes use the index and do not read AR catalog", async () => {
  const bucket = seededContent();
  const storage = new R2ContentStorage({
    content: bucket,
    static: new FakeR2Bucket(),
    assets: fakeAssets(),
    assetKeys: ASSET_KEYS,
    log: () => {},
  });
  setContentStorage(storage);
  await storage.ensureHydrated("en");
  installArPublicationIndex(buildArPublicationIndexDocument(["/", "/doctors", "/treatments"]));
  assert.equal(useArPublicationIndexForMetadata(), true);

  const before = bucket.calls.filter((c) => c.op === "get" && String(c.key).startsWith("content/ar/")).length;
  assert.equal(localePathIsPublished("ar", "/doctors"), true);
  assert.equal(localePathIsPublished("ar", "/missing-ar-page"), false);
  assert.ok(publishedLocalesForPath("/doctors").includes("ar"));
  assert.equal(publishedLocalesForPath("/missing-ar-page").includes("ar"), false);
  assert.doesNotThrow(() => languageOptions("/doctors"));
  const after = bucket.calls.filter((c) => c.op === "get" && String(c.key).startsWith("content/ar/")).length;
  assert.equal(after, before);
});

test("after AR hydrate, index metadata helper yields to live gates", async () => {
  const storage = new R2ContentStorage({
    content: seededContent(),
    static: new FakeR2Bucket(),
    assets: fakeAssets(),
    assetKeys: ASSET_KEYS,
    log: () => {},
  });
  setContentStorage(storage);
  await storage.ensureHydrated("en");
  installArPublicationIndex(buildArPublicationIndexDocument(["/doctors"]));
  assert.equal(useArPublicationIndexForMetadata(), true);
  await storage.ensureHydrated("ar");
  assert.equal(useArPublicationIndexForMetadata(), false);
  assert.doesNotThrow(() => storage.read("content/ar/catalog-cms.json"));
});

test("Arabic catalogue groups still require full AR hydrate", () => {
  installArPublicationIndex(buildArPublicationIndexDocument(["/doctors"]));
  assert.deepEqual([...groupsForRequest("/ar/doctors")], ["en", "ar"]);
  assert.deepEqual([...groupsForRequest("/ar/hospitals")], ["en", "ar"]);
  assert.deepEqual([...groupsForRequest("/ar/treatments")], ["en", "ar"]);
});

test("missing/corrupt index fallback still full-hydrates EN catalogue", async () => {
  clearArPublicationIndex();
  assert.deepEqual([...groupsForRequest("/doctors")], ["en", "ar"]);

  const env = makeEnv({
    ASSETS: fakeAssets({
      ...DEPLOY_ASSETS,
      "/_gaf/ar-publication-index.json": '{"version":1,"paths":null}',
    }),
  });
  const worker = createWorker(async () => new Response("ok"), quiet);
  const response = await worker.fetch(new Request("https://staging.example/doctors"), env, ctx());
  assert.equal(response.status, 200);
  assert.equal(worker.storage()?.isHydrated("ar"), true, "corrupt index → full AR hydrate");
});

test("GROUP_LAYOUT still lists ar catalog key (edition boundary unchanged)", () => {
  assert.ok(GROUP_LAYOUT.ar.keys.includes("content/ar/catalog-cms.json"));
});
