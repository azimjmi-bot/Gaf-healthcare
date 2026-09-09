import { notFound } from "next/navigation";
import { CmsArticleEditor } from "@/components/cms/cms-article-editor";
import { loadCms } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function CmsEditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = loadCms();
  const article = store.articles.find((a) => a.id === id);
  if (!article) notFound();
  return <CmsArticleEditor initial={article} store={store} />;
}
