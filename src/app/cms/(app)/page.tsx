import Link from "next/link";
import { loadCatalogCms } from "@/lib/cms/catalog-store";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function CmsDashboardPage() {
  const store = loadCms();
  const catalog = loadCatalogCms();
  const live = store.articles.filter((a) => a.status === "published").length;
  const drafts = store.articles.filter((a) => a.status === "draft").length;
  const trash = store.articles.filter((a) => a.status === "trash").length;
  const recent = [...store.articles]
    .filter((a) => a.status !== "trash")
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 8);
  const doctorEdits = Object.keys(catalog.doctorOverrides).length + catalog.doctorsAdded.length;
  const hospitalEdits = Object.keys(catalog.hospitalOverrides).length + catalog.hospitalsAdded.length;
  const costEdits = Object.keys(catalog.treatmentOverrides).length + catalog.treatmentsAdded.length;

  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Dashboard</p>
          <h1>Editorial desk</h1>
        </div>
        <Link href="/cms/articles/new" className="cms-btn">
          New article
        </Link>
      </header>
      <ul className="cms-stats">
        <li>
          <strong>{live}</strong>
          Published articles
        </li>
        <li>
          <strong>{drafts}</strong>
          Drafts
        </li>
        <li>
          <strong>{trash}</strong>
          Trash
        </li>
        <li>
          <strong>{store.media.length}</strong>
          Media files
        </li>
        <li>
          <strong>{doctorEdits}</strong>
          Doctor overlays
        </li>
        <li>
          <strong>{hospitalEdits}</strong>
          Hospital overlays
        </li>
        <li>
          <strong>{costEdits}</strong>
          Cost overlays
        </li>
      </ul>
      <p className="cms-muted">
        Catalog edits sit in <code>content/catalog-cms.json</code>. They do not rewrite the Ginger
        catalog or pSEO matching helpers.
      </p>
      <h2>Recently edited articles</h2>
      <table className="cms-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((a) => (
            <tr key={a.id}>
              <td>
                <Link href={`/cms/articles/${a.id}`}>{a.title || "Untitled"}</Link>
              </td>
              <td>{a.status}</td>
              <td>{a.updatedAt.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
