import { notFound } from "next/navigation";
import { CmsSpecialtyPageEditor } from "@/components/cms/cms-specialty-page-editor";
import { getEditableSpecialtyPage } from "@/data/specialty-pages";
import { editionFromCookies } from "@/lib/cms/edition-server";
import { COUNTRIES, getSpecialty } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export default async function CmsSpecialtyPageEditorPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await params;
  const page = getEditableSpecialtyPage(
    country,
    slug,
    await editionFromCookies(),
  );
  if (!page) notFound();
  const specialty = getSpecialty(slug);
  const countryRecord = COUNTRIES.find((item) => item.slug === country);
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Specialty page</p>
          <h1>{specialty?.name ?? slug} · {countryRecord?.name ?? country}</h1>
          <p>
            Editorial fields override the coded baseline. Catalog procedures, prices,
            doctors, hospitals and city counts remain relationship-driven.
          </p>
        </div>
      </header>
      <CmsSpecialtyPageEditor initial={page} />
    </div>
  );
}
