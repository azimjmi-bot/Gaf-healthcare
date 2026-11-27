"use client";

import { useEffect, useRef, useState } from "react";
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
import { useLocale, useT } from "@/components/locale-provider";
import { trackGaEvent } from "@/lib/analytics";
import type { ConsultOption } from "@/lib/consult-options";
import type { ConsultErrorCode } from "@/app/api/consult/route";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXT_RE = /\.(pdf|jpe?g|png|webp)$/i;

export function ConsultForm({
  treatmentOptions,
  hospitalOptions,
  defaultTreatment,
  defaultHospital,
  defaultDoctor,
  locale: localeProp,
}: {
  /** From `consultTreatmentOptions()` / `consultHospitalOptions()` on the server. */
  treatmentOptions: readonly ConsultOption[];
  hospitalOptions: readonly ConsultOption[];
  defaultTreatment?: string;
  defaultHospital?: string;
  defaultDoctor?: string;
  locale?: string;
}) {
  const t = useT();
  const contextLocale = useLocale();
  const activeLocale = localeProp || contextLocale || "en";

  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [errorCode, setErrorCode] = useState<ConsultErrorCode | "submit" | "unknown" | null>(null);
  const [treatment, setTreatment] = useState(defaultTreatment ?? "");
  const [hospital, setHospital] = useState(defaultHospital ?? "");
  const [timeline, setTimeline] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const loadedAtRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    const combined = [...files, ...picked];
    if (combined.length > MAX_FILES) {
      setStatus("error");
      setErrorCode("fileCount");
      e.target.value = "";
      return;
    }
    for (const file of picked) {
      if (!ALLOWED_EXT_RE.test(file.name)) {
        setStatus("error");
        setErrorCode("fileType");
        e.target.value = "";
        return;
      }
      if (file.size <= 0 || file.size > MAX_FILE_BYTES) {
        setStatus("error");
        setErrorCode("fileSize");
        e.target.value = "";
        return;
      }
    }
    setErrorCode(null);
    if (status === "error") setStatus("idle");
    setFiles(combined);
    e.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorCode(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!treatment || !timeline) {
      setStatus("error");
      setErrorCode("selection");
      return;
    }

    const body = new FormData();
    body.set("name", String(data.get("name") || ""));
    body.set("email", String(data.get("email") || ""));
    body.set("phone", String(data.get("phone") || ""));
    body.set("country", String(data.get("country") || ""));
    body.set("treatment", treatment);
    body.set("hospital", hospital);
    body.set("doctor", defaultDoctor ?? "");
    body.set("timeline", timeline);
    body.set("notes", String(data.get("notes") || ""));
    body.set("consent", data.get("consent") === "on" ? "true" : "false");
    body.set("locale", activeLocale);
    body.set("website", String(data.get("website") || ""));
    body.set("formLoadedAt", String(loadedAtRef.current || 0));
    for (const file of files) {
      body.append("reports", file, file.name);
    }

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        body,
      });
      const json = (await res.json()) as {
        ok?: boolean;
        persisted?: boolean;
        reference?: string;
        attachmentCount?: number;
        error?: ConsultErrorCode;
      };
      if (!res.ok || !json.ok || !json.persisted) {
        setStatus("error");
        setErrorCode(json.error ?? "submit");
        if (json.reference) setReference(json.reference);
        return;
      }

      trackGaEvent("consult_form_submit", {
        locale: activeLocale,
        treatment_slug: treatment,
        hospital_slug: hospital || "open",
        doctor_slug: defaultDoctor || undefined,
        timeline,
        has_report_upload: (json.attachmentCount ?? files.length) > 0,
        report_count: json.attachmentCount ?? files.length,
        page_type: "consult",
      });

      setReference(json.reference || "");
      setStatus("success");
      form.reset();
      setTreatment("");
      setHospital("");
      setTimeline("");
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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
              {treatmentOptions.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.name}
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

      <div className="space-y-2">
        <Label htmlFor="reports">{t("consult.reports")}</Label>
        <p className="text-xs leading-relaxed text-muted-foreground">{t("consult.reportsHint")}</p>
        <Input
          ref={fileInputRef}
          id="reports"
          name="reports"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
          onChange={onFileChange}
          className="h-auto cursor-pointer py-2"
          aria-label={t("consult.reportsChoose")}
        />
        {files.length > 0 ? (
          <ul className="mt-2 space-y-1.5 text-sm">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
              >
                <span className="truncate">
                  {file.name} ({Math.max(1, Math.round(file.size / 1024))} KB)
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-xs font-medium text-destructive underline underline-offset-2"
                >
                  {t("consult.reportsRemove")}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

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
          {errorCode === "duplicate" && reference ? ` (${reference})` : ""}
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
