import Link from "next/link";
import {
  getEditableSpecialtyPage,
  listSpecialtyPageCandidates,
} from "@/data/specialty-pages";
import { editionFromCookies } from "@/lib/cms/edition-server";
import { COUNTRIES, getSpecialty } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export default async function CmsSpecialtyPages() {
  const edition = await editionFromCookies();
  const pages = listSpecialtyPageCandidates().map(
    (page) =>
      getEditableSpecialtyPage(
        page.countrySlug,
        page.specialtySlug,
        edition,
      ) ?? page,
  );
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Entity hubs</p>
          <h1>Specialty pages</h1>
          <p>
            Editorial specialty-country content is managed here. Procedure, doctor,
            hospital, city and price data remain dynamic catalog relationships.
          </p>
        </div>
      </header>
      <div className="cms-card">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Specialty</th>
              <th>Country</th>
              <th>Status</th>
              <th>Indexing</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => {
              const specialty = getSpecialty(page.specialtySlug);
              const country = COUNTRIES.find((item) => item.slug === page.countrySlug);
              return (
                <tr key={`${page.countrySlug}/${page.specialtySlug}`}>
                  <td>{specialty?.name ?? page.specialtySlug}</td>
                  <td>{country?.name ?? page.countrySlug}</td>
                  <td>{page.status}</td>
                  <td>{page.allowIndex ? "Index" : "Noindex"}</td>
                  <td>
                    <Link href={`/cms/specialties/${page.countrySlug}/${page.specialtySlug}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
