import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsHospitalEditor } from "@/components/cms/cms-hospital-editor";
import { getAdminHospital } from "@/lib/cms/catalog-admin";
import { editionFromCookies } from "@/lib/cms/edition-server";

export const dynamic = "force-dynamic";

export default async function CmsEditHospitalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hospital = getAdminHospital(slug, await editionFromCookies());
  if (!hospital) notFound();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Hospitals</p>
          <h1>{hospital.name}</h1>
        </div>
        <div className="cms-page__actions">
          <Link href="/cms/hospitals">All hospitals</Link>
          {hospital.deleted ? null : (
            <Link href={`/hospitals/${hospital.slug}`} target="_blank">
              View live
            </Link>
          )}
        </div>
      </header>
      <CmsHospitalEditor initial={hospital} />
    </div>
  );
}
