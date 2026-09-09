import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { loadCms, saveCms } from "@/lib/cms/store";

export async function POST(_: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    const store = loadCms();
    const article = store.articles.find((a) => a.id === id);
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    article.status = "draft";
    article.updatedAt = new Date().toISOString();
    saveCms(store);
    return NextResponse.json(article);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not restore.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
