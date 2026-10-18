import "server-only";

import { doctorsPath } from "@/lib/catalog-links";
import type { RadiationProcedurePagePatch } from "@/lib/cms/catalog-types";
import {
  RADIATION_PROCEDURE_PAGES_AR,
  radiationProcedurePatch,
} from "@/lib/i18n/ar-radiation-procedure";
import { applyRadiationProcedurePatch, procedureCopyIssues } from "@/lib/i18n/radiation-procedure-page";
import { getProcedure, RADIATION_PROCEDURES } from "@/lib/taxonomy";

const SPECIALTY = "Radiation Oncology";

export type RadiationProcedureAdminRow = {
  slug: string;
  procedure: string;
  kind: string;
  faqCount: number;
  overlayStatus: "none" | "draft" | "published";
  live: boolean;
  issues: string[];
  publicPath: string;
};

export function radiationProcedureAdminRows(): RadiationProcedureAdminRow[] {
  return RADIATION_PROCEDURES.map((procedure) => {
    const copy = RADIATION_PROCEDURE_PAGES_AR[procedure];
    const slug = getProcedure(procedure)?.slug ?? "";
    const patch = slug ? radiationProcedurePatch(procedure) : undefined;
    const merged = copy ? applyRadiationProcedurePatch(copy, patch) : undefined;
    const issues = merged ? procedureCopyIssues(merged) : ["missing baseline"];
    const overlayStatus = patch?.status === "published" || patch?.status === "draft" ? patch.status : "none";
    return {
      slug,
      procedure,
      kind: copy?.kind ?? "",
      faqCount: merged?.faqs.length ?? 0,
      overlayStatus,
      live: overlayStatus === "published" && issues.length === 0,
      issues,
      publicPath: doctorsPath({ destination: "India", specialty: SPECIALTY, procedure }),
    };
  });
}

export function radiationProcedureEditorModel(slug: string) {
  const taxon = getProcedure(slug);
  if (!taxon || !(RADIATION_PROCEDURES as readonly string[]).includes(taxon.name)) return undefined;
  const baseline = RADIATION_PROCEDURE_PAGES_AR[taxon.name];
  if (!baseline) return undefined;
  return {
    slug: taxon.slug,
    procedure: taxon.name,
    kind: baseline.kind,
    publicPath: doctorsPath({ destination: "India", specialty: SPECIALTY, procedure: taxon.name }),
    baseline: {
      h1: baseline.h1,
      description: baseline.description,
      quickAnswer: baseline.quickAnswer,
      note: baseline.note,
      faqs: baseline.faqs,
      markers: baseline.markers,
    },
    patch: radiationProcedurePatch(taxon.name) ?? null,
  };
}

export function publishableRadiationPatch(procedureName: string, patch: RadiationProcedurePagePatch) {
  const baseline = RADIATION_PROCEDURE_PAGES_AR[procedureName];
  if (!baseline) return { ok: false as const, issues: ["unknown procedure"] };
  const issues = procedureCopyIssues(applyRadiationProcedurePatch(baseline, patch));
  if (patch.status === "published" && issues.length > 0) return { ok: false as const, issues };
  return { ok: true as const, issues };
}
