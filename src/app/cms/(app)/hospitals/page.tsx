import Link from "next/link";
import { CmsCatalogTable } from "@/components/cms/cms-catalog-table";
import { hospitalAdminRows } from "@/lib/cms/catalog-admin";

export const dynamic = "force-dynamic";

export default function CmsHospitalsPage() {
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
      <CmsCatalogTable entity="hospitals" rows={hospitalAdminRows()} />
    </div>
  );
}
