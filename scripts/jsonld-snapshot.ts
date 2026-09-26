import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ENGLISH_ALTERNATES_BASELINE } from "../src/server-tests/english-alternates-fixture";

/**
 * The pin on English structured data, one representative URL per page type.
 *
 * English pages are already ranking, so the JSON-LD they serve is output that
 * no Arabic work is allowed to move. Run this against a production build before
 * and after touching an emitter:
 *
 *   npm run build && PORT=43117 npm run start
 *   BASE_URL=http://127.0.0.1:43117 npm run check:jsonld
 *
 * Re-snapshot with `npm run snapshot:jsonld` only when a change to English
 * output is intended, and say which shapes moved in the commit message.
 *
 * Sanctioned deltas so far, all from group (d) (locale-aware JSON-LD):
 *   - `@id` added to every node: stable entity ids (#person, #hospital,
 *     #organisation, #procedure, #website) and per-URL document ids
 *     (#profilepage, #webpage, #collection, #breadcrumb, #faq, *-list).
 *   - `inLanguage` added to nodes that lacked it, always the page locale.
 *   - `url` added to FAQPage, and to the CollectionPage and ItemList variants
 *     that omitted it, always the page's own canonical.
 *   - `Physician.worksFor["@id"]` gained the `#hospital` fragment so it resolves
 *     to the same node as the hospital page's own Hospital entity. This is the
 *     only English value that changed.
 *   - `inLanguage` removed from the three entity nodes that carried it
 *     (Physician, Hospital, MedicalBusiness). schema.org does not declare the
 *     property on those classes, and because an entity's @id is now shared with
 *     its Arabic page, keeping it would assert one node in two languages. The
 *     language stays on the document nodes, where it belongs.
 *
 * Sanctioned delta from group (e):
 *   - Physician list items emit `@type: ["Person", "Physician"]` rather than
 *     `"Physician"` alone, matching what the profile page has always emitted.
 *     Physician descends from MedicalOrganization, so the Person half is what
 *     carries jobTitle and worksFor; the list items were the odd ones out.
 */
const BASE = process.env.BASE_URL || "http://127.0.0.1:43127";
const SNAPSHOT = join(process.cwd(), "src/server-tests/jsonld-en-baseline.json");

/**
 * Key order is not meaningful in JSON-LD but changes constantly as emitters are
 * refactored, so keys are sorted before comparison. Array order is left alone:
 * it carries meaning in ItemList and BreadcrumbList.
 */
function normalise(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalise);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as object).sort()) {
      out[key] = normalise((value as Record<string, unknown>)[key]);
    }
    return out;
  }
  return value;
}

const BLOCK = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

function decode(raw: string) {
  return raw
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

export async function jsonLdFor(path: string) {
  const response = await fetch(new URL(path, BASE), { redirect: "manual" });
  if (response.status !== 200) return { status: response.status, blocks: [] as unknown[] };
  const html = await response.text();
  const blocks: unknown[] = [];
  for (const match of html.matchAll(BLOCK)) {
    const text = decode(match[1]).trim();
    if (!text) continue;
    blocks.push(normalise(JSON.parse(text)));
  }
  // Emission order depends on component tree order, which is not a promise we
  // want to pin, so blocks are keyed by @type and sorted.
  blocks.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return { status: response.status, blocks };
}

export async function collect() {
  const out: Record<string, unknown> = {};
  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    if (row.served === "404") continue;
    out[row.label] = await jsonLdFor(row.path);
  }
  return out;
}

