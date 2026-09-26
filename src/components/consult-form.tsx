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
import { useT } from "@/components/locale-provider";
import { hospitals } from "@/lib/hospitals";
import { treatments } from "@/lib/treatments";
import type { ConsultErrorCode } from "@/app/api/consult/route";

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
  const t = useT();
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [errorCode, setErrorCode] = useState<ConsultErrorCode | "submit" | "unknown" | null>(null);
  const [treatment, setTreatment] = useState(defaultTreatment ?? "");
  const [hospital, setHospital] = useState(defaultHospital ?? "");
  const [timeline, setTimeline] = useState("");

  const treatmentOptions = useMemo(() => treatments, []);
  const hospitalOptions = useMemo(() => hospitals, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorCode(null);
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
      setErrorCode("selection");
      return;
    }

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        reference?: string;
        error?: ConsultErrorCode;
      };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorCode(json.error ?? "submit");
        return;
      }
      setReference(json.reference || "");
      setStatus("success");
      form.reset();
      setTreatment("");
      setHospital("");
      setTimeline("");
    } catch {
      setStatus("error");
      setErrorCode("unknown");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <p className="eyebrow">{t("consult.successEyebrow")}</p>
        <h2 className="mt-3 font-heading text-4xl">{t("consult.successTitle")}</h2>
        <p className="prose-gaf mt-4">{t("consult.successBody")}</p>
        <p className="mt-6 font-heading text-3xl tracking-wide text-gold">{reference}</p>
        <Button className="mt-8 h-11 rounded-full px-6" onClick={() => setStatus("idle")}>
          {t("consult.successAgain")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t("consult.name")} htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" className="h-11" />
        </Field>
        <Field label={t("consult.email")} htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11"
          />
        </Field>
        <Field label={t("consult.phone")} htmlFor="phone">
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" className="h-11" />
        </Field>
        <Field label={t("consult.country")} htmlFor="country">
          <Input id="country" name="country" required autoComplete="country-name" className="h-11" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("consult.treatment")}</Label>
          <Select value={treatment || undefined} onValueChange={setTreatment}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder={t("consult.treatmentPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {treatmentOptions.map((t) => (
                <SelectItem key={t.slug} value={t.slug}>
                  {t.name}
                </SelectItem>
              ))}
              <SelectItem value="unsure">{t("consult.treatmentUnsure")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("consult.hospital")}</Label>
          <Select value={hospital || undefined} onValueChange={setHospital}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder={t("consult.hospitalPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">{t("consult.hospitalOpen")}</SelectItem>
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
        <Label>{t("consult.timeline")}</Label>
        <Select value={timeline || undefined} onValueChange={setTimeline}>
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder={t("consult.timelinePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">{t("consult.timelineUrgent")}</SelectItem>
            <SelectItem value="near">{t("consult.timelineNear")}</SelectItem>
            <SelectItem value="plan">{t("consult.timelinePlan")}</SelectItem>
            <SelectItem value="explore">{t("consult.timelineExplore")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Field label={t("consult.notes")} htmlFor="notes">
        <Textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder={t("consult.notesPlaceholder")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-5 shrink-0 accent-[var(--ink)]"
        />
        <span>{t("consult.consent")}</span>
      </label>

      {status === "error" && errorCode ? (
        <p className="text-sm text-destructive" role="alert">
          {t(`consult.error.${errorCode}`)}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 w-full rounded-full px-8 md:w-auto"
      >
        {status === "submitting" ? t("consult.submitting") : t("consult.submit")}
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
