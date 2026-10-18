import Link from "next/link";
import { radiationProcedureAdminRows } from "@/lib/cms/radiation-procedure-admin";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

export const dynamic = "force-dynamic";

export default function CmsRadiationProceduresPage() {
  const rows = radiationProcedureAdminRows();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Radiation oncology</p>
          <h1>Procedure pages</h1>
          <p>
            Arabic long-form pages for the India radiation-oncology directory. The reviewed baseline
            is already on the public URL. Saving a draft hides that article and leaves the doctor
            directory in place. Doctor and hospital links stay on catalog relationships.
          </p>
        </div>
      </header>
      <div className="cms-card">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Procedure</th>
              <th>Kind</th>
              <th>FAQs</th>
              <th>Overlay</th>
              <th>Public long form</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug}>
                <td>
                  {taxonomyLabel(row.procedure, "ar")}
                  <div className="text-sm text-muted-foreground">{row.procedure}</div>
                </td>
                <td>{row.kind}</td>
                <td>{row.faqCount}</td>
                <td>{row.overlayStatus}</td>
                <td>{row.live ? "Showing" : "Withheld"}</td>
                <td>
                  <Link href={`/cms/radiation-procedures/${row.slug}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
