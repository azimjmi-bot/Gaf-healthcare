import Link from "next/link";
import { CmsNewHospital } from "@/components/cms/cms-new-hospital";
import { INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export default function CmsNewHospitalPage() {
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Hospitals</p>
          <h1>Add a campus</h1>
          <p className="cms-muted">City and specialty must already exist on the India taxonomy.</p>
        </div>
        <Link href="/cms/hospitals">Back</Link>
      </header>
      <CmsNewHospital cities={INDIA_CITIES} specialties={SPECIALTIES} />
    </div>
  );
}
