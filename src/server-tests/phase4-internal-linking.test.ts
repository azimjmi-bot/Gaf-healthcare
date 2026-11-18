import assert from "node:assert/strict";
import test from "node:test";
import { getPost } from "@/lib/blogs";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";

const ADDED_BLOG_TREATMENT_LINKS: Array<{ blog: string; href: string }> = [
  { blog: "breast-cancer-chemotherapy-side-effects", href: "/treatments/chemotherapy-in-india" },
  { blog: "breast-cancer-neoadjuvant-therapy", href: "/treatments/chemotherapy-in-india" },
  { blog: "chemotherapy-for-breast-cancer-in-india", href: "/treatments/chemotherapy-in-india" },
  { blog: "inflammatory-breast-cancer-treatment-india", href: "/treatments/chemotherapy-in-india" },
  { blog: "colon-cancer-chemotherapy-in-india", href: "/treatments/chemotherapy-in-india" },
  { blog: "colon-cancer-immunotherapy-in-india", href: "/treatments/immunotherapy-in-india" },
  { blog: "stage-4-colon-cancer-treatment-in-india", href: "/treatments/hipec-surgery-in-india" },
  { blog: "peritoneal-carcinomatosis", href: "/treatments/colon-cancer-treatment-in-india" },
  { blog: "peritoneal-metastases-treatment", href: "/treatments/colon-cancer-treatment-in-india" },
  { blog: "what-is-hipec-surgery", href: "/treatments/colon-cancer-treatment-in-india" },
  { blog: "how-to-choose-the-right-cardiologist-in-india", href: "/treatments/heart-valve-replacement-in-india" },
  {
    blog: "interventional-cardiologist-vs-clinical-cardiologist",
    href: "/treatments/heart-valve-replacement-in-india",
  },
  { blog: "what-to-bring-to-a-cardiologist-appointment", href: "/treatments/cabg-surgery-in-india" },
  { blog: "what-to-bring-to-a-cardiologist-appointment", href: "/treatments/coronary-angioplasty-in-india" },
  {
    blog: "what-to-bring-to-a-cardiologist-appointment",
    href: "/treatments/heart-valve-replacement-in-india",
  },
];

const PHASE1_TREATMENTS = [
  "breast-cancer-treatment-in-india",
  "chemotherapy-in-india",
  "immunotherapy-in-india",
  "colon-cancer-treatment-in-india",
  "hipec-surgery-in-india",
  "prostate-cancer-treatment-in-india",
  "cabg-surgery-in-india",
  "coronary-angioplasty-in-india",
  "heart-valve-replacement-in-india",
  "pediatric-heart-surgery-in-india",
  "ivf-treatment-in-india",
] as const;

test("Phase 4 ADD blog relatedLinks resolve to published treatment hubs", () => {
  const store = loadCuratedTreatments();
  for (const { blog, href } of ADDED_BLOG_TREATMENT_LINKS) {
    const post = getPost(blog, "en");
    assert.ok(post, `missing blog ${blog}`);
    assert.equal(post.status, "published");
    assert.ok(
      post.relatedLinks.some((link) => link.href === href),
      `${blog} missing relatedLinks entry ${href}`,
    );
    const slug = href.replace("/treatments/", "");
    const treatment = store.treatments.find((row) => row.slug === slug);
    assert.ok(treatment, `missing treatment ${slug}`);
    assert.equal(treatment.status, "published");
  }
});

test("Phase 4 Phase 1 treatments keep doctor and hospital modules", () => {
  const store = loadCuratedTreatments();
  for (const slug of PHASE1_TREATMENTS) {
    const treatment = store.treatments.find((row) => row.slug === slug);
    assert.ok(treatment, slug);
    assert.equal(treatment.status, "published", slug);
    assert.ok(treatment.doctorSlugs.length > 0, `${slug} doctors`);
    assert.ok(treatment.hospitalSlugs.length > 0, `${slug} hospitals`);
  }
});
