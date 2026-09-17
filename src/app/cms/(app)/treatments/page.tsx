import Link from "next/link";
import { CmsCuratedTreatmentTable } from "@/components/cms/cms-curated-treatment-table";
import { loadCuratedTreatments } from "@/lib/cms/curated-treatment-store";

export const dynamic = "force-dynamic";

export default function CmsTreatmentsPage() {
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Editorial entities</p>
          <h1>Treatments</h1>
          <p className="cms-muted">
            One curated Treatment holds shared relationships and five independent
            language versions. It never generates destination or specialty pages.
          </p>
        </div>
        <Link href="/cms/treatments/new" className="cms-btn">
          New Treatment
        </Link>
      </header>
      <CmsCuratedTreatmentTable
        treatments={loadCuratedTreatments().treatments}
      />
    </div>
  );
}
