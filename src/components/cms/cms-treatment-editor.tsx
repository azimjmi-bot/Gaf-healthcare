"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
import type { Treatment } from "@/lib/treatments";
import { emptyParagraph, type ArticleBlock } from "@/lib/cms/types";

/** Slugs with a coded long-form cost article. Keep in sync with `src/data/cost-articles`. */
const LONGFORM_COST_SLUGS = new Set([
  "breast-conserving-surgery-lumpectomy",
  "mastectomy",
  "nipple-sparing-mastectomy",
  "oncoplastic-breast-surgery",
]);

export function CmsTreatmentEditor({ initial }: { initial: Treatment & { deleted?: boolean; added?: boolean } }) {
  const [row, setRow] = useState({
    ...initial,
    includesText: (initial.includes || []).join("\n"),
    conditionsText: (initial.conditions || []).join("\n"),
    hospitalsText: (initial.hospitalSlugs || []).join("\n"),
    bodyText: (initial.blocks || [])
      .map((b) => (b.type === "paragraph" ? b.text : b.type === "heading" ? `## ${b.text}` : ""))
      .filter(Boolean)
      .join("\n\n"),
  });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function blocksFromText(text: string): ArticleBlock[] {
    return text
      .split(/\n{2,}/)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        if (chunk.startsWith("## ")) {
          return { id: emptyParagraph().id, type: "heading" as const, level: 2 as const, text: chunk.slice(3) };
        }
        return { ...emptyParagraph(), text: chunk };
      });
  }

  async function save() {
    setBusy(true);
    const res = await fetch(`/api/cms/catalog/treatments/${row.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: row.name,
        summary: row.summary,
        notes: row.notes,
        usRange: row.usRange,
        partnerRange: row.partnerRange,
        stay: row.stay,
        image: row.image,
        includes: row.includesText.split("\n").map((s) => s.trim()).filter(Boolean),
        conditions: row.conditionsText.split("\n").map((s) => s.trim()).filter(Boolean),
        hospitalSlugs: row.hospitalsText.split("\n").map((s) => s.trim()).filter(Boolean),
        blocks: blocksFromText(row.bodyText),
        replaceGuide: row.replaceGuide || false,
      }),
    });
    const data = await res.json();
    setBusy(false);
    setMessage(res.ok ? "Saved. The public cost page uses these fields." : data.error || "Save failed.");
  }

  return (
    <div className="cms-form">
      <p className="cms-muted">
        /costs/{row.slug} · {row.category}
      </p>
      {LONGFORM_COST_SLUGS.has(row.slug) ? (
        <p className="cms-flash">
          A long-form cost guide is coded for this procedure. India range, US range, stay, summary and
          inclusions on this sheet feed that page. Edit costing here; leave &quot;Replace coded guide&quot;
          unchecked unless you intend to swap the guide for the body field below.
        </p>
      ) : null}
      <label>
        Name
        <Input value={row.name} onChange={(e) => setRow({ ...row, name: e.target.value })} />
      </label>
      <label>
        Summary
        <Textarea value={row.summary} rows={5} onChange={(e) => setRow({ ...row, summary: e.target.value })} />
      </label>
      <label>
        Notes
        <Textarea value={row.notes} rows={4} onChange={(e) => setRow({ ...row, notes: e.target.value })} />
      </label>
      <label>
        US cash range
        <Input value={row.usRange} onChange={(e) => setRow({ ...row, usRange: e.target.value })} />
      </label>
      <label>
        India planning range
        <Input value={row.partnerRange} onChange={(e) => setRow({ ...row, partnerRange: e.target.value })} />
      </label>
      <label>
        Stay
        <Input value={row.stay} onChange={(e) => setRow({ ...row, stay: e.target.value })} />
      </label>
      <label>
        Typically included (one per line)
        <textarea className="cms-plain" value={row.includesText} onChange={(e) => setRow({ ...row, includesText: e.target.value })} />
      </label>
      <label>
        Conditions (one per line)
        <textarea className="cms-plain" value={row.conditionsText} onChange={(e) => setRow({ ...row, conditionsText: e.target.value })} />
      </label>
      <label>
        Hospital slugs (one per line)
        <textarea className="cms-plain" value={row.hospitalsText} onChange={(e) => setRow({ ...row, hospitalsText: e.target.value })} />
      </label>
      <label>
        Page body (paragraphs separated by a blank line; `## heading` for H2)
        <textarea className="cms-plain" value={row.bodyText} onChange={(e) => setRow({ ...row, bodyText: e.target.value })} />
      </label>
      <label className="cms-check">
        <input
          type="checkbox"
          checked={Boolean(row.replaceGuide)}
          onChange={(e) => setRow({ ...row, replaceGuide: e.target.checked })}
        />
        Replace the coded long-form cost guide with this body when published
      </label>
      <CmsImageUpload
        label="Hero photo"
        src={row.image || ""}
        alt={row.name}
        onChange={(image) => setRow((r) => ({ ...r, image }))}
        onError={setMessage}
      />
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" disabled={busy} onClick={() => void save()}>
        Save cost sheet
      </Button>
    </div>
  );
}
