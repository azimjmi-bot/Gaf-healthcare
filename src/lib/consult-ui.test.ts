import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ConsultForm } from "@/components/consult-form";
import { LocaleLink } from "@/components/locale-link";
import { LocaleProvider } from "@/components/locale-provider";
import { PseoEstimateCta } from "@/components/pseo-estimate-cta";

test("LocaleLink opens internal /consult and /ar/consult while preserving intentional wa.me CTAs", () => {
  const enHtml = renderToStaticMarkup(
    createElement(
      LocaleProvider,
      { locale: "en", messages: {}, languageOptions: [], availableSurfaces: ["consult"] },
      createElement(
        "div",
        null,
        createElement(LocaleLink, { href: "/consult?treatment=chemotherapy" }, "Consult"),
        createElement(LocaleLink, { href: "https://wa.me/919044346292?text=Hi" }, "WhatsApp"),
      ),
    ),
  );
  assert.match(enHtml, /href="\/consult\?treatment=chemotherapy"/);
  assert.match(enHtml, /href="https:\/\/wa\.me\/919044346292\?text=Hi"/);

  const arHtml = renderToStaticMarkup(
    createElement(
      LocaleProvider,
      { locale: "ar", messages: {}, languageOptions: [], availableSurfaces: ["consult"] },
      createElement(LocaleLink, { href: "/consult?doctor=dr-x" }, "استشارة"),
    ),
  );
  assert.match(arHtml, /href="\/ar\/consult\?doctor=dr-x"/);
  assert.doesNotMatch(arHtml, /wa\.me/);
});

test("PseoEstimateCta keeps primary CTA on internal consult flow and secondary CTA on intentional WhatsApp", () => {
  const arHtml = renderToStaticMarkup(
    createElement(PseoEstimateCta, {
      subject: "العلاج الكيميائي",
      place: "الهند",
      consultHref: "/consult?treatment=chemotherapy",
      variant: "records",
      locale: "ar",
    }),
  );
  assert.match(arHtml, /href="\/ar\/consult\?treatment=chemotherapy"/);
  assert.match(arHtml, /data-ga-cta="consult"/);
  assert.match(arHtml, /https:\/\/wa\.me\/919044346292\?text=/);
  assert.match(arHtml, /data-ga-cta="whatsapp"/);
});

test("ConsultForm renders medical report upload and honeypot guard in Arabic and English", () => {
  const formHtml = renderToStaticMarkup(
    createElement(
      LocaleProvider,
      {
        locale: "ar",
        messages: { "consult.reports": "التقارير الطبية" },
        languageOptions: [],
        availableSurfaces: ["consult"],
      },
      createElement(ConsultForm, {
        treatmentOptions: [{ slug: "chemotherapy", name: "العلاج الكيميائي" }],
        hospitalOptions: [{ slug: "apollo-delhi", name: "مستشفيات أبولو دلهي" }],
        locale: "ar",
      }),
    ),
  );
  assert.match(formHtml, /type="file"/);
  assert.match(formHtml, /name="website"/);
  assert.match(formHtml, /التقارير الطبية/);
});
