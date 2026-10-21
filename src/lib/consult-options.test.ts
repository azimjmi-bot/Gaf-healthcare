import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ConsultForm } from "@/components/consult-form";
import { consultHospitalOptions, consultTreatmentOptions } from "@/lib/consult-options";
import { catalogHospitals } from "@/lib/hospitals";
import { catalogTreatments } from "@/lib/treatments";

test("the form's choices are the static catalog rows, in catalog order, reduced to slug and name", () => {
  const treatments = consultTreatmentOptions();
  assert.deepEqual(
    treatments,
    catalogTreatments.map((t) => ({ slug: t.slug, name: t.name })),
  );
  assert.equal(treatments.length, catalogTreatments.length);
  assert.equal(new Set(treatments.map((t) => t.slug)).size, treatments.length, "treatment slugs are unique");
  assert.ok(treatments.every((t) => t.slug && t.name));
  assert.deepEqual(Object.keys(treatments[0]), ["slug", "name"], "nothing but the two fields crosses to the client");

  const hospitals = consultHospitalOptions();
  assert.deepEqual(
    hospitals,
    catalogHospitals.map((h) => ({ slug: h.slug, name: h.name })),
  );
  assert.equal(hospitals.length, catalogHospitals.length);
  assert.ok(hospitals.every((h) => h.slug && h.name));
});

test("the client component no longer imports the catalog modules", () => {
  const source = readFileSync("src/components/consult-form.tsx", "utf8");
  assert.match(source, /^"use client";/);
  assert.doesNotMatch(source, /@\/lib\/hospitals|@\/lib\/treatments|@\/lib\/doctors|ginger-catalog/);
  assert.match(source, /import type \{ ConsultOption \} from "@\/lib\/consult-options"/);
});

test("the page hands the server-computed options to the form", () => {
  const page = readFileSync("src/app/consult/page.tsx", "utf8");
  assert.match(page, /treatmentOptions=\{consultTreatmentOptions\(\)\}/);
  assert.match(page, /hospitalOptions=\{consultHospitalOptions\(\)\}/);
});

test("the form renders with the options as props and its defaults preselected", () => {
  const treatmentOptions = consultTreatmentOptions();
  const hospitalOptions = consultHospitalOptions();
  const html = renderToStaticMarkup(
    createElement(ConsultForm, {
      treatmentOptions,
      hospitalOptions,
      defaultTreatment: treatmentOptions[0].slug,
      defaultHospital: hospitalOptions[0].slug,
      defaultDoctor: "dr-x",
    }),
  );
  assert.match(html, /<form /);
  for (const name of ["name", "email", "phone", "country", "notes", "consent"]) {
    assert.match(html, new RegExp(`name="${name}"`), name);
  }
  assert.equal((html.match(/required=""/g) ?? []).length, 5, "name, email, phone, country and consent stay required");
  assert.equal((html.match(/role="combobox"/g) ?? []).length, 3, "treatment, hospital and timeline selects");
  assert.match(html, /type="submit"/);

  const empty = renderToStaticMarkup(createElement(ConsultForm, { treatmentOptions, hospitalOptions }));
  assert.match(empty, /Select a pathway/, "treatment placeholder with no default");
  assert.match(empty, /Open to guidance/, "hospital placeholder with no default");
});

test("no client component reaches the catalog or content storage through value imports", () => {
  // Mirrors the webpack failure mode: a `node:fs` import in a client chunk
  // breaks the build, and before that the catalog JSON shipped to browsers.
  const root = process.cwd();
  const exts = [".ts", ".tsx"];
  const resolve = (from: string, spec: string) => {
    const base = spec.startsWith("@/") ? path.join(root, "src", spec.slice(2)) : spec.startsWith(".") ? path.join(path.dirname(from), spec) : null;
    if (!base) return null;
    for (const candidate of [base, ...exts.map((e) => base + e), ...exts.map((e) => path.join(base, `index${e}`))]) {
      if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    }
    return null;
  };
  const importRe = /^(?:import|export)\s+(type\s+)?(\{[^}]*\}|[^'"]*?)\s*from\s*["']([^"']+)["']/gm;
  const valueImports = (file: string) => {
    const out: string[] = [];
    for (const m of readFileSync(file, "utf8").matchAll(importRe)) {
      if (m[1]) continue;
      const clause = m[2].trim();
      if (clause.startsWith("{")) {
        const names = clause.slice(1, -1).split(",").map((n) => n.trim()).filter(Boolean);
        if (names.length && names.every((n) => n.startsWith("type "))) continue;
      }
      const resolved = resolve(file, m[3]);
      if (resolved) out.push(resolved);
    }
    return out;
  };
  const walk = (dir: string, out: string[] = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file, out);
      else if (/\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)) out.push(file);
    }
    return out;
  };
  const clients = walk(path.join(root, "src")).filter((f) => /^\s*["']use client["']/.test(readFileSync(f, "utf8")));
  assert.ok(clients.length > 10, "found the client components");
  const forbidden = ["src/lib/storage/", "src/lib/hospitals.ts", "src/lib/doctors.ts", "src/lib/treatments.ts", "src/lib/catalog-seed.ts"];
  const offenders: string[] = [];
  for (const client of clients) {
    const seen = new Set([client]);
    const stack: [string, string[]][] = [[client, [client]]];
    while (stack.length) {
      const [file, chain] = stack.pop()!;
      if (forbidden.some((f) => file.includes(f))) {
        offenders.push(chain.map((f) => path.relative(root, f)).join(" -> "));
        break;
      }
      for (const dep of valueImports(file)) {
        if (!seen.has(dep)) {
          seen.add(dep);
          stack.push([dep, [...chain, dep]]);
        }
      }
    }
  }
  assert.deepEqual(offenders, []);
});
