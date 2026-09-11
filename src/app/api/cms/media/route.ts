import { mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCms, saveCms } from "@/lib/cms/store";
import { newId } from "@/lib/cms/types";

const DIR = join(process.cwd(), "public/uploads/articles");

function safeName(name: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
  return base || "upload";
}

export async function GET(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(loadCms(editionFromRequest(request)).media);
}

export async function POST(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a file." }, { status: 400 });
  }
  try {
    mkdirSync(DIR, { recursive: true });
    const ext = file.name.includes(".") ? `.${file.name.split(".").pop()?.toLowerCase()}` : "";
    const allowed = [".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: "Use WebP, JPG, PNG, GIF or SVG." }, { status: 400 });
    }
    const filename = `${Date.now()}-${safeName(file.name.replace(/\.[^.]+$/, ""))}${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    writeFileSync(join(DIR, filename), buf);
    const item = {
      id: newId("media"),
      url: `/uploads/articles/${filename}`,
      name: file.name,
      alt: form?.get("alt")?.toString() || "",
      addedAt: new Date().toISOString(),
    };
    const edition = editionFromRequest(request);
    const store = loadCms(edition);
    store.media.unshift(item);
    saveCms(store, edition);
    return NextResponse.json(item);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireCmsSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = (await request.json().catch(() => ({}))) as { id?: string };
  try {
    const edition = editionFromRequest(request);
    const store = loadCms(edition);
    const item = store.media.find((m) => m.id === id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    store.media = store.media.filter((m) => m.id !== id);
    saveCms(store, edition);
    if (item.url.startsWith("/uploads/articles/")) {
      try {
        unlinkSync(join(process.cwd(), "public", item.url));
      } catch {
        /* already gone */
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
