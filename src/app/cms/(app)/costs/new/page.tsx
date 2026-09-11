import Link from "next/link";
import { CmsNewTreatment } from "@/components/cms/cms-new-treatment";
import { takenTreatmentSlugs } from "@/lib/cms/catalog-admin";
import { editionFromCookies } from "@/lib/cms/edition-server";
import { PROCEDURES } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export default async function CmsNewCostPage() {
  const taken = takenTreatmentSlugs(await editionFromCookies());
  const procedures = PROCEDURES.filter((p) => !taken.has(p.slug)).map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Cost sheets</p>
          <h1>Add a sheet</h1>
          <p className="cms-muted">Pick a procedure slug that already exists in taxonomy and does not already have a sheet.</p>
        </div>
        <Link href="/cms/costs">Back</Link>
      </header>
      <CmsNewTreatment procedures={procedures} />
    </div>
  );
}
