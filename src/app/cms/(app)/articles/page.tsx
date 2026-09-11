import Link from "next/link";
import { CmsArticleTable } from "@/components/cms/cms-article-table";
import { editionFromCookies } from "@/lib/cms/edition-server";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function CmsArticlesPage() {
  const store = loadCms(await editionFromCookies());
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Articles</p>
          <h1>All articles</h1>
        </div>
        <Link href="/cms/articles/new" className="cms-btn">
          New article
        </Link>
      </header>
      <CmsArticleTable articles={store.articles} />
    </div>
  );
}
