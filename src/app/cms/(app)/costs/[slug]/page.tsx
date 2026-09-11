import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsTreatmentEditor } from "@/components/cms/cms-treatment-editor";
import { getAdminTreatment } from "@/lib/cms/catalog-admin";
import { editionFromCookies } from "@/lib/cms/edition-server";

export const dynamic = "force-dynamic";

export default async function CmsEditCostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = getAdminTreatment(slug, await editionFromCookies());
  if (!treatment) notFound();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Cost sheets</p>
          <h1>{treatment.name}</h1>
        </div>
        <div className="cms-page__actions">
          <Link href="/cms/costs">All sheets</Link>
          {treatment.deleted ? null : (
            <Link href={`/costs/${treatment.slug}`} target="_blank">
              View live
            </Link>
          )}
        </div>
      </header>
      <CmsTreatmentEditor initial={treatment} />
    </div>
  );
}
