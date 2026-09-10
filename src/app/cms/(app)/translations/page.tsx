import { CmsBulkTranslations } from "@/components/cms/cms-bulk-translations";

export const dynamic = "force-dynamic";

export default function CmsTranslationsPage() {
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Translations</p>
          <h1>Multilingual desk</h1>
        </div>
      </header>
      <p className="cms-muted">
        English stays the source. Stored translations are served from <code>content/translations.json</code>.
        Google Cloud Translation Advanced v3 is only used for missing, outdated, or administrator-forced jobs.
        Do not start a full doctor bulk run unless you intend to spend Google quota.
      </p>
      <CmsBulkTranslations />
    </div>
  );
}
