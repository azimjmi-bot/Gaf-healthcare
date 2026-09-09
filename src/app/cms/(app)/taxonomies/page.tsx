import { CmsTaxonomyForm } from "@/components/cms/cms-taxonomy-form";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function CmsTaxonomiesPage() {
  const store = loadCms();
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Taxonomies</p>
          <h1>Categories and tags</h1>
        </div>
      </header>
      <CmsTaxonomyForm categories={store.categories} tags={store.tags} />
    </div>
  );
}
