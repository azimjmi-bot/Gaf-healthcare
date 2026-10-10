import assert from "node:assert/strict";
import test from "node:test";
import { clientMessagesFor } from "@/lib/i18n/client-messages";

test("English pages do not re-serialize the UI catalog into the RSC payload", () => {
  const catalog = { "lang.label": "Language", "nav.doctors": "Doctors" };
  assert.deepEqual(clientMessagesFor("en", catalog), {});
});

test("Arabic still receives the translated catalog", () => {
  const catalog = { "lang.label": "اللغة", "nav.doctors": "الأطباء" };
  assert.deepEqual(clientMessagesFor("ar", catalog), catalog);
});
