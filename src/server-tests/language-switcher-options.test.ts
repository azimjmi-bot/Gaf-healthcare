import test from "node:test";
import assert from "node:assert/strict";
import { LOCALES, TARGET_LOCALES } from "@/lib/i18n/languages";
import { languageOptions } from "@/lib/i18n/language-options";
import { localeIsPublished } from "@/lib/i18n/locale-gating";
import { localePageState } from "@/lib/i18n/locale-publication";

/** Paths covering each way a locale can fail to have an equivalent page. */
const PATHS = [
  "/",
  "/doctors",
  "/doctors/dr-anil-kumar-anand",
  "/doctors/India/Delhi-NCR/Radiation-Oncology",
  "/doctors/India/Nephrology",
  "/hospitals",
  "/hospitals/apollo-delhi",
  "/hospitals/apollo-delhi/doctors",
  "/treatments",
  "/costs/India/Radiation-Oncology",
  "/blogs",
  "/consult",
];

test("the switcher never offers a link to a page that is not published", () => {
  for (const path of PATHS) {
    for (const option of languageOptions(path)) {
      const target = option.equivalent ? path : "/";
      assert.equal(
        localePageState(option.locale, target),
        "published",
        `${path}: ${option.locale} -> ${option.href}`,
      );
    }
  }
});

test("a locale with no equivalent page falls back to its own home", () => {
  // Arabic has no cost pages, so from an English cost page it offers its home.
  const fromCosts = languageOptions("/costs/India/Radiation-Oncology");
  const arabic = fromCosts.find((option) => option.locale === "ar");
  assert.ok(arabic, "Arabic should still be reachable from an English-only page");
  assert.equal(arabic.equivalent, false);
  assert.equal(arabic.href, "/ar");

  // Where the page does exist in Arabic, it links to the page itself.
  const fromProfile = languageOptions("/doctors/dr-anil-kumar-anand");
  const arabicProfile = fromProfile.find((option) => option.locale === "ar");
  assert.ok(arabicProfile);
  assert.equal(arabicProfile.equivalent, true);
  assert.equal(arabicProfile.href, "/ar/doctors/dr-anil-kumar-anand");
});

test("locales that are not live are absent from the switcher entirely", () => {
  const unlive = TARGET_LOCALES.filter((locale) => !localeIsPublished(locale));
  assert.deepEqual(unlive, ["ru", "fr", "sw"]);
  for (const path of PATHS) {
    const offered = languageOptions(path).map((option) => option.locale);
    for (const locale of unlive) {
      assert.ok(!offered.includes(locale), `${path} must not offer ${locale}`);
    }
  }
});

test("English is always offered, and an Arabic prefix resolves the same options", () => {
  for (const path of PATHS) {
    const options = languageOptions(path);
    assert.ok(
      options.some((option) => option.locale === "en"),
      `${path} must always offer English`,
    );
    assert.deepEqual(
      languageOptions(`/ar${path === "/" ? "" : path}`),
      options,
      `${path} should resolve identically from its Arabic URL`,
    );
  }
});

test("every offered locale is a known locale and appears once", () => {
  for (const path of PATHS) {
    const offered = languageOptions(path).map((option) => option.locale);
    assert.equal(new Set(offered).size, offered.length, `${path} has a duplicate`);
    for (const locale of offered) assert.ok(LOCALES.includes(locale));
  }
});
