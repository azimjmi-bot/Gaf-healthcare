import Link from "next/link";
import { CmsCatalogTable } from "@/components/cms/cms-catalog-table";
import { hospitalAdminRows } from "@/lib/cms/catalog-admin";
import { editionFromCookies } from "@/lib/cms/edition-server";

export const dynamic = "force-dynamic";

export default async function CmsHospitalsPage() {
  const edition = await editionFromCookies();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Catalog</p>
          <h1>Hospitals</h1>
          <p className="cms-muted">Bios and campus photos live in the overlay. Taxonomy slugs are not rewritten.</p>
        </div>
        <Link href="/cms/hospitals/new" className="cms-btn">
          New hospital
        </Link>
      </header>
      <CmsCatalogTable entity="hospitals" rows={hospitalAdminRows(edition)} />
    </div>
  );
}
