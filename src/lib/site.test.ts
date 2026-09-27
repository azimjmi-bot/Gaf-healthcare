import assert from "node:assert/strict";
import test from "node:test";
import {
  blogCtaSubject,
  blogEstimateWhatsapp,
  consultToWhatsappHref,
  whatsappHref,
} from "@/lib/site";

test("consultToWhatsappHref rewrites consult links and leaves other hrefs alone", () => {
  const rewritten = consultToWhatsappHref("/consult?treatment=Lumpectomy%20vs%20Mastectomy");
  assert.match(rewritten, /^https:\/\/wa\.me\/919044346292\?text=/);
  assert.match(rewritten, /Lumpectomy/);
  assert.equal(consultToWhatsappHref("/blogs/lumpectomy-vs-mastectomy"), "/blogs/lumpectomy-vs-mastectomy");
  assert.equal(
    consultToWhatsappHref("https://wa.me/919044346292?text=Hello"),
    "https://wa.me/919044346292?text=Hello",
  );
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
