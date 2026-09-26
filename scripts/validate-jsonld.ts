/**
 * Validates served JSON-LD against the real schema.org vocabulary, one sample
 * page per emitter, and reports anything Google's Rich Results Test would warn
 * about.
 *
 * Two layers:
 *  1. Vocabulary: every @type is a defined class, every property is a defined
 *     property, and the property is declared on that class or a superclass.
 *     Value ranges are checked loosely — schema.org is permissive about Text
 *     standing in for an enumeration, but a URL-ranged property holding prose
 *     is a genuine error.
 *  2. Rich Results: the per-type requirements Google documents for the types we
 *     emit, which are stricter than the vocabulary and are what actually
 *     produces warnings in Search Console.
 *
 * Run against a production build:
 *   BASE_URL=http://127.0.0.1:43117 npm run validate:jsonld
 */
const BASE = process.env.BASE_URL || "http://127.0.0.1:43127";
const VOCAB = "https://schema.org/version/latest/schemaorg-current-https.jsonld";

/** One representative URL per emitter, English and Arabic where published. */
const SAMPLES: { emitter: string; urls: string[] }[] = [
  { emitter: "physicianJsonLd + doctorProfilePageJsonLd", urls: ["/doctors/dr-anil-kumar-anand", "/ar/doctors/dr-anil-kumar-anand"] },
  { emitter: "hospitalJsonLd", urls: ["/hospitals/apollo-delhi", "/ar/hospitals/apollo-delhi"] },
  { emitter: "breadcrumbJsonLd", urls: ["/costs/India/Radiation-Oncology"] },
  { emitter: "medicalWebPageJsonLd", urls: ["/costs/India/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)"] },
  { emitter: "hospitalItemListJsonLd", urls: ["/hospitals/India/Delhi-NCR/Radiation-Oncology"] },
  { emitter: "doctorItemListJsonLd", urls: ["/doctors/India/Radiation-Oncology"] },
  { emitter: "faqJsonLd", urls: ["/doctors/India", "/ar/doctors"] },
  { emitter: "home MedicalBusiness", urls: ["/", "/ar"] },
  { emitter: "specialties ItemList", urls: ["/specialties"] },
  { emitter: "cost-sheet MedicalProcedure", urls: ["/costs/external-beam-radiotherapy-ebrt"] },
];

type Vocabulary = {
  classes: Map<string, Set<string>>;
  properties: Map<string, { domains: Set<string>; ranges: Set<string> }>;
};

function names(value: unknown): string[] {
  if (!value) return [];
  return [value].flat().flatMap((entry) => {
    const id = typeof entry === "string" ? entry : (entry as { "@id"?: string })?.["@id"];
    return id?.startsWith("schema:") ? [id.slice("schema:".length)] : [];
  });
}

async function loadVocabulary(): Promise<Vocabulary> {
  const response = await fetch(VOCAB);
  if (!response.ok) throw new Error(`schema.org vocabulary unavailable: ${response.status}`);
  const graph = ((await response.json()) as { "@graph": Record<string, unknown>[] })["@graph"];
  const classes = new Map<string, Set<string>>();
  const properties = new Map<string, { domains: Set<string>; ranges: Set<string> }>();
  for (const node of graph) {
    const id = String(node["@id"] ?? "");
    if (!id.startsWith("schema:")) continue;
    const name = id.slice("schema:".length);
    const types = [node["@type"]].flat();
    if (types.includes("rdfs:Class")) {
      classes.set(name, new Set(names(node["rdfs:subClassOf"])));
    } else if (types.includes("rdf:Property")) {
      properties.set(name, {
        domains: new Set(names(node["schema:domainIncludes"])),
        ranges: new Set(names(node["schema:rangeIncludes"])),
      });
    }
  }
  return { classes, properties };
}

function ancestors(vocab: Vocabulary, type: string, seen = new Set<string>()): Set<string> {
  if (seen.has(type)) return seen;
  seen.add(type);
  for (const parent of vocab.classes.get(type) ?? []) ancestors(vocab, parent, seen);
  return seen;
}

const LITERALS = new Set(["Text", "URL", "Number", "Integer", "Float", "Boolean", "Date", "DateTime", "Time"]);

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

