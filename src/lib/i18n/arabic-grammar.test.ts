import test from "node:test";
import assert from "node:assert/strict";
import {
  COUNTED_NOUNS,
  countedNoun,
  genitivePlural,
  withBa,
  withLam,
} from "@/lib/i18n/arabic-grammar";
import { DOCTOR_ROLES } from "@/lib/i18n/directory-copy";

test("a sound masculine plural takes its genitive after أفضل and من", () => {
  assert.equal(
    genitivePlural("أخصائيو علاج الأورام بالإشعاع"),
    "أخصائيي علاج الأورام بالإشعاع",
  );
  assert.equal(genitivePlural("جرّاحو القلب"), "جرّاحي القلب");
  assert.equal(genitivePlural("جرّاحو الأنف والأذن والحنجرة"), "جرّاحي الأنف والأذن والحنجرة");
});

test("a broken plural is left alone, because it does not show case unvowelled", () => {
  assert.equal(genitivePlural("أطباء القلب"), "أطباء القلب");
  assert.equal(genitivePlural("أطباء أمراض الدم"), "أطباء أمراض الدم");
});

test("every role the hubs can name inflects only its head noun", () => {
  for (const role of Object.values(DOCTOR_ROLES)) {
    const head = role.split(" ")[0];
    const rest = role.slice(head.length);
    const expected = head.endsWith("و") ? `${head.slice(0, -1)}ي${rest}` : role;
    assert.equal(genitivePlural(role), expected, `${role} inflected wrongly`);
  }
});

test("the لام swallows the alif of a following definite article", () => {
  assert.equal(withLam("الجراحة الإشعاعية التجسيمية (SRS)"), "للجراحة الإشعاعية التجسيمية (SRS)");
  assert.equal(withLam("المستشفيات"), "للمستشفيات");
});

test("a particle joins an indefinite Arabic word directly", () => {
  assert.equal(withLam("أخصائيي علاج الأورام"), "لأخصائيي علاج الأورام");
  assert.equal(withBa("علاج الأورام"), "بعلاج الأورام");
  assert.equal(withBa("الجراحة الإشعاعية"), "بالجراحة الإشعاعية");
});

test("an untranslated Latin term keeps the tatweel bridge rather than colliding", () => {
  assert.equal(withLam("Proton Beam Therapy"), "لـProton Beam Therapy");
  assert.equal(withBa("IGRT"), "بـIGRT");
});

test("a counted noun agrees with its number the way Arabic agrees them", () => {
  assert.equal(countedNoun(0, "hospital"), "لا مستشفيات");
  assert.equal(countedNoun(1, "hospital"), "مستشفى واحد");
  assert.equal(countedNoun(2, "hospital"), "مستشفيان");
  assert.equal(countedNoun(5, "hospital"), "5 مستشفيات");
  assert.equal(countedNoun(11, "hospital"), "11 مستشفى");
  assert.equal(countedNoun(35, "hospital"), "35 مستشفى");
});

test("one and two are carried by the noun, so no numeral is printed beside them", () => {
  for (const key of Object.keys(COUNTED_NOUNS) as (keyof typeof COUNTED_NOUNS)[]) {
    assert.match(countedNoun(1, key), /^\D+$/u, `${key} printed a numeral for one`);
    assert.match(countedNoun(2, key), /^\D+$/u, `${key} printed a numeral for two`);
    assert.match(countedNoun(3, key), /^3 /, `${key} dropped the numeral for three`);
    assert.match(countedNoun(30, key), /^30 /, `${key} dropped the numeral for thirty`);
  }
});

test("the adjective travels with the noun it agrees with", () => {
  assert.equal(countedNoun(4, "validatedHospital"), "4 مستشفيات موثّقة");
  assert.equal(countedNoun(35, "validatedHospital"), "35 مستشفى موثّقًا");
  assert.equal(countedNoun(1, "linkedProcedure"), "إجراء مرتبط واحد");
  assert.equal(countedNoun(12, "linkedProcedure"), "12 إجراءً مرتبطًا");
});
