import { requireCmsSession } from "@/lib/cms/auth";
import { consultStore } from "@/lib/consult-store";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CmsLeadsPage() {
  try {
    await requireCmsSession();
  } catch {
    redirect("/cms/login");
  }

  const leads = await consultStore().listLeads(100);

  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Coordinator Inbox</p>
          <h1>Consultation leads</h1>
        </div>
        <span className="cms-muted">{leads.length} stored dossiers (90-day retention)</span>
      </header>

      {leads.length === 0 ? (
        <p className="cms-muted">No consultation dossiers have been submitted yet.</p>
      ) : (
        <table className="cms-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Patient</th>
              <th>Interest &amp; Timeline</th>
              <th>Reports</th>
              <th>Notification</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <strong>{lead.reference}</strong>
                  <div className="cms-muted">{lead.locale.toUpperCase()} · {lead.status}</div>
                </td>
                <td>
                  <div>{lead.name}</div>
                  <div className="cms-muted">{lead.country}</div>
                  <div className="cms-muted">{lead.email} · {lead.phone}</div>
                </td>
                <td>
                  <div>{lead.treatment}</div>
                  <div className="cms-muted">
                    {lead.hospital || "open"} · {lead.timeline}
                    {lead.doctor ? ` · ${lead.doctor}` : ""}
                  </div>
                </td>
                <td>
                  {lead.attachments.length === 0 ? (
                    <span className="cms-muted">None</span>
                  ) : (
                    <ul>
                      {lead.attachments.map((file) => (
                        <li key={file.fileId}>
                          <a
                            href={`/api/cms/leads/${encodeURIComponent(lead.id)}/report?fileId=${encodeURIComponent(file.fileId)}`}
                            className="underline"
                          >
                            {file.originalName} ({Math.max(1, Math.round(file.size / 1024))} KB)
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>
                  <div>{lead.notification.channel}</div>
                  <div className="cms-muted">{lead.notification.status}</div>
                </td>
                <td className="cms-muted">{lead.createdAt.slice(0, 16).replace("T", " ")} UTC</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