async function blocksFor(path: string) {
  const response = await fetch(new URL(path, BASE), { redirect: "manual" });
  if (response.status !== 200) return { status: response.status, blocks: [] as Record<string, unknown>[] };
  const html = await response.text();
  const blocks: Record<string, unknown>[] = [];
  for (const match of html.matchAll(BLOCK)) {
    const text = decode(match[1]).trim();
    if (text) blocks.push(JSON.parse(text));
  }
  return { status: 200, blocks };
}

type Finding = { level: "error" | "warning"; where: string; message: string };

function checkNode(
  vocab: Vocabulary,
  node: Record<string, unknown>,
  where: string,
  findings: Finding[],
) {
  const types = [node["@type"]].flat().filter((t): t is string => typeof t === "string");
  if (types.length === 0) {
    findings.push({ level: "error", where, message: "node has no @type" });
    return;
  }
  const allowed = new Set<string>();
  for (const type of types) {
    if (!vocab.classes.has(type)) {
      findings.push({ level: "error", where, message: `@type ${type} is not a schema.org class` });
      continue;
    }
    for (const ancestor of ancestors(vocab, type)) allowed.add(ancestor);
  }
  const label = `${where} ${types.join("+")}`;

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("@")) continue;
    const property = vocab.properties.get(key);
    if (!property) {
      findings.push({ level: "error", where: label, message: `${key} is not a schema.org property` });
      continue;
    }
    if (property.domains.size && ![...property.domains].some((domain) => allowed.has(domain))) {
      findings.push({
        level: "warning",
        where: label,
        message: `${key} is not declared on ${types.join("+")} (declared on ${[...property.domains].slice(0, 4).join(", ")})`,
      });
    }
    const wantsLiteral = [...property.ranges].some((range) => LITERALS.has(range));
    const wantsNode = [...property.ranges].some((range) => !LITERALS.has(range));
    for (const item of [value].flat()) {
      if (item && typeof item === "object") {
        if (!wantsNode) {
          findings.push({ level: "warning", where: label, message: `${key} holds an object but ranges are literal-only` });
        }
        checkNode(vocab, item as Record<string, unknown>, `${label} > ${key}`, findings);
      } else if (typeof item === "string") {
        // Google documents breadcrumb and carousel entries as a bare URL, so a
        // string where a Thing is expected is correct there, not a warning.
        const urlForThing = key === "item" && /^https?:/.test(item);
        if (!wantsLiteral && wantsNode && !urlForThing) {
          findings.push({
            level: "warning",
            where: label,
            message: `${key} holds text where ${[...property.ranges].slice(0, 3).join("/")} is expected`,
          });
        }
        if (property.ranges.has("URL") && property.ranges.size === 1 && !/^(https?:|\/)/.test(item)) {
          findings.push({ level: "error", where: label, message: `${key} is URL-ranged but holds ${JSON.stringify(item.slice(0, 40))}` });
        }
      }
    }
  }
}

