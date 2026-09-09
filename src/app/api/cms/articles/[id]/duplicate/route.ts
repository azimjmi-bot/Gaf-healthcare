import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { loadCms, saveCms, uniqueSlug } from "@/lib/cms/store";
import { newId } from "@/lib/cms/types";

export async function POST(_: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    const store = loadCms();
    const source = store.articles.find((a) => a.id === id);
    if (!source) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const copy = {
      ...structuredClone(source),
      id: newId("art"),
      slug: uniqueSlug(store, `${source.slug}-copy`),
      title: source.title ? `${source.title} (copy)` : "Untitled copy",
      status: "draft" as const,
      featured: false,
      updatedAt: new Date().toISOString(),
    };
    store.articles.unshift(copy);
    saveCms(store);
    return NextResponse.json(copy);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not duplicate.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
