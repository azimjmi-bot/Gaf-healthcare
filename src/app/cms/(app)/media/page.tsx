import { CmsMediaLibrary } from "@/components/cms/cms-media-library";
import { editionFromCookies } from "@/lib/cms/edition-server";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function CmsMediaPage() {
  const store = loadCms(await editionFromCookies());
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Media</p>
          <h1>Library</h1>
        </div>
      </header>
      <p className="cms-lede">
        Upload one image or several at once. Files land in <code>public/uploads/articles</code> and
        can be used as the featured image or as figures inside an article.
      </p>
      <CmsMediaLibrary initial={store.media} />
    </div>
  );
}
