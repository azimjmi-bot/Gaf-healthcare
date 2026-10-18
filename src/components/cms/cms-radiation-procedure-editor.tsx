"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { applyRadiationProcedurePatch, procedureCopyIssues, PROCEDURE_FAQ_MIN } from "@/lib/i18n/radiation-procedure-page";
import type { RadiationProcedureCopy } from "@/lib/i18n/radiation-procedure-page";

type Faq = { q: string; a: string };

type EditorBaseline = {
  h1: string;
  description: string;
  quickAnswer: string;
  note: string[];
  faqs: Faq[];
  markers: string[];
};

export function CmsRadiationProcedureEditor({
  slug,
  procedure,
  kind,
  publicPath,
  baseline,
  initialStatus,
  initial,
}: {
  slug: string;
  procedure: string;
  kind: string;
  publicPath: string;
  baseline: EditorBaseline;
  initialStatus: "draft" | "published" | "none";
  initial: EditorBaseline;
}) {
  const [status, setStatus] = useState<"draft" | "published">(initialStatus === "published" ? "published" : "draft");
  const [h1, setH1] = useState(initial.h1);
  const [description, setDescription] = useState(initial.description);
  const [quickAnswer, setQuickAnswer] = useState(initial.quickAnswer);
  const [note, setNote] = useState(initial.note.join("\n\n"));
  const [faqs, setFaqs] = useState<Faq[]>(initial.faqs);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const issues = useMemo(() => {
    const patch = {
      status,
      h1,
      description,
      quickAnswer,
      note: note.split(/\n\s*\n/).map((row) => row.trim()).filter(Boolean),
      faqs,
    };
    const baselineCopy = {
      procedure,
      kind,
      h1: baseline.h1,
      title: baseline.h1,
      description: baseline.description,
      intro: baseline.quickAnswer,
      quickAnswer: baseline.quickAnswer,
      noteHeading: "note",
      note: baseline.note,
      steps: [
        { title: "a", body: "b" },
        { title: "c", body: "d" },
        { title: "e", body: "f" },
        { title: "g", body: "h" },
      ],
      indicationsIntro: "indications",
      indications: ["1", "2", "3"],
      benefits: ["1", "2"],
      risks: ["1", "2"],
      limitations: ["1", "2"],
      eligibility: ["1", "2", "3"],
      comparisonTitle: "comparison",
      comparisonIntro: "comparison",
      comparisonPeerLabel: "peer",
      comparison: [
        { aspect: "a", ours: "b", theirs: "c" },
        { aspect: "d", ours: "e", theirs: "f" },
        { aspect: "g", ours: "h", theirs: "i" },
      ],
      costFactors: ["1", "2", "3"],
      records: ["1", "2", "3"],
      international: "international",
      related: [],
      markers: baseline.markers,
      faqs: baseline.faqs,
    } as RadiationProcedureCopy;
    return procedureCopyIssues(applyRadiationProcedurePatch(baselineCopy, patch)).filter(
      (issue) => issue.startsWith("faq") || issue.startsWith("only") || issue.startsWith("empty") || issue.includes("percentage") || issue.includes("price") || issue.includes("ranking") || issue.includes("review"),
    );
  }, [baseline, description, faqs, h1, kind, note, procedure, quickAnswer, status]);

  function moveFaq(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= faqs.length) return;
    const copy = [...faqs];
    const [row] = copy.splice(index, 1);
    copy.splice(next, 0, row);
    setFaqs(copy);
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`/api/cms/radiation-procedures/${slug}?edition=ar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          h1,
          description,
          quickAnswer,
          note: note.split(/\n\s*\n/).map((row) => row.trim()).filter(Boolean),
          faqs,
        }),
      });
      const result = (await response.json()) as { error?: string; issues?: string[] };
      if (!response.ok) {
        throw new Error([result.error, ...(result.issues ?? [])].filter(Boolean).join(" "));
      }
      setMessage(
        status === "published"
          ? "Published on the Arabic catalog. The public page can now use this long form."
          : "Draft saved. The public URL stays the existing doctor directory until you publish.",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function generate(section: "faqs" | "note" | "quickAnswer") {
    if (status === "published") {
      const confirmed = window.confirm(
        "This replaces the selected fields on screen only. It does not save, and it does not change the published page until you save again.",
      );
      if (!confirmed) return;
    }
    setGenerating(true);
    setMessage("");
    try {
      const response = await fetch(`/api/cms/radiation-procedures/${slug}/generate?edition=ar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section }),
      });
      const result = (await response.json()) as {
        error?: string;
        draft?: { quickAnswer?: string; note?: string[]; faqs?: Faq[] };
      };
      if (!response.ok) throw new Error(result.error || "Generation failed.");
      if (section === "quickAnswer" && result.draft?.quickAnswer) setQuickAnswer(result.draft.quickAnswer);
      if (section === "note" && result.draft?.note?.length) setNote(result.draft.note.join("\n\n"));
      if (section === "faqs" && result.draft?.faqs?.length) setFaqs(result.draft.faqs);
      setMessage("Draft inserted into the form. Nothing was saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="cms-card space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            Publication status
            <select className="cms-plain" value={status} onChange={(event) => setStatus(event.target.value as "draft" | "published")}>
              <option value="draft">Draft — public page keeps the existing directory</option>
              <option value="published">Published — long form goes on the Arabic URL</option>
            </select>
          </label>
          <p className="text-sm text-muted-foreground self-end">
            {faqs.length} FAQs on screen. Publish needs at least {PROCEDURE_FAQ_MIN} complete pairs and a clean completeness check.
            {issues.length > 0 ? ` Current check: ${issues[0]}` : " Completeness check is clear."}
          </p>
        </div>
        <label>
          H1
          <Input value={h1} onChange={(event) => setH1(event.target.value)} />
        </label>
        <label>
          Meta description
          <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <label>
          Quick answer
          <Textarea value={quickAnswer} onChange={(event) => setQuickAnswer(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" disabled={generating} onClick={() => generate("quickAnswer")}>
            Draft quick answer
          </Button>
          <Button type="button" variant="outline" disabled={generating} onClick={() => generate("note")}>
            Draft note
          </Button>
          <Button type="button" variant="outline" disabled={generating} onClick={() => generate("faqs")}>
            Draft FAQs
          </Button>
        </div>
        <label>
          Procedure note (blank line between paragraphs)
          <Textarea className="min-h-32" value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
      </section>

      <section className="cms-card space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl">FAQs</h2>
          <Button type="button" variant="outline" onClick={() => setFaqs((rows) => [...rows, { q: "", a: "" }])}>
            Add FAQ
          </Button>
        </div>
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2 border-t border-border pt-4">
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={() => moveFaq(index, -1)}>Up</Button>
              <Button type="button" variant="outline" onClick={() => moveFaq(index, 1)}>Down</Button>
              <Button type="button" variant="outline" onClick={() => setFaqs((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}>
                Delete
              </Button>
            </div>
            <Input
              value={faq.q}
              placeholder={`Question ${index + 1}`}
              onChange={(event) =>
                setFaqs((rows) => rows.map((row, rowIndex) => (rowIndex === index ? { ...row, q: event.target.value } : row)))
              }
            />
            <Textarea
              value={faq.a}
              placeholder="Answer"
              onChange={(event) =>
                setFaqs((rows) => rows.map((row, rowIndex) => (rowIndex === index ? { ...row, a: event.target.value } : row)))
              }
            />
          </div>
        ))}
      </section>

      <section className="cms-card space-y-3" dir="rtl" lang="ar">
        <h2 className="text-xl">معاينة الأسئلة</h2>
        {faqs.map((faq) => (
          <article key={faq.q} className="border-t border-border py-3">
            <h3 className="font-medium">{faq.q || "سؤال بلا نص"}</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{faq.a}</p>
          </article>
        ))}
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" disabled={saving} onClick={save}>
          {saving ? "Saving" : status === "published" ? "Save and publish" : "Save draft"}
        </Button>
        <a href={`/ar${publicPath}`}>Public Arabic URL</a>
        {message ? <p className="text-sm">{message}</p> : null}
      </div>
    </div>
  );
}
