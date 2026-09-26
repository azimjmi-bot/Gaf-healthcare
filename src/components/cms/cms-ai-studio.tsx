"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AI_ACTIONS,
  STUDIO_FIELD_LABELS,
  emptyStudioFields,
  type AiAction,
  type AiContentType,
  type AiGenerationRecord,
  type StudioFields,
} from "@/lib/ai/types";

type Options = {
  countries: Array<{ slug: string; name: string }>;
  cities: Array<{ slug: string; name: string; countrySlug: string }>;
  specialties: Array<{ slug: string; name: string }>;
  treatments: Array<{ id: string; slug: string; name: string; specialtySlug: string; destinationSlugs: string[] }>;
  doctors: Array<{ slug: string; name: string; specialty?: string; city?: string }>;
  hospitals: Array<{ slug: string; name: string; city?: string }>;
  articles: Array<{ id: string; slug: string; title: string; status: string }>;
};

const TEXT_KEYS = [
  "title",
  "h1",
  "meta_title",
  "meta_description",
  "quick_answer",
  "introduction",
  "definition",
  "overview",
  "how_it_works",
  "who_may_need_it",
  "preparation",
  "recovery",
  "risks",
  "benefits",
  "cost_section",
  "why_location",
  "hospital_section",
  "doctor_section",
  "international_patient_information",
  "bio",
  "cta",
  "section_rewritten",
] as const satisfies readonly (keyof StudioFields)[];

