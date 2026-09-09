import { CmsMediaLibrary } from "@/components/cms/cms-media-library";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function CmsMediaPage() {
  const store = loadCms();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Media</p>
          <h1>Library</h1>
        </div>
      </header>
      <p className="cms-lede">
        Uploads land in <code>public/uploads/articles</code> and can be attached as featured images
        or in-body figures. CMS photos for doctors stay a later step.
      </p>
      <CmsMediaLibrary initial={store.media} />
    </div>
  );
}
