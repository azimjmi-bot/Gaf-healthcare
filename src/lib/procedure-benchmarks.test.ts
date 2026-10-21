import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProcedureBenchmarkTable } from "@/components/procedure-benchmark-table";
import { medicalProcedureAbout, visibleProcedureFacts } from "@/lib/procedure-benchmarks";

const EBRT = "External Beam Radiotherapy (EBRT)";

test("English EBRT facts use stored dollars and do not invent a riyal price", () => {
  const facts = visibleProcedureFacts(EBRT, "en");
  assert.ok(facts);
  assert.equal(facts.benchmark.procedureType, "Radiation");
  assert.match(facts.rows.map((row) => row.value).join("\n"), /\$1,000–\$6,000\+/);
  assert.match(facts.rows.map((row) => row.value).join("\n"), /\$12,000–\$25,000/);
  assert.match(facts.rows.map((row) => row.value).join("\n"), /10–20 minutes/);
  assert.match(facts.rows.map((row) => row.value).join("\n"), /15–35 weekday/);
  assert.match(facts.rows.map((row) => row.value).join("\n"), /does not convert them to riyals/);
  assert.equal(facts.rows.some((row) => /SAR\s*\d/.test(row.value)), false);
  const schema = medicalProcedureAbout(EBRT, "en");
  assert.equal(schema.procedureType, "Radiation");
  assert.equal(schema.howPerformed, facts.howPerformed);
  assert.equal(schema.bodyLocation, facts.bodyLocation);
  const html = renderToStaticMarkup(createElement(ProcedureBenchmarkTable, { procedure: EBRT, locale: "en" }));
  assert.match(html, /Planning figures/);
  assert.match(html, /procedureType|Classification/);
  assert.match(html, /Radiation/);
  assert.match(html, /\$1,000–\$6,000\+/);
  assert.equal(html.includes("AggregateRating"), false);
});

test("Arabic radiation stay rows use the stored catalog sentence", () => {
  const imrt = visibleProcedureFacts("Intensity-Modulated Radiotherapy (IMRT)", "ar");
  const gamma = visibleProcedureFacts("Gamma Knife", "ar");
  const iort = visibleProcedureFacts("Intraoperative Radiotherapy (IORT)", "ar");
  assert.ok(imrt && gamma && iort);
  assert.equal(imrt.rows.find((row) => row.label === "الإقامة")?.value, "4–7 أسابيع من الجلسات");
  assert.equal(gamma.rows.find((row) => row.label === "الإقامة")?.value, "جلسة واحدة في العادة");
  assert.equal(iort.rows.find((row) => row.label === "الإقامة")?.value, "مرتبطة بمدة الإقامة الجراحية");
  assert.equal(imrt.rows.some((row) => row.value.includes("10–20")), false);
  assert.equal(imrt.rows.some((row) => /SAR\s*\d/.test(row.value)), false);
});

test("a non-radiation procedure keeps its own classification", () => {
  const facts = visibleProcedureFacts("Mastectomy", "en");
  assert.ok(facts);
  assert.notEqual(facts.benchmark.procedureType, "Radiation");
  assert.equal(facts.rows.some((row) => row.value.includes("2.2–3.6×")), false);
});
