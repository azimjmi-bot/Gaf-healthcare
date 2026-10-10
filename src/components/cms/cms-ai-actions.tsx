"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AiAction, AiContentType, StudioFields } from "@/lib/ai/types";

export function CmsAiActions({
  contentType,
  recordId,
  doctorSlug,
  hospitalSlug,
  treatmentSlug,
  articleId,
  locale = "en",
  onApply,
}: {
  contentType: AiContentType;
  recordId?: string;
  doctorSlug?: string;
  hospitalSlug?: string;
  treatmentSlug?: string;
  articleId?: string;
  locale?: string;
  onApply: (fields: StudioFields) => void;
}) {
  const [busy, setBusy] = useState<AiAction | null>(null);
  const [message, setMessage] = useState("");

  const actions: Array<[AiAction, string, string]> =
    contentType === "doctor"
      ? [
          ["doctor_bio", "AI Rewrite bio", "Write a 250-300 word bio using only this doctor's CMS profile."],
          ["improve_seo", "AI Check SEO", "Suggest an SEO title and meta description without changing the URL."],
        ]
      : contentType === "hospital"
        ? [
            ["hospital_bio", "AI Rewrite bio", "Write a hospital bio using only this hospital's CMS record."],
            ["improve_seo", "AI Check SEO", "Suggest SEO metadata without changing the URL."],
          ]
        : [
            ["generate", "AI Generate page", "Create structured page copy from the CMS data already linked to this record."],
            ["generate_faqs", "AI Generate FAQs", "Write FAQs using only this record's CMS data."],
            ["improve_seo", "AI Improve SEO", "Suggest title and meta description. Do not change the URL."],
            ["improve_geo", "AI Improve GEO", "Add a direct answer and clearer entity statements from CMS facts only."],
            ["suggest_links", "AI Internal links", "Suggest internal links from the allowed CMS URLs only."],
          ];

  async function run(action: AiAction, instruction: string) {
    setBusy(action);
    setMessage("");
    const res = await fetch("/api/cms/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        contentType,
        instruction,
        locale,
        recordId,
        doctorSlug,
        hospitalSlug,
        treatmentSlug,
        articleId,
      }),
    });
    const data = await res.json();
    setBusy(null);
    if (!res.ok) {
      setMessage(data.error || "AI generation failed. Please try again.");
      return;
    }
    onApply(data.output);
    setMessage(
      data.flags?.length
        ? `Generated with ${data.flags.length} review flag(s). Nothing was saved.`
        : "Generated. Review the fields, then save through the existing CMS button.",
    );
  }

  return (
    <div className="cms-ai-actions">
      <p className="cms-kicker">AI assistant</p>
      <div className="cms-ai-actions__row">
        {actions.map(([action, label, instruction]) => (
          <Button
            key={action}
            type="button"
            variant="outline"
            size="sm"
            disabled={Boolean(busy)}
            onClick={() => void run(action, instruction)}
          >
            {busy === action ? "Generating…" : label}
          </Button>
        ))}
      </div>
      {message ? <p className="cms-muted">{message}</p> : null}
    </div>
  );
}
