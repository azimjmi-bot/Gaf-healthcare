"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hospitals, treatments } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

export function ConsultForm({
  defaultTreatment,
  defaultHospital,
  defaultDoctor,
}: {
  defaultTreatment?: string;
  defaultHospital?: string;
  defaultDoctor?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [treatment, setTreatment] = useState(defaultTreatment ?? "");
  const [hospital, setHospital] = useState(defaultHospital ?? "");
  const [timeline, setTimeline] = useState("");

  const treatmentOptions = useMemo(() => treatments, []);
  const hospitalOptions = useMemo(() => hospitals, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      country: String(data.get("country") || ""),
      treatment,
      hospital,
      doctor: defaultDoctor ?? "",
      timeline,
      notes: String(data.get("notes") || ""),
      consent: data.get("consent") === "on",
    };

    if (!payload.treatment || !payload.timeline) {
      setStatus("error");
      setError("Please choose a treatment interest and a travel window.");
      return;
    }

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; reference?: string; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not submit.");
      }
      setReference(json.reference || "");
      setStatus("success");
      form.reset();
      setTreatment("");
      setHospital("");
      setTimeline("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <p className="eyebrow">Received</p>
        <h2 className="mt-3 font-heading text-4xl">Your dossier is in motion.</h2>
        <p className="prose-velora mt-4">
          A coordinator will write within one business day — usually sooner.
          Keep this reference for your records.
        </p>
        <p className="mt-6 font-heading text-3xl tracking-wide text-gold">{reference}</p>
        <Button className="mt-8 h-11 rounded-full px-6" onClick={() => setStatus("idle")}>
          Submit another brief
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" className="h-11" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11"
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" className="h-11" />
        </Field>
        <Field label="Home country" htmlFor="country">
          <Input id="country" name="country" required autoComplete="country-name" className="h-11" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Treatment interest</Label>
          <Select value={treatment || undefined} onValueChange={setTreatment}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Select a pathway" />
            </SelectTrigger>
            <SelectContent>
              {treatmentOptions.map((t) => (
                <SelectItem key={t.slug} value={t.slug}>
                  {t.name}
                </SelectItem>
              ))}
              <SelectItem value="unsure">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Hospital preference</Label>
          <Select value={hospital || undefined} onValueChange={setHospital}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Open to guidance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open — advise me</SelectItem>
              {hospitalOptions.map((h) => (
                <SelectItem key={h.slug} value={h.slug}>
                  {h.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>When would you like to travel?</Label>
        <Select value={timeline || undefined} onValueChange={setTimeline}>
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Choose a window" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">Within 4 weeks</SelectItem>
            <SelectItem value="near">1–3 months</SelectItem>
            <SelectItem value="plan">3–6 months</SelectItem>
            <SelectItem value="explore">Exploring only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Field label="What should we know?" htmlFor="notes">
        <Textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder="Prior procedures, imaging you already have, constraints on travel, companion needs…"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 accent-[var(--ink)]"
        />
        <span>
          I understand Velora is not a hospital, that this is not medical advice,
          and that my details will be used only to prepare a confidential dossier.
        </span>
      </label>

      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 w-full rounded-full px-8 md:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request my dossier"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
