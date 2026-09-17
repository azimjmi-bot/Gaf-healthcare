import Link from "next/link";
import { CmsCatalogTable } from "@/components/cms/cms-catalog-table";
import { doctorAdminRows } from "@/lib/cms/catalog-admin";
import { editionFromCookies } from "@/lib/cms/edition-server";

export const dynamic = "force-dynamic";

export default async function CmsDoctorsPage() {
  const edition = await editionFromCookies();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Catalog</p>
          <h1>Doctors</h1>
          <p className="cms-muted">
            {edition === "en"
              ? "Edits write to content/catalog-cms.json. The Ginger catalog and pSEO helpers stay intact."
              : `${edition.toUpperCase()} overlays write to content/${edition}/catalog-cms.json. Every other language edition stays intact.`}
          </p>
        </div>
        <Link href="/cms/doctors/new" className="cms-btn">
          New doctor
        </Link>
      </header>
      <CmsCatalogTable entity="doctors" rows={doctorAdminRows(edition)} />
    </div>
  );
}
