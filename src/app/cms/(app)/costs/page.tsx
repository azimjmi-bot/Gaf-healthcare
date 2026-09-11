import Link from "next/link";
import { CmsCatalogTable } from "@/components/cms/cms-catalog-table";
import { treatmentAdminRows } from "@/lib/cms/catalog-admin";
import { editionFromCookies } from "@/lib/cms/edition-server";

export const dynamic = "force-dynamic";

export default async function CmsCostsPage() {
  const edition = await editionFromCookies();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Catalog</p>
          <h1>Cost sheets</h1>
          <p className="cms-muted">Planning ranges, notes, campuses and optional body copy. Coded EBRT/3D-CRT guides stay until you replace them.</p>
        </div>
        <Link href="/cms/costs/new" className="cms-btn">
          New cost sheet
        </Link>
      </header>
      <CmsCatalogTable entity="treatments" rows={treatmentAdminRows(edition)} />
    </div>
  );
}
