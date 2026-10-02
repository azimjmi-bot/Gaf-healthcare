import assert from "node:assert/strict";
import test from "node:test";
import {
  blogCtaSubject,
  blogEstimateWhatsapp,
  consultToWhatsappHref,
  isPublicWhatsAppFloatPath,
  whatsappHref,
} from "@/lib/site";

test("consultToWhatsappHref rewrites consult links and leaves other hrefs alone", () => {
  const rewritten = consultToWhatsappHref("/consult?treatment=Lumpectomy%20vs%20Mastectomy");
  assert.match(rewritten, /^https:\/\/wa\.me\/919044346292\?text=/);
  assert.match(rewritten, /Lumpectomy/);
  assert.match(
    consultToWhatsappHref("/consult?doctor=dr-aditya-gupta&city=Delhi-NCR"),
    /aditya/i,
  );
  assert.match(
    consultToWhatsappHref("/consult?hospital=apollo-delhi"),
    /apollo/,
  );
  assert.match(
    consultToWhatsappHref("/consult?specialty=radiation-oncology"),
    /radiation/,
  );
  assert.match(consultToWhatsappHref("/consult"), /case-specific/);
  assert.equal(consultToWhatsappHref("/blogs/lumpectomy-vs-mastectomy"), "/blogs/lumpectomy-vs-mastectomy");
  assert.equal(
    consultToWhatsappHref("https://wa.me/919044346292?text=Hello"),
    "https://wa.me/919044346292?text=Hello",
  );
});

test("the floating WhatsApp CTA stays off CMS screens", () => {
  assert.equal(isPublicWhatsAppFloatPath("/"), true);
  assert.equal(isPublicWhatsAppFloatPath("/treatments/stereotactic-radiosurgery-in-india"), true);
  assert.equal(isPublicWhatsAppFloatPath("/cms"), false);
  assert.equal(isPublicWhatsAppFloatPath("/cms/treatments"), false);
  assert.equal(isPublicWhatsAppFloatPath("/ar/cms"), false);
});

test("blog estimate WhatsApp links use the article subject", () => {
  assert.equal(blogCtaSubject("Lumpectomy vs Mastectomy: Which Surgery Is Right?"), "Lumpectomy vs Mastectomy");
  assert.equal(blogCtaSubject("Chemotherapy for Breast Cancer in India: Cost"), "Chemotherapy for Breast Cancer");
  const wa = blogEstimateWhatsapp("lumpectomy vs mastectomy");
  assert.equal(wa.primary, whatsappHref(
    "Please review my medical records and share a case-specific estimate for lumpectomy vs mastectomy in India.",
  ));
  assert.match(wa.secondary, /wa\.me\/919044346292/);
});
