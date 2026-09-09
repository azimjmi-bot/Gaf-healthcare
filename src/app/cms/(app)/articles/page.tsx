import Link from "next/link";
import { CmsArticleTable } from "@/components/cms/cms-article-table";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function CmsArticlesPage() {
  const store = loadCms();
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