async function main() {
  const update = process.argv.includes("--update");
  const current = await collect();

  if (update) {
    writeFileSync(SNAPSHOT, `${JSON.stringify(current, null, 2)}\n`);
    const count = Object.values(current).reduce<number>(
      (total, page) => total + (page as { blocks: unknown[] }).blocks.length,
      0,
    );
    console.log(`Wrote ${Object.keys(current).length} pages, ${count} JSON-LD blocks`);
    return;
  }

  const expected = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as Record<string, Page>;
  const changes = new Map<string, Change[]>();
  for (const label of new Set([...Object.keys(expected), ...Object.keys(current)])) {
    const rows = diffPage(expected[label], current[label] as Page);
    if (rows.length) changes.set(label, rows);
  }

  if (changes.size === 0) {
    console.log(`English JSON-LD unchanged across ${Object.keys(current).length} page types.`);
    return;
  }

  // The same emitter change shows up on dozens of pages, so the shapes are
  // tallied first and the per-page detail follows for anything unexpected.
  const shapes = new Map<string, number>();
  for (const rows of changes.values()) {
    for (const row of rows) {
      // Array indices are collapsed so "@id added to every list item" tallies
      // as one shape rather than one per row.
      const shape = `${row.kind} ${row.block.replace(/\(.*\)$/, "")} ${row.path.replace(/\[\d+\]/g, "[]")}`;
      shapes.set(shape, (shapes.get(shape) ?? 0) + 1);
    }
  }
  console.error(
    `English JSON-LD changed on ${changes.size} of ${Object.keys(current).length} page types.\n`,
  );
  console.error("Change shapes (pages affected):");
  for (const [shape, count] of [...shapes].sort((a, b) => b[1] - a[1])) {
    console.error(`  ${String(count).padStart(3)}x  ${shape}`);
  }
  if (process.argv.includes("--detail")) {
    for (const [label, rows] of changes) {
      console.error(`\n--- ${label}`);
      for (const row of rows) {
        console.error(`  ${row.kind} ${row.block} ${row.path}${row.detail ? `  ${row.detail}` : ""}`);
      }
    }
  }
  process.exitCode = 1;
}

type Page = { status: number; blocks: unknown[] };
type Change = { kind: "+" | "-" | "~"; block: string; path: string; detail?: string };

/**
 * Blocks are matched by @type plus name/url rather than by position: adding an
 * @id reshuffles the snapshot's JSON-string ordering and would otherwise read
 * as every block being replaced.
 */
function blockKey(block: unknown) {
  const node = (block ?? {}) as Record<string, unknown>;
  const type = [node["@type"]].flat().filter(Boolean).join("+");
  // Only `name` is used as a tie-breaker: `url` and `@id` are fields group (d)
  // itself adds, so keying on them would make every block look replaced.
  const label = typeof node.name === "string" ? node.name.slice(0, 40) : "";
  return `${type}(${label})`;
}

function diffPage(before: Page | undefined, after: Page | undefined): Change[] {
  if (!before || !after) {
    return [{ kind: before ? "-" : "+", block: "page", path: "", detail: "page missing on one side" }];
  }
  const rows: Change[] = [];
  if (before.status !== after.status) {
    rows.push({ kind: "~", block: "page", path: "status", detail: `${before.status} -> ${after.status}` });
  }
  const left = new Map(before.blocks.map((b) => [blockKey(b), b]));
  const right = new Map(after.blocks.map((b) => [blockKey(b), b]));
  for (const key of new Set([...left.keys(), ...right.keys()])) {
    if (!left.has(key)) rows.push({ kind: "+", block: key, path: "(whole block)" });
    else if (!right.has(key)) rows.push({ kind: "-", block: key, path: "(whole block)" });
    else rows.push(...diffValue(left.get(key), right.get(key)).map((r) => ({ ...r, block: key })));
  }
  return rows;
}

function diffValue(before: unknown, after: unknown, path = ""): Omit<Change, "block">[] {
  if (JSON.stringify(before) === JSON.stringify(after)) return [];
  const bothObjects =
    before && after && typeof before === "object" && typeof after === "object" &&
    !Array.isArray(before) === !Array.isArray(after);
  if (!bothObjects) {
    return [{ kind: "~", path: path || "(root)", detail: `${clipJson(before)} -> ${clipJson(after)}` }];
  }
  if (Array.isArray(before) && Array.isArray(after)) {
    if (before.length !== after.length) {
      return [{ kind: "~", path: `${path}.length`, detail: `${before.length} -> ${after.length}` }];
    }
    return before.flatMap((item, i) => diffValue(item, after[i], `${path}[${i}]`));
  }
  const b = before as Record<string, unknown>;
  const a = after as Record<string, unknown>;
  const rows: Omit<Change, "block">[] = [];
  for (const key of new Set([...Object.keys(b), ...Object.keys(a)])) {
    const where = path ? `${path}.${key}` : key;
    if (!(key in b)) rows.push({ kind: "+", path: where, detail: clipJson(a[key]) });
    else if (!(key in a)) rows.push({ kind: "-", path: where, detail: clipJson(b[key]) });
    else rows.push(...diffValue(b[key], a[key], where));
  }
  return rows;
}

function clipJson(value: unknown) {
  const text = JSON.stringify(value) ?? "undefined";
  return text.length > 90 ? `${text.slice(0, 89)}…` : text;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "")) {
  void main();
}
