import { CmsSettingsForm } from "@/components/cms/cms-settings-form";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function CmsSettingsPage() {
  const store = loadCms();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Settings</p>
          <h1>Reading and defaults</h1>
        </div>
      </header>
      <CmsSettingsForm initial={store.settings} />
    </div>
  );
}
