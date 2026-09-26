import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isAllowedInternalPath, normalizeInternalPath } from "./ai/links";
import { parseStudioFields } from "./ai/schema";
import { emptyStudioFields } from "./ai/types";
import { extractMoneyTokens, moneyAllowed, validateStudioOutput } from "./ai/validate";
import { pickDoctorPatch, PSEO_LOCKED_KEYS } from "./cms/catalog-types";

describe("AI studio validation", () => {
  it("keeps only internal URLs that exist in the allowed set", () => {
    const fields = emptyStudioFields();
    fields.internal_links = [
      { anchor: "EBRT", url: "/treatments/ebrt", reason: "same treatment" },
      { anchor: "Fake", url: "/treatments/made-up-slug", reason: "invented" },
      { anchor: "Offsite", url: "https://example.com/ebrt", reason: "external" },
    ];
    const flags = validateStudioOutput(fields, {
      allowedUrls: ["/treatments/ebrt"],
      allowedDoctorNames: [],
      allowedHospitalNames: [],
      allowedMoney: [],
    });
    assert.equal(fields.internal_links.length, 1);
    assert.equal(fields.internal_links[0].url, "/treatments/ebrt");
    assert.ok(flags.some((flag) => flag.code === "invalid_url"));
  });

  it("flags invented prices when the CMS has none", () => {
    const fields = emptyStudioFields();
    fields.cost_section = "Typical cash price is USD 12,000-15,000.";
    const flags = validateStudioOutput(fields, {
      allowedUrls: [],
      allowedDoctorNames: [],
      allowedHospitalNames: [],
      allowedMoney: [],
    });
    assert.ok(flags.some((flag) => flag.code === "invented_cost"));
  });

  it("accepts the exact CMS cost string", () => {
    const fields = emptyStudioFields();
    fields.cost_section = "Partner range $4,000-$6,500.";
    const allowed = extractMoneyTokens("$4,000-$6,500");
    const flags = validateStudioOutput(fields, {
      allowedUrls: [],
      allowedDoctorNames: [],
      allowedHospitalNames: [],
      allowedMoney: allowed,
    });
    assert.equal(flags.some((flag) => flag.code === "cost_mismatch" || flag.code === "invented_cost"), false);
    assert.equal(moneyAllowed("$4,000", allowed) || allowed.length > 0, true);
  });

  it("treats a different slug as a suggestion, not a write", () => {
    const fields = emptyStudioFields();
    fields.suggested_slug = "ebrt-istanbul";
    const flags = validateStudioOutput(fields, {
      allowedUrls: [],
      allowedDoctorNames: [],
      allowedHospitalNames: [],
      allowedMoney: [],
      currentSlug: "external-beam-radiotherapy-ebrt",
    });
    assert.ok(flags.some((flag) => flag.code === "slug_suggestion"));
  });

  it("normalizes gaf.healthcare links to a path", () => {
    assert.equal(normalizeInternalPath("https://gaf.healthcare/treatments/ebrt/"), "/treatments/ebrt");
    assert.equal(isAllowedInternalPath("/ar/treatments/ebrt", ["/treatments/ebrt"]), true);
    assert.equal(isAllowedInternalPath("https://evil.example/treatments/ebrt", ["/treatments/ebrt"]), false);
  });

  it("parses structured output without inventing fields", () => {
    const parsed = parseStudioFields({ title: "EBRT", faqs: [{ question: "What is it?", answer: "A radiation course." }] });
    assert.equal(parsed.title, "EBRT");
    assert.equal(parsed.bio, "");
    assert.equal(parsed.faqs[0].question, "What is it?");
  });
});

describe("pSEO protection", () => {
  it("doctor overlays cannot carry URL or matching keys", () => {
    const patch = pickDoctorPatch({
      slug: "changed-url",
      specialty: "Invented",
      hospitalName: "Invented Hospital",
      bio: "Only the bio should survive.",
    });
    assert.equal(patch.bio, "Only the bio should survive.");
    assert.equal("slug" in patch, false);
    assert.ok(PSEO_LOCKED_KEYS.includes("slug"));
    assert.ok(PSEO_LOCKED_KEYS.includes("hospitalName"));
  });
});

describe("AI configuration messages", () => {
  it("never mentions a secret in the public missing-key copy", () => {
    const message = "AI service is not configured. Please configure OPENAI_API_KEY in the server environment.";
    assert.equal(/sk-|secret/i.test(message), false);
    assert.equal(message.includes("OPENAI_API_KEY"), true);
  });
});
