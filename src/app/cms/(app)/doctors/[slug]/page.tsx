import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsDoctorEditor } from "@/components/cms/cms-doctor-editor";
import { getAdminDoctor } from "@/lib/cms/catalog-admin";
import { editionFromCookies } from "@/lib/cms/edition-server";

export const dynamic = "force-dynamic";

export default async function CmsEditDoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = getAdminDoctor(slug, await editionFromCookies());
  if (!doctor) notFound();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Doctors</p>
          <h1>{doctor.name}</h1>
        </div>
        <div className="cms-page__actions">
          <Link href="/cms/doctors">All doctors</Link>
          {doctor.deleted ? null : (
            <Link href={`/doctors/${doctor.slug}`} target="_blank">
              View live
            </Link>
          )}
        </div>
      </header>
      <CmsDoctorEditor initial={doctor} />
    </div>
  );
}
