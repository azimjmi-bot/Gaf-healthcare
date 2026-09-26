"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SpecialtyPageProfile } from "@/data/specialty-pages/types";

type JsonKey =
  | "terminology"
  | "overview"
  | "conditions"
  | "treatmentGroups"
  | "selection"
  | "treatmentProcess"
  | "costExplanation"
  | "pricingGroups"
  | "costFactors"
  | "mayInclude"
  | "mayBeAdditional"
  | "technologies"
  | "internationalPatientInformation"
  | "recordsRequired"
  | "stayDuration"
  | "countryComparison"
  | "relatedSpecialtySlugs"
  | "faqs"
  | "cityFaqQuestions"
  | "cityEditorials";

const JSON_FIELDS: { key: JsonKey; label: string; help: string }[] = [
  {
    key: "terminology",
    label: "Specialty terminology",
    help: "JSON: careItem, careItems, practitioner, practitioners, durationLabel",
  },
  { key: "overview", label: "Overview paragraphs", help: "JSON array of strings" },
  { key: "conditions", label: "Conditions", help: "JSON array: name, summary, procedureSlugs" },
  { key: "treatmentGroups", label: "Treatment groups", help: "JSON array: name, summary, procedureSlugs" },
  { key: "selection", label: "Treatment selection", help: "JSON array of strings" },
  { key: "treatmentProcess", label: "Treatment process", help: "JSON array: label, detail" },
  { key: "costExplanation", label: "Cost explanation", help: "JSON array of strings" },
  {
    key: "pricingGroups",
    label: "Compatible pricing groups",
    help: "JSON array: name, basis, explanation, procedureSlugs",
  },
  { key: "costFactors", label: "Cost factors", help: "JSON array: label, detail" },
  { key: "mayInclude", label: "May include", help: "JSON array of strings" },
  { key: "mayBeAdditional", label: "May be additional", help: "JSON array of strings" },
  { key: "technologies", label: "Technologies", help: "JSON array: name, what, why, procedureSlugs" },
  {
    key: "internationalPatientInformation",
    label: "International patient guidance",
    help: "JSON array of strings",
  },
  { key: "recordsRequired", label: "Medical records", help: "JSON array of strings" },
  { key: "stayDuration", label: "Stay guidance", help: "JSON array of strings" },
  { key: "countryComparison", label: "Country comparison", help: "JSON array of strings" },
  { key: "relatedSpecialtySlugs", label: "Related specialty slugs", help: "JSON array of exact slugs" },
  { key: "faqs", label: "FAQs", help: "JSON array: q, a" },
  {
    key: "cityFaqQuestions",
    label: "Shared questions allowed on city pages",
    help: "JSON array of exact FAQ question strings",
  },
  {
    key: "cityEditorials",
    label: "City editorial guides",
    help: "JSON array: citySlug, introduction, whyCity, planning, logistics, faqExtras",
  },
];

export function CmsSpecialtyPageEditor({
  initial,
}: {
  initial: SpecialtyPageProfile;
}) {
  const [basic, setBasic] = useState({
    status: initial.status,
    allowIndex: initial.allowIndex,
    lastReviewed: initial.lastReviewed,
    seoTitle: initial.seoTitle,
    seoDescription: initial.seoDescription,
    introAnswer: initial.introAnswer,
    medicalDisclaimer: initial.medicalDisclaimer,
  });
  const [json, setJson] = useState<Record<JsonKey, string>>(
    Object.fromEntries(
      JSON_FIELDS.map(({ key }) => [key, JSON.stringify(initial[key], null, 2)]),
    ) as Record<JsonKey, string>,
  );
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const structured = Object.fromEntries(
        JSON_FIELDS.map(({ key }) => [key, JSON.parse(json[key])]),
      );
      const response = await fetch(
        `/api/cms/specialties/${initial.countrySlug}/${initial.specialtySlug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...basic, ...structured }),
        },
      );
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Save failed.");
      setMessage("Specialty page saved. Dynamic catalog relationships were not changed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="cms-card space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <label>
            Publication status
            <select
              className="cms-plain"
              value={basic.status}
              onChange={(event) =>
                setBasic((current) => ({
                  ...current,
                  status: event.target.value as "draft" | "published",
                }))
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className="flex items-center gap-3 self-end pb-3">
            <input
              type="checkbox"
              checked={basic.allowIndex}
              onChange={(event) =>
                setBasic((current) => ({
                  ...current,
                  allowIndex: event.target.checked,
                }))
              }
            />
            Allow search indexing
          </label>
          <label>
            Last medically reviewed
            <Input
              type="date"
              value={basic.lastReviewed}
              onChange={(event) =>
                setBasic((current) => ({
                  ...current,
                  lastReviewed: event.target.value,
                }))
              }
            />
          </label>
        </div>
        <label>
          SEO title
          <Input
            value={basic.seoTitle}
            onChange={(event) =>
              setBasic((current) => ({ ...current, seoTitle: event.target.value }))
            }
          />
        </label>
        <label>
          Meta description
          <Textarea
            rows={3}
            value={basic.seoDescription}
            onChange={(event) =>
              setBasic((current) => ({
                ...current,
                seoDescription: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Answer-first introduction
          <Textarea
            rows={5}
            value={basic.introAnswer}
            onChange={(event) =>
              setBasic((current) => ({ ...current, introAnswer: event.target.value }))
            }
          />
        </label>
      </section>

      <section className="cms-card grid gap-6 lg:grid-cols-2">
        {JSON_FIELDS.map(({ key, label, help }) => (
          <label key={key}>
            {label}
            <span className="ms-2 text-xs text-muted-foreground">{help}</span>
            <Textarea
              className="mt-2 font-mono text-xs"
              rows={key === "conditions" || key === "technologies" || key === "cityEditorials" ? 18 : 10}
              value={json[key]}
              onChange={(event) =>
                setJson((current) => ({ ...current, [key]: event.target.value }))
              }
            />
          </label>
        ))}
      </section>

      <section className="cms-card">
        <label>
          Medical disclaimer
          <Textarea
            rows={4}
            value={basic.medicalDisclaimer}
            onChange={(event) =>
              setBasic((current) => ({
                ...current,
                medicalDisclaimer: event.target.value,
              }))
            }
          />
        </label>
        {message ? <p className="cms-flash mt-4">{message}</p> : null}
        <Button className="mt-5" type="button" disabled={saving} onClick={() => void save()}>
          {saving ? "Saving…" : "Save specialty page"}
        </Button>
      </section>
    </div>
  );
}
