import Link from "next/link";
import { CmsNewDoctor } from "@/components/cms/cms-new-doctor";
import { liveHospitalChoices } from "@/lib/cms/catalog-admin";
import { SPECIALTIES } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export default function CmsNewDoctorPage() {
  const hospitals = liveHospitalChoices().map((h) => ({ slug: h.slug, name: h.name, city: h.city }));
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Doctors</p>
          <h1>Add a consultant</h1>
          <p className="cms-muted">Attach to an existing hospital and specialty. No new pSEO slugs are created.</p>
        </div>
        <Link href="/cms/doctors" className="cms-btn cms-btn--ghost">
          Back
        </Link>
      </header>
      <CmsNewDoctor hospitals={hospitals} specialties={SPECIALTIES} />
    </div>
  );
}
