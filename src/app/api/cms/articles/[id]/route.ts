import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCms, saveCms, uniqueSlug } from "@/lib/cms/store";
import type { Article } from "@/lib/cms/types";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, ctx: Ctx) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const article = loadCms(editionFromRequest(request)).articles.find((a) => a.id === id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(request: Request, ctx: Ctx) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const edition = editionFromRequest(request);
  const patch = (await request.json().catch(() => null)) as Partial<Article> | null;
  if (!patch) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  try {
    const store = loadCms(edition);
    const index = store.articles.findIndex((a) => a.id === id);
    if (index < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const current = store.articles[index];
    const next: Article = {
      ...current,
      ...patch,
      id: current.id,
      updatedAt: new Date().toISOString(),
    };
    if (patch.slug && patch.slug !== current.slug) {
      next.slug = uniqueSlug(store, patch.slug, current.id);
    }
    if (next.status === "published" && !next.publishedAt) {
      next.publishedAt = new Date().toISOString();
    }
    store.articles[index] = next;
    if (next.category && !store.categories.includes(next.category)) store.categories.push(next.category);
    for (const tag of next.tags) {
      if (tag && !store.tags.includes(tag)) store.tags.push(tag);
    }
    saveCms(store, edition);
    return NextResponse.json(next);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: Ctx) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const edition = editionFromRequest(request);
  try {
    const store = loadCms(edition);
    const article = store.articles.find((a) => a.id === id);
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (article.status === "trash") {
      store.articles = store.articles.filter((a) => a.id !== id);
    } else {
      article.status = "trash";
      article.updatedAt = new Date().toISOString();
    }
    saveCms(store, edition);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
