import Link from "next/link";
import { CmsCatalogTable } from "@/components/cms/cms-catalog-table";
import { doctorAdminRows } from "@/lib/cms/catalog-admin";

export const dynamic = "force-dynamic";

export default function CmsDoctorsPage() {
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Catalog</p>
          <h1>Doctors</h1>
          <p className="cms-muted">Edits write to content/catalog-cms.json. The Ginger catalog and pSEO helpers stay intact.</p>
        </div>
        <Link href="/cms/doctors/new" className="cms-btn">
          New doctor
        </Link>
      </header>
      <CmsCatalogTable entity="doctors" rows={doctorAdminRows()} />
    </div>
  );
}