export function CmsAiStudio() {
  const [options, setOptions] = useState<Options | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [configMessage, setConfigMessage] = useState("");
  const [contentType, setContentType] = useState<AiContentType>("treatment");
  const [countrySlug, setCountrySlug] = useState("india");
  const [citySlug, setCitySlug] = useState("");
  const [specialtySlug, setSpecialtySlug] = useState("radiation-oncology");
  const [treatmentId, setTreatmentId] = useState("");
  const [doctorSlug, setDoctorSlug] = useState("");
  const [hospitalSlug, setHospitalSlug] = useState("");
  const [articleId, setArticleId] = useState("");
  const [locale, setLocale] = useState("en");
  const [tone, setTone] = useState("professional");
  const [seo, setSeo] = useState("standard");
  const [geo, setGeo] = useState("standard");
  const [length, setLength] = useState("standard");
  const [useDoctors, setUseDoctors] = useState(true);
  const [useHospitals, setUseHospitals] = useState(true);
  const [useCosts, setUseCosts] = useState(true);
  const [instruction, setInstruction] = useState(
    "Create a comprehensive treatment page for international patients. Follow GAF Healthcare content guidelines. Use only CMS data.",
  );
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [generation, setGeneration] = useState<AiGenerationRecord | null>(null);
  const [output, setOutput] = useState<StudioFields>(emptyStudioFields());
  const [section, setSection] = useState("introduction");

  useEffect(() => {
    void fetch("/api/cms/ai/status")
      .then((res) => res.json())
      .then((data) => {
        setConfigured(Boolean(data.configured));
        setConfigMessage(data.message || "");
      });
    void fetch("/api/cms/ai/options")
      .then((res) => res.json())
      .then(setOptions);
  }, []);

  const cities = useMemo(
    () => (options?.cities || []).filter((row) => row.countrySlug === countrySlug),
    [options, countrySlug],
  );
  const treatments = useMemo(
    () =>
      (options?.treatments || []).filter(
        (row) => !specialtySlug || row.specialtySlug === specialtySlug,
      ),
    [options, specialtySlug],
  );
  const selectedTreatment = treatments.find((row) => row.id === treatmentId);

  async function run(action: AiAction, extraInstruction?: string) {
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/cms/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        contentType,
        instruction: extraInstruction || instruction,
        locale,
        recordId: contentType === "treatment" ? treatmentId : contentType === "article" ? articleId : doctorSlug || hospitalSlug,
        countrySlug,
        citySlug,
        specialtySlug,
        treatmentSlug: selectedTreatment?.slug,
        doctorSlug: contentType === "doctor" ? doctorSlug : undefined,
        hospitalSlug: contentType === "hospital" ? hospitalSlug : undefined,
        articleId: contentType === "article" ? articleId : undefined,
        section,
        tone,
        seo,
        geo,
        length,
        useDoctors,
        useHospitals,
        useCosts,
        useTreatment: true,
        useSpecialty: true,
        useCity: true,
      }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error || "AI generation failed. Please try again.");
      return;
    }
    setGeneration(data);
    setOutput(data.output);
    setMessage(
      data.flags?.length
        ? `Generated. ${data.flags.length} item(s) need review. Nothing was saved.`
        : "Generated. Review, edit, then save as draft or publish.",
    );
  }

  async function apply(mode: "draft" | "publish" | "approve") {
    if (!generation) return;
    setBusy(true);
    const res = await fetch("/api/cms/ai/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: generation.id, mode, output }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error || "Could not apply.");
      return;
    }
    setGeneration(data);
    setMessage(
      mode === "approve"
        ? "Marked approved. Still not saved to the public record."
        : mode === "draft"
          ? "Saved as draft through the existing CMS store."
          : `Published through the existing CMS workflow${data.appliedUrl ? ` → ${data.appliedUrl}` : ""}.`,
    );
  }

  function setField<K extends keyof StudioFields>(key: K, value: StudioFields[K]) {
    setOutput((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="cms-page cms-studio">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Editorial assistant</p>
          <h1>AI Content Studio</h1>
          <p className="cms-muted">
            Generates structured copy from records already in the CMS. It never publishes on its own,
            never changes a live URL, and never invents doctors, hospitals or prices.
          </p>
        </div>
      </header>

      {configured === false ? <p className="cms-error">{configMessage}</p> : null}
      {message ? <p className="cms-flash">{message}</p> : null}

      <div className="cms-studio__grid">
        <section className="cms-panel">
          <h2>Request</h2>
          <div className="cms-form-grid">
            <label>
              Content type
              <select value={contentType} onChange={(e) => setContentType(e.target.value as AiContentType)}>
                <option value="treatment">Treatment page</option>
                <option value="doctor">Doctor bio</option>
                <option value="hospital">Hospital bio</option>
                <option value="article">Article</option>
              </select>
            </label>
            <label>
              Language
              <select value={locale} onChange={(e) => setLocale(e.target.value)}>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="ru">Russian</option>
                <option value="sw">Swahili</option>
              </select>
            </label>
            {contentType === "treatment" ? (
              <>
                <label>
                  Country
                  <select value={countrySlug} onChange={(e) => { setCountrySlug(e.target.value); setCitySlug(""); }}>
                    {(options?.countries || []).map((row) => (
                      <option key={row.slug} value={row.slug}>{row.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  City
                  <select value={citySlug} onChange={(e) => setCitySlug(e.target.value)}>
                    <option value="">Any city in this country</option>
                    {cities.map((row) => (
                      <option key={row.slug} value={row.slug}>{row.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Specialty
                  <select value={specialtySlug} onChange={(e) => { setSpecialtySlug(e.target.value); setTreatmentId(""); }}>
                    {(options?.specialties || []).map((row) => (
                      <option key={row.slug} value={row.slug}>{row.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Treatment
                  <select value={treatmentId} onChange={(e) => setTreatmentId(e.target.value)}>
                    <option value="">Select a curated treatment</option>
                    {treatments.map((row) => (
                      <option key={row.id} value={row.id}>{row.name}</option>
                    ))}
                  </select>
                </label>
              </>
            ) : null}
            {contentType === "doctor" ? (
              <label className="cms-span-2">
                Doctor
                <select value={doctorSlug} onChange={(e) => setDoctorSlug(e.target.value)}>
                  <option value="">Select a doctor</option>
                  {(options?.doctors || []).map((row) => (
                    <option key={row.slug} value={row.slug}>
                      {row.name} {row.city ? `· ${row.city}` : ""}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            {contentType === "hospital" ? (
              <label className="cms-span-2">
                Hospital
                <select value={hospitalSlug} onChange={(e) => setHospitalSlug(e.target.value)}>
                  <option value="">Select a hospital</option>
                  {(options?.hospitals || []).map((row) => (
                    <option key={row.slug} value={row.slug}>
                      {row.name} {row.city ? `· ${row.city}` : ""}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            {contentType === "article" ? (
              <label className="cms-span-2">
                Article
                <select value={articleId} onChange={(e) => setArticleId(e.target.value)}>
                  <option value="">Select an article</option>
                  {(options?.articles || []).map((row) => (
                    <option key={row.id} value={row.id}>{row.title}</option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
          <label>
            AI instruction
            <Textarea value={instruction} rows={6} onChange={(e) => setInstruction(e.target.value)} />
          </label>
          <div className="cms-studio__buttons">
            <Button type="button" disabled={busy || configured === false} onClick={() => void run("generate")}>
              {busy ? "Generating…" : "Generate content"}
            </Button>
            {AI_ACTIONS.filter((action) => action !== "generate").map((action) => (
              <Button
                key={action}
                type="button"
                variant="outline"
                disabled={busy || configured === false}
                onClick={() => void run(action)}
              >
                {action.replaceAll("_", " ")}
              </Button>
            ))}
          </div>
          <details className="cms-studio__advanced">
            <summary>Advanced options</summary>
            <div className="cms-form-grid">
              <label>
                Tone
                <select value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="professional">Professional</option>
                  <option value="human">Human</option>
                  <option value="patient-friendly">Patient-friendly</option>
                </select>
              </label>
              <label>
                SEO
                <select value={seo} onChange={(e) => setSeo(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="strong">Strong</option>
                </select>
              </label>
              <label>
                GEO
                <select value={geo} onChange={(e) => setGeo(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="strong">Strong</option>
                </select>
              </label>
              <label>
                Length
                <select value={length} onChange={(e) => setLength(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="long">Long</option>
                </select>
              </label>
              <label>
                Rewrite section
                <select value={section} onChange={(e) => setSection(e.target.value)}>
                  {TEXT_KEYS.map((key) => (
                    <option key={key} value={key}>{STUDIO_FIELD_LABELS[key]}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="cms-studio__checks">
              <label><input type="checkbox" checked={useDoctors} onChange={(e) => setUseDoctors(e.target.checked)} /> Doctors</label>
              <label><input type="checkbox" checked={useHospitals} onChange={(e) => setUseHospitals(e.target.checked)} /> Hospitals</label>
              <label><input type="checkbox" checked={useCosts} onChange={(e) => setUseCosts(e.target.checked)} /> Cost data</label>
            </div>
          </details>
        </section>

        <section className="cms-panel">
          <h2>Generated content</h2>
          {!generation ? (
            <p className="cms-muted">Nothing generated yet. The live page is unchanged.</p>
          ) : (
            <>
              <p className="cms-muted">
                Live URL stays <code>{generation.currentUrl || "(none yet)"}</code>. Suggested slug is not applied.
                Status: {generation.status}.
              </p>
              {generation.flags.length ? (
                <ul className="cms-studio__flags">
                  {generation.flags.map((flag, index) => (
                    <li key={`${flag.code}-${index}`}>{flag.message}</li>
                  ))}
                </ul>
              ) : null}
              {generation.original.editorialBody || generation.original.bio ? (
                <details>
                  <summary>Original vs generated</summary>
                  <div className="cms-studio__compare">
                    <div>
                      <h3>Original</h3>
                      <pre>{generation.original.bio || generation.original.editorialBody || generation.original.excerpt}</pre>
                    </div>
                    <div>
                      <h3>Generated</h3>
                      <pre>{output.bio || output.introduction || output.overview}</pre>
                    </div>
                  </div>
                </details>
              ) : null}
              <label>
                Suggested slug (not applied)
                <input value={output.suggested_slug} readOnly />
              </label>
              {TEXT_KEYS.map((key) =>
                output[key] || ["title", "meta_title", "meta_description", "bio", "introduction"].includes(key) ? (
                  <label key={key}>
                    {STUDIO_FIELD_LABELS[key]}
                    {generation.original.seoTitle && key === "meta_title" ? (
                      <small>Current: {generation.original.seoTitle}</small>
                    ) : null}
                    <Textarea
                      rows={key === "meta_description" || key === "bio" || key === "introduction" ? 6 : 3}
                      value={output[key]}
                      onChange={(e) => setField(key, e.target.value)}
                    />
                  </label>
                ) : null,
              )}
              <div>
                <h3>FAQs</h3>
                {output.faqs.map((faq, index) => (
                  <div key={index} className="cms-form-grid">
                    <input
                      value={faq.question}
                      placeholder="Question"
                      onChange={(e) => {
                        const faqs = [...output.faqs];
                        faqs[index] = { ...faq, question: e.target.value };
                        setField("faqs", faqs);
                      }}
                    />
                    <input
                      value={faq.answer}
                      placeholder="Answer"
                      onChange={(e) => {
                        const faqs = [...output.faqs];
                        faqs[index] = { ...faq, answer: e.target.value };
                        setField("faqs", faqs);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <h3>Internal links</h3>
                {output.internal_links.length === 0 ? <p className="cms-muted">None, or they were dropped because the URL is not in the CMS.</p> : null}
                <ul>
                  {output.internal_links.map((link, index) => (
                    <li key={`${link.url}-${index}`}>
                      <strong>{link.anchor}</strong> → <code>{link.url}</code>
                      <span className="cms-muted"> — {link.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cms-studio__buttons">
                <Button type="button" variant="outline" disabled={busy} onClick={() => void run("generate")}>Regenerate</Button>
                <Button type="button" variant="outline" disabled={busy} onClick={() => void apply("approve")}>Approve</Button>
                <Button type="button" variant="outline" disabled={busy} onClick={() => void apply("draft")}>Save draft</Button>
                <Button type="button" disabled={busy} onClick={() => void apply("publish")}>Publish</Button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
