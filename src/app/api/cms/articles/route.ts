import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { blankArticle, loadCms, saveCms, uniqueSlug } from "@/lib/cms/store";
import type { Article } from "@/lib/cms/types";

export async function GET() {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(loadCms().articles);
}

export async function POST(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const patch = (await request.json().catch(() => ({}))) as Partial<Article>;
  try {
    const store = loadCms();
    const article = blankArticle(store);
    if (patch.title) article.title = patch.title;
    if (patch.slug || patch.title) {
      article.slug = uniqueSlug(store, patch.slug || patch.title || article.slug, article.id);
    }
    article.updatedAt = new Date().toISOString();
    store.articles.unshift(article);
    if (article.category && !store.categories.includes(article.category)) {
      store.categories.push(article.category);
    }
    saveCms(store);
    return NextResponse.json(article);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
