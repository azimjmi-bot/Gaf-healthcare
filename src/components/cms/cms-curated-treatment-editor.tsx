"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CmsMarkdownField } from "@/components/cms/cms-markdown-field";
import {
  CmsTreatmentRelationPicker,
  type TreatmentRelationChoice,
} from "@/components/cms/cms-treatment-relation-picker";
import {
  blankTreatmentTranslation,
  type CuratedTreatment,
  type CuratedTreatmentTranslation,
} from "@/lib/cms/curated-treatment-types";
import {
  CMS_EDITION_LABELS,
  CMS_EDITIONS,
  type CmsEdition,
} from "@/lib/cms/edition";
import { toSlug, type Taxon } from "@/lib/taxonomy";

type RelationKind = "doctors" | "hospitals" | "costs" | "related";

export function CmsCuratedTreatmentEditor({
  initial,
  specialties,
  destinations,
  initialRelations,
}: {
  initial: CuratedTreatment;
  specialties: Taxon[];
  destinations: Taxon[];
  initialRelations: Record<RelationKind, TreatmentRelationChoice[]>;
}) {
  const router = useRouter();
  const [treatment, setTreatment] = useState(initial);
  const [locale, setLocale] = useState<CmsEdition>("en");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const translation = treatment.translations[locale];

  function setField<K extends keyof CuratedTreatment>(
    key: K,
    value: CuratedTreatment[K],
  ) {
    setTreatment((current) => ({ ...current, [key]: value }));
  }

  function setTranslation(
    key: keyof CuratedTreatmentTranslation,
    value: CuratedTreatmentTranslation[keyof CuratedTreatmentTranslation],
  ) {
    setTreatment((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [locale]: {
          ...(current.translations[locale] ?? blankTreatmentTranslation()),
          [key]: value,
        },
      },
    }));
  }

  function addTranslation() {
    setTreatment((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [locale]: blankTreatmentTranslation(),
      },
    }));
  }

  function removeTranslation() {
    setTreatment((current) => {
      const translations = { ...current.translations };
      delete translations[locale];
      return { ...current, translations };
    });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const response = await fetch(
      `/api/cms/curated-treatments/${treatment.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(treatment),
      },
    );
    const data = await response.json();
    setSaving(false);
    if (!response.ok) {
      setMessage(data.error || "Could not save Treatment.");
      return;
    }
    setTreatment(data);
    setMessage("Treatment saved.");
    router.refresh();
  }

  async function archive() {
    if (!window.confirm("Archive this Treatment and remove it from every public language?")) {
      return;
    }
    await fetch(`/api/cms/curated-treatments/${treatment.id}`, {
      method: "DELETE",
    });
    router.push("/cms/treatments");
    router.refresh();
  }

  async function uploadImage(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setMessage("");
    const form = new FormData();
    form.set("file", file);
    const response = await fetch("/api/cms/media", {
      method: "POST",
      body: form,
    });
    const data = await response.json();
    setUploading(false);
    if (!response.ok) {
      setMessage(data.error || "Upload failed.");
      return;
    }
    setField("image", data.url);
  }

  function toggleDestination(slug: string) {
    setField(
      "destinationSlugs",
      treatment.destinationSlugs.includes(slug)
        ? treatment.destinationSlugs.filter((value) => value !== slug)
        : [...treatment.destinationSlugs, slug],
    );
  }

  function addProcessStep() {
    if (!translation) return;
    setTranslation("process", [
      ...translation.process,
      { id: crypto.randomUUID(), title: "", description: "" },
    ]);
  }

  function updateProcessStep(
    id: string,
    key: "title" | "description",
    value: string,
  ) {
    if (!translation) return;
    setTranslation(
      "process",
      translation.process.map((step) =>
        step.id === id ? { ...step, [key]: value } : step,
      ),
    );
  }

  function addFaq() {
    if (!translation) return;
    setTranslation("faqs", [
      ...translation.faqs,
      { id: crypto.randomUUID(), question: "", answer: "" },
    ]);
  }

  function updateFaq(
    id: string,
    key: "question" | "answer",
    value: string,
  ) {
    if (!translation) return;
    setTranslation(
      "faqs",
      translation.faqs.map((faq) =>
        faq.id === id ? { ...faq, [key]: value } : faq,
      ),
    );
  }

  const relationshipValues: Record<RelationKind, keyof CuratedTreatment> = {
    doctors: "doctorSlugs",
    hospitals: "hospitalSlugs",
    costs: "costPageSlugs",
    related: "relatedTreatmentSlugs",
  };

  return (
    <div className="cms-treatment-editor">
      <div className="cms-editor__actions">
        <span className={message.includes("saved") ? "cms-success" : "cms-error"}>
          {message}
        </span>
        <Button type="button" variant="outline" onClick={archive}>
          Archive
        </Button>
        <Button type="button" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save Treatment"}
        </Button>
      </div>

      <section className="cms-panel">
        <p className="cms-kicker">Shared core data</p>
        <h2>Identity and publication</h2>
        <div className="cms-form-grid">
          <label>
            Base name
            <input
              value={treatment.baseName}
              onChange={(event) => {
                const value = event.target.value;
                setTreatment((current) => ({
                  ...current,
                  baseName: value,
                  slug:
                    current.slug.startsWith("untitled-treatment")
                      ? toSlug(value)
                      : current.slug,
                }));
              }}
              placeholder="Gamma Knife Radiosurgery"
            />
          </label>
          <label>
            Stable canonical slug
            <input
              value={treatment.slug}
              onChange={(event) => setField("slug", toSlug(event.target.value))}
              placeholder="gamma-knife-radiosurgery"
            />
            <small>Changing this stores the previous slug for a permanent redirect.</small>
          </label>
          <label>
            Core status
            <select
              value={treatment.status}
              onChange={(event) =>
                setField(
                  "status",
                  event.target.value as CuratedTreatment["status"],
                )
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived / unpublished</option>
            </select>
          </label>
          <label>
            Existing specialty
            <select
              value={treatment.specialtySlug}
              onChange={(event) => setField("specialtySlug", event.target.value)}
            >
              <option value="">Select a specialty</option>
              {specialties.map((specialty) => (
                <option key={specialty.slug} value={specialty.slug}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Subspecialty (optional)
            <input
              value={treatment.subspecialty}
              onChange={(event) => setField("subspecialty", event.target.value)}
              placeholder="No separate subspecialty entity exists yet"
            />
          </label>
          <label>
            Treatment category
            <input
              value={treatment.category}
              onChange={(event) => setField("category", event.target.value)}
              placeholder="Radiosurgery"
            />
          </label>
          <label>
            Display order
            <input
              type="number"
              value={treatment.sortOrder}
              onChange={(event) =>
                setField("sortOrder", Number(event.target.value))
              }
            />
          </label>
          <label className="cms-check">
            <input
              type="checkbox"
              checked={treatment.featured}
              onChange={(event) => setField("featured", event.target.checked)}
            />
            Featured Treatment
          </label>
        </div>
      </section>

      <section className="cms-panel">
        <h2>Featured image</h2>
        <div className="cms-form-grid">
          <label>
            Image URL
            <input
              value={treatment.image}
              onChange={(event) => setField("image", event.target.value)}
              placeholder="/uploads/articles/treatment.webp"
            />
          </label>
          <label className="cms-upload-button">
            <Upload className="size-4" />
            {uploading ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/webp,image/jpeg,image/png,image/gif,image/svg+xml"
              disabled={uploading}
              onChange={(event) => uploadImage(event.target.files?.[0])}
            />
          </label>
        </div>
        {treatment.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="cms-treatment-editor__image"
            src={treatment.image}
            alt=""
          />
        ) : null}
      </section>

      <section className="cms-panel">
        <h2>Destinations</h2>
        <p className="cms-muted">
          These are references to the existing country taxonomy and never create new URLs.
        </p>
        <div className="cms-destination-grid">
          {destinations.map((destination) => (
            <label key={destination.slug}>
              <input
                type="checkbox"
                checked={treatment.destinationSlugs.includes(destination.slug)}
                onChange={() => toggleDestination(destination.slug)}
              />
              {destination.name}
            </label>
          ))}
        </div>
      </section>

      <section className="cms-panel">
        <h2>Entity relationships</h2>
        <p className="cms-muted">
          Search existing records. Relationships render cards or links; they do not
          copy content or create Treatment routes.
        </p>
        <div className="cms-relation-grid">
          {(
            [
              ["doctors", "Doctors"],
              ["hospitals", "Hospitals"],
              ["costs", "Existing cost pages"],
              ["related", "Related Treatments"],
            ] as const
          ).map(([kind, label]) => {
            const key = relationshipValues[kind];
            const values = treatment[key] as string[];
            return (
              <CmsTreatmentRelationPicker
                key={kind}
                kind={kind}
                label={label}
                values={values}
                initialChoices={initialRelations[kind]}
                onChange={(next) =>
                  setField(key, next as CuratedTreatment[typeof key])
                }
              />
            );
          })}
        </div>
      </section>

      <section className="cms-panel">
        <p className="cms-kicker">Language versions</p>
        <h2>Editorial content and translation status</h2>
        <div className="cms-language-tabs" role="tablist">
          {CMS_EDITIONS.map((code) => {
            const status = treatment.translations[code]?.status ?? "missing";
            return (
              <button
                key={code}
                type="button"
                className={locale === code ? "is-active" : undefined}
                onClick={() => setLocale(code)}
              >
                {CMS_EDITION_LABELS[code]}
                <small data-status={status}>{status}</small>
              </button>
            );
          })}
        </div>

        {!translation ? (
          <div className="cms-translation-missing">
            <p>This language version is missing.</p>
            <Button type="button" onClick={addTranslation}>
              <Plus className="size-4" /> Add {CMS_EDITION_LABELS[locale]} version
            </Button>
          </div>
        ) : (
          <div className="cms-translation-editor">
            <div className="cms-editor__actions">
              <label>
                Translation status
                <select
                  value={translation.status}
                  onChange={(event) =>
                    setTranslation(
                      "status",
                      event.target.value as CuratedTreatmentTranslation["status"],
                    )
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <Button type="button" variant="outline" onClick={removeTranslation}>
                <Trash2 className="size-4" /> Mark missing
              </Button>
            </div>

            <div className="cms-form-grid">
              <label>
                Treatment name
                <input
                  value={translation.name}
                  onChange={(event) => setTranslation("name", event.target.value)}
                />
              </label>
              <label>
                Search keywords
                <input
                  value={translation.searchKeywords.join(", ")}
                  onChange={(event) =>
                    setTranslation(
                      "searchKeywords",
                      event.target.value
                        .split(",")
                        .map((value) => value.trim())
                        .filter(Boolean),
                    )
                  }
                  placeholder="Comma-separated synonyms"
                />
              </label>
              <label className="cms-span-2">
                Short description
                <textarea
                  rows={3}
                  value={translation.shortDescription}
                  onChange={(event) =>
                    setTranslation("shortDescription", event.target.value)
                  }
                />
              </label>
              <label className="cms-span-2">
                Image alt text
                <input
                  value={translation.imageAlt}
                  onChange={(event) =>
                    setTranslation("imageAlt", event.target.value)
                  }
                />
              </label>
            </div>

            <div className="cms-treatment-editor__markdown">
              {(
                [
                  ["fullDescription", "Full description"],
                  ["overview", "Treatment overview"],
                  ["whatIsIt", "What is the Treatment?"],
                  ["conditionsTreated", "What condition does it treat?"],
                  ["whyPerformed", "Why is it performed?"],
                  ["whoMayNeed", "Who may need it?"],
                  ["howItWorks", "How the Treatment works"],
                  ["preparation", "Preparation"],
                  ["procedureDetails", "Procedure details"],
                  ["recovery", "Recovery"],
                  ["risks", "Risks and possible complications"],
                  ["followUp", "Follow-up"],
                  ["importantConsiderations", "Important considerations"],
                ] as const
              ).map(([key, label]) => (
                <CmsMarkdownField
                  key={key}
                  label={label}
                  value={translation[key]}
                  rows={7}
                  onChange={(value) => setTranslation(key, value)}
                />
              ))}
            </div>

            <div className="cms-form-grid">
              {(
                [
                  ["treatmentType", "Treatment type"],
                  ["hospitalStay", "Typical hospital stay"],
                  ["recoveryPeriod", "Typical recovery period"],
                  ["treatmentSetting", "Treatment setting"],
                  ["technology", "Technology"],
                ] as const
              ).map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    value={translation[key]}
                    onChange={(event) => setTranslation(key, event.target.value)}
                  />
                </label>
              ))}
            </div>

            <div className="cms-nested-editor">
              <div className="cms-nested-editor__head">
                <h3>Treatment process</h3>
                <Button type="button" variant="outline" onClick={addProcessStep}>
                  <Plus className="size-4" /> Add step
                </Button>
              </div>
              {translation.process.map((step, index) => (
                <div key={step.id} className="cms-nested-row">
                  <span>{index + 1}</span>
                  <input
                    value={step.title}
                    onChange={(event) =>
                      updateProcessStep(step.id, "title", event.target.value)
                    }
                    placeholder="Step title"
                  />
                  <textarea
                    value={step.description}
                    onChange={(event) =>
                      updateProcessStep(
                        step.id,
                        "description",
                        event.target.value,
                      )
                    }
                    placeholder="Patient-facing explanation"
                    rows={2}
                  />
                  <button
                    type="button"
                    aria-label="Remove process step"
                    onClick={() =>
                      setTranslation(
                        "process",
                        translation.process.filter((row) => row.id !== step.id),
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="cms-nested-editor">
              <div className="cms-nested-editor__head">
                <h3>Frequently asked questions</h3>
                <Button type="button" variant="outline" onClick={addFaq}>
                  <Plus className="size-4" /> Add FAQ
                </Button>
              </div>
              {translation.faqs.map((faq) => (
                <div key={faq.id} className="cms-nested-row cms-nested-row--faq">
                  <input
                    value={faq.question}
                    onChange={(event) =>
                      updateFaq(faq.id, "question", event.target.value)
                    }
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(event) =>
                      updateFaq(faq.id, "answer", event.target.value)
                    }
                    placeholder="Answer"
                    rows={3}
                  />
                  <button
                    type="button"
                    aria-label="Remove FAQ"
                    onClick={() =>
                      setTranslation(
                        "faqs",
                        translation.faqs.filter((row) => row.id !== faq.id),
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="cms-form-grid">
              <label className="cms-span-2">
                SEO title
                <input
                  value={translation.seoTitle}
                  onChange={(event) =>
                    setTranslation("seoTitle", event.target.value)
                  }
                />
              </label>
              <label className="cms-span-2">
                Meta description
                <textarea
                  rows={3}
                  value={translation.metaDescription}
                  onChange={(event) =>
                    setTranslation("metaDescription", event.target.value)
                  }
                />
              </label>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
