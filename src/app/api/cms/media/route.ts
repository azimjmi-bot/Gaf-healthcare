import { NextResponse } from "next/server";
import { requireCmsSession } from "@/lib/cms/auth";
import { editionFromRequest } from "@/lib/cms/edition";
import { loadCms, saveCms } from "@/lib/cms/store";
import { newId } from "@/lib/cms/types";
import { deleteCmsMediaRecord } from "@/lib/cms/media-removal";
import { contentStorage, flushContentWrites, storageErrorStatus } from "@/lib/storage";

/** Public URL prefix of uploads; the storage key is `public` + this prefix + file. */
const UPLOADS_URL_PREFIX = "/uploads/articles/";

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
    const ext = file.name.includes(".") ? `.${file.name.split(".").pop()?.toLowerCase()}` : "";
    const allowed = [".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: "Use WebP, JPG, PNG, GIF or SVG." }, { status: 400 });
    }
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Keep images under 8 MB." }, { status: 400 });
    }
    const filename = `${Date.now()}-${safeName(file.name.replace(/\.[^.]+$/, ""))}${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    const url = `${UPLOADS_URL_PREFIX}${filename}`;
    contentStorage().write(`public${url}`, buf);
    const item = {
      id: newId("media"),
      url,
      name: file.name,
      alt: form?.get("alt")?.toString() || "",
      addedAt: new Date().toISOString(),
    };
    const edition = editionFromRequest(request);
    const store = loadCms(edition);
    store.media.unshift(item);
    saveCms(store, edition);
    await flushContentWrites();
    return NextResponse.json(item);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: storageErrorStatus(err) });
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
    const removed = await deleteCmsMediaRecord(edition, id);
    if (!removed.ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await flushContentWrites();
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not delete.";
    return NextResponse.json({ error: message }, { status: storageErrorStatus(err) });
  }
}
