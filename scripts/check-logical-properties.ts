/**
 * Physical-direction styling that will not mirror under dir="rtl".
 *
 * Tailwind's logical utilities (ps/pe, ms/me, start/end, text-start/end,
 * rounded-s/e, border-s/e) flip with the document direction; their physical
 * counterparts do not. On an Arabic page a stray `pl-4` indents from the wrong
 * edge and a `left-0` badge lands on the wrong corner, which is the kind of
 * thing that reads as broken rather than as a translation gap.
 *
 *   npm run check:logical-properties
 *
 * Exits non-zero on any finding so the conversion cannot quietly regress.
 * Genuinely physical cases — a transform origin, a mirrored decoration — carry
 * an `rtl-ok` comment on the same line with a reason.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const VARIANT = String.raw`(?:[\w[\]=.\-\/]+:)*`;

/** Each pattern names the logical utility that replaces it. */
const RULES: [RegExp, string][] = [
  [new RegExp(String.raw`\b${VARIANT}(?:p|m)l-[\w.\[\]\/]+`, "g"), "ps-* / ms-*"],
  [new RegExp(String.raw`\b${VARIANT}(?:p|m)r-[\w.\[\]\/]+`, "g"), "pe-* / me-*"],
  [new RegExp(String.raw`\b${VARIANT}text-(?:left|right)\b`, "g"), "text-start / text-end"],
  [new RegExp(String.raw`\b${VARIANT}rounded-(?:l|r|tl|tr|bl|br)(?:-[\w.\[\]\/]+)?\b`, "g"), "rounded-s* / rounded-e*"],
  [new RegExp(String.raw`\b${VARIANT}border-(?:l|r)(?:-[\w.\[\]\/]+)?\b`, "g"), "border-s / border-e"],
  [new RegExp(String.raw`\b${VARIANT}(?<!from-)(?<!to-)(?:left|right)-[\w.\[\]\/]+`, "g"), "start-* / end-*"],
  [new RegExp(String.raw`\b${VARIANT}(?:float|clear)-(?:left|right)\b`, "g"), "float-start / float-end"],
];

/** The same failure written as plain CSS rather than as a utility. */
const CSS_RULES: [RegExp, string][] = [
  [/\bpadding-(?:left|right)\b/g, "padding-inline-start / -end"],
  [/\bmargin-(?:left|right)\b/g, "margin-inline-start / -end"],
  [/\bborder-(?:left|right)(?:-\w+)?\b/g, "border-inline-start / -end"],
  [/\btext-align:\s*(?:left|right)\b/g, "text-align: start / end"],
  [/(?:^|[{;])\s*(?:left|right)\s*:/gm, "inset-inline-start / -end"],
  [/\bfloat:\s*(?:left|right)\b/g, "float: inline-start / inline-end"],
];

/** Utilities that merely look physical: colours, radii scales, sizes. */
const FALSE_POSITIVES = [
  /^border-r(ing|ed|ose)/,
  /^rounded-(lg|full|md|sm|xl|none)/,
];

/**
 * Enter and exit animations name a physical screen edge and have no logical
 * form. They are also the opposite of a layout bug: a panel that slides in from
 * the edge it is anchored to looks right either way round.
 */
const ANIMATION = /(?:slide-(?:in-from|out-to))-(?:left|right)/;

type Finding = { file: string; line: number; token: string; suggestion: string; text: string };

function classAttributes(source: string) {
  // className="…", className={`…`}, class="…" in CSS-in-JS, plus cn("…") lists.
  const spans: { index: number; text: string }[] = [];
  const re = /class(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{([^}]*)\})/g;
  for (let m = re.exec(source); m; m = re.exec(source)) {
    spans.push({ index: m.index, text: m[1] ?? m[2] ?? m[3] ?? m[4] ?? "" });
  }
  return spans;
}

function scan(file: string): Finding[] {
  const source = readFileSync(file, "utf8");
  const lines = source.split("\n");
  const lineAt = (index: number) => source.slice(0, index).split("\n").length;
  const out: Finding[] = [];

  const spans = file.endsWith(".css")
    ? lines.map((text, i) => ({ index: source.indexOf(text), text, line: i + 1 }))
    : classAttributes(source).map((s) => ({ ...s, line: lineAt(s.index) }));

  for (const span of spans) {
    for (const [pattern, suggestion] of file.endsWith(".css") ? CSS_RULES : RULES) {
      for (const token of span.text.match(pattern) ?? []) {
        const bare = token.replace(/^.*:/, "");
        if (FALSE_POSITIVES.some((re) => re.test(bare))) continue;
        if (ANIMATION.test(token)) continue;
        const text = lines[span.line - 1] ?? "";
        // A waiver may sit on the line itself or in the comment just above it,
        // which is where a reason long enough to be useful actually fits.
        const context = lines.slice(Math.max(0, span.line - 4), span.line).join("\n");
        if (/rtl-ok/.test(context)) continue;
        out.push({ file, line: span.line, token, suggestion, text: text.trim() });
      }
    }
  }
  return out;
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return /\.(tsx|ts|css)$/.test(path) && !path.endsWith(".test.ts") ? [path] : [];
  });
}

const files = walk("src");
const findings = files.flatMap(scan);

if (findings.length === 0) {
  console.log(`No physical-direction utilities in ${files.length} files.`);
  process.exit(0);
}

const byFile = new Map<string, Finding[]>();
for (const f of findings) byFile.set(f.file, [...(byFile.get(f.file) ?? []), f]);
for (const [file, rows] of [...byFile].sort()) {
  console.log(`\n${file}`);
  for (const r of rows) console.log(`  ${String(r.line).padStart(4)}  ${r.token.padEnd(28)} -> ${r.suggestion}`);
}
console.log(`\n${findings.length} physical-direction utilities in ${byFile.size} files.`);
process.exit(1);