/** The per-type requirements Google documents, which the vocabulary does not. */
function checkRichResults(node: Record<string, unknown>, where: string, findings: Finding[]) {
  const types = new Set([node["@type"]].flat());
  const need = (field: string, level: Finding["level"] = "error") => {
    if (node[field] === undefined) {
      findings.push({ level, where, message: `${[...types].join("+")} is missing ${field}` });
    }
  };

  if (types.has("FAQPage")) {
    const entities = [node.mainEntity].flat().filter(Boolean) as Record<string, unknown>[];
    if (entities.length === 0) findings.push({ level: "error", where, message: "FAQPage has no mainEntity" });
    for (const question of entities) {
      if (question["@type"] !== "Question") {
        findings.push({ level: "error", where, message: "FAQPage mainEntity must be Question" });
      }
      if (!question.name) findings.push({ level: "error", where, message: "Question is missing name" });
      const answer = question.acceptedAnswer as Record<string, unknown> | undefined;
      if (!answer?.text) findings.push({ level: "error", where, message: "Question is missing acceptedAnswer.text" });
    }
  }

  if (types.has("BreadcrumbList")) {
    const items = [node.itemListElement].flat().filter(Boolean) as Record<string, unknown>[];
    if (items.length < 2) findings.push({ level: "warning", where, message: "BreadcrumbList has fewer than 2 crumbs" });
    items.forEach((item, index) => {
      if (item.position !== index + 1) {
        findings.push({ level: "error", where, message: `breadcrumb position ${String(item.position)} out of order` });
      }
      if (!item.name) findings.push({ level: "error", where, message: "breadcrumb item is missing name" });
      if (index < items.length - 1 && !item.item) {
        findings.push({ level: "error", where, message: "non-final breadcrumb item is missing item" });
      }
    });
  }

  if (types.has("ItemList")) {
    const items = [node.itemListElement].flat().filter(Boolean) as Record<string, unknown>[];
    items.forEach((item, index) => {
      if (item["@type"] !== "ListItem") {
        findings.push({ level: "error", where, message: "ItemList entries must be ListItem" });
      }
      if (item.position !== index + 1) {
        findings.push({ level: "error", where, message: `ListItem position ${String(item.position)} out of order` });
      }
      // A carousel needs a URL on each entry, either directly or on item.
      const nested = item.item as Record<string, unknown> | undefined;
      if (!item.url && !nested?.url) {
        findings.push({ level: "warning", where, message: "ListItem has no url, so it cannot form a carousel" });
      }
    });
  }

  if (types.has("Organization") || types.has("MedicalBusiness") || types.has("MedicalOrganization")) {
    need("name");
    need("url", "warning");
  }

  if (types.has("Physician") || types.has("Hospital")) {
    need("name");
    const address = node.address as Record<string, unknown> | undefined;
    if (!address) {
      findings.push({ level: "warning", where, message: `${[...types].join("+")} has no address` });
    } else if (!address.streetAddress) {
      // Google accepts locality-only addresses but reports it as incomplete.
      findings.push({
        level: "warning",
        where,
        message: `${[...types].join("+")} address has no streetAddress`,
      });
    }
    if (!node.telephone) {
      findings.push({ level: "warning", where, message: `${[...types].join("+")} has no telephone` });
    }
  }

  if (types.has("AggregateRating")) {
    need("ratingValue");
    need("reviewCount");
  }

  for (const value of Object.values(node)) {
    for (const item of [value].flat()) {
      if (item && typeof item === "object") {
        checkRichResults(item as Record<string, unknown>, where, findings);
      }
    }
  }
}

async function main() {
  const vocab = await loadVocabulary();
  console.log(`Loaded schema.org vocabulary: ${vocab.classes.size} classes, ${vocab.properties.size} properties.\n`);

  const findings: Finding[] = [];
  let nodes = 0;
  for (const sample of SAMPLES) {
    for (const url of sample.urls) {
      const { status, blocks } = await blocksFor(url);
      if (status !== 200) {
        console.log(`skip ${url} (${status})`);
        continue;
      }
      if (blocks.length === 0) {
        console.log(`skip ${url} (no JSON-LD; page is noindex)`);
        continue;
      }
      nodes += blocks.length;
      for (const block of blocks) {
        const where = `${url} [${sample.emitter}]`;
        checkNode(vocab, block, where, findings);
        checkRichResults(block, where, findings);
      }
    }
  }

  // The same shortcoming repeats across list items, so findings are deduped.
  const seen = new Map<string, { finding: Finding; count: number }>();
  for (const finding of findings) {
    const key = `${finding.level}|${finding.where}|${finding.message}`;
    const entry = seen.get(key);
    if (entry) entry.count += 1;
    else seen.set(key, { finding, count: 1 });
  }

  const errors = [...seen.values()].filter((e) => e.finding.level === "error");
  const warnings = [...seen.values()].filter((e) => e.finding.level === "warning");
  console.log(`\nValidated ${nodes} top-level nodes across ${SAMPLES.length} emitters.`);
  console.log(`${errors.length} distinct error(s), ${warnings.length} distinct warning(s).\n`);

  for (const group of [errors, warnings]) {
    for (const { finding, count } of group) {
      const times = count > 1 ? ` (x${count})` : "";
      console.log(`${finding.level.toUpperCase().padEnd(7)} ${finding.where}\n        ${finding.message}${times}`);
    }
    if (group.length) console.log("");
  }

  if (errors.length) process.exitCode = 1;
}

void main();
