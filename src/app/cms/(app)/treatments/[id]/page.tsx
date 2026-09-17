import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsCuratedTreatmentEditor } from "@/components/cms/cms-curated-treatment-editor";
import type { TreatmentRelationChoice } from "@/components/cms/cms-treatment-relation-picker";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { catalogTreatments } from "@/lib/treatments";
import { COUNTRIES, SPECIALTIES } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export default async function CmsEditCuratedTreatmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = loadCuratedTreatments();
  const treatment = store.treatments.find((row) => row.id === id);
  if (!treatment) notFound();

  const doctorMap = new Map(doctorsForLocale("en").map((row) => [row.slug, row]));
  const hospitalMap = new Map(
    hospitalsForLocale("en").map((row) => [row.slug, row]),
  );
  const costMap = new Map(catalogTreatments.map((row) => [row.slug, row]));
  const curatedMap = new Map(store.treatments.map((row) => [row.slug, row]));
  const initialRelations: Record<
    "doctors" | "hospitals" | "costs" | "related",
    TreatmentRelationChoice[]
  > = {
    doctors: treatment.doctorSlugs.map((slug) => {
      const row = doctorMap.get(slug);
      return {
        value: slug,
        label: row?.name ?? slug,
        meta: row ? `${row.specialty} · ${row.city}` : "Missing record",
      };
    }),
    hospitals: treatment.hospitalSlugs.map((slug) => {
      const row = hospitalMap.get(slug);
      return {
        value: slug,
        label: row?.name ?? slug,
        meta: row ? `${row.city}, ${row.country}` : "Missing record",
      };
    }),
    costs: treatment.costPageSlugs.map((slug) => {
      const row = costMap.get(slug);
      return {
        value: slug,
        label: row?.name ?? slug,
        meta: row?.category ?? "Missing record",
      };
    }),
    related: treatment.relatedTreatmentSlugs.map((slug) => {
      const row = curatedMap.get(slug);
      return {
        value: slug,
        label: row?.translations.en?.name ?? row?.baseName ?? slug,
        meta: row?.specialtySlug ?? "Missing record",
      };
    }),
  };

  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Curated Treatment</p>
          <h1>
            {treatment.baseName ||
              treatment.translations.en?.name ||
              "Untitled Treatment"}
          </h1>
        </div>
        <div className="cms-page__actions">
          <Link href="/cms/treatments">All Treatments</Link>
          {treatment.status === "published" ? (
            <Link href={`/treatments/${treatment.slug}`} target="_blank">
              View English page
            </Link>
          ) : null}
        </div>
      </header>
      <CmsCuratedTreatmentEditor
        initial={treatment}
        specialties={SPECIALTIES}
        destinations={COUNTRIES}
        initialRelations={initialRelations}
      />
    </div>
  );
}
