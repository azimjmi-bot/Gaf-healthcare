import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { loadPreviewConfig } from "@/lib/storage/pack-preview-cli";
import { contentTypeFor } from "@/lib/storage/r2";
import { assertPreviewTarget, PREVIEW_STATIC_BUCKET_NAME, PreviewPackError } from "@/lib/storage/packed-edition";

export type PreviewStaticObject = {
  key: string;
  file: string;
  bytes: number;
  contentType: string;
};

export type PreviewStaticPlan = {
  bucket: typeof PREVIEW_STATIC_BUCKET_NAME;
  objects: PreviewStaticObject[];
  fileCount: number;
  totalBytes: number;
  directories: string[];
};

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".") || entry === ".gitkeep") continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

/**
 * CMS media is `public/uploads/**`. The Worker stores those objects as
 * `uploads/**` and serves them at `/uploads/**`. Other `public/` files ship
 * in the Worker ASSETS binding and are not copied into R2.
 */
export function planPreviewStatic(uploadsRoot: string): PreviewStaticPlan {
  const objects: PreviewStaticObject[] = [];
  const directories = new Set<string>();
  for (const full of walk(uploadsRoot)) {
    const relative = path.relative(uploadsRoot, full).split(path.sep).join("/");
    const key = `uploads/${relative}`;
    if (!key.startsWith("uploads/") || key.split("/").some((part) => part === "" || part === "." || part === "..")) {
      throw new PreviewPackError(`refusing unsafe static key ${key}`);
    }
    const directory = path.posix.dirname(relative);
    if (directory !== ".") directories.add(`public/uploads/${directory}`);
    const bytes = statSync(full).size;
    objects.push({ key, file: full, bytes, contentType: contentTypeFor(key) });
  }
  objects.sort((a, b) => (a.key < b.key ? -1 : 1));
  return {
    bucket: PREVIEW_STATIC_BUCKET_NAME,
    objects,
    fileCount: objects.length,
    totalBytes: objects.reduce((total, object) => total + object.bytes, 0),
    directories: [...directories].sort(),
  };
}

export type PreviewStaticUploader = (bucket: string, key: string, body: Uint8Array, contentType: string) => Promise<void>;

/**
 * Seed `public/uploads/` into `gaf-static-preview`. `--dry-run` is the default.
 * `--upload` also requires `GAF_PREVIEW_STATIC_CONFIRM=gaf-static-preview`.
 * Puts only. Never deletes. There is no default config.
 */
export async function runPreviewStaticSeed(
  argv: string[],
  options?: { uploader?: PreviewStaticUploader; env?: NodeJS.ProcessEnv; uploadsRoot?: string },
): Promise<PreviewStaticPlan> {
  let configPath: string | null = null;
  let uploadsRoot = options?.uploadsRoot ?? path.join(process.cwd(), "public", "uploads");
  let upload = false;
  let dryRun = false;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--config" || arg === "--uploads") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new PreviewPackError(`${arg} requires a value`);
      if (arg === "--config") configPath = path.resolve(value);
      if (arg === "--uploads") uploadsRoot = path.resolve(value);
      index += 1;
    } else if (arg === "--upload") upload = true;
    else if (arg === "--dry-run") dryRun = true;
    else throw new PreviewPackError(`unknown argument ${arg}`);
  }
  if (!configPath) throw new PreviewPackError("refusing to choose a bucket: pass --config wrangler.preview.jsonc");
  const config = loadPreviewConfig(configPath);
  assertPreviewTarget(config);
  const staticBucket = config.r2_buckets?.find((bucket) => bucket.binding === "STATIC")?.bucket_name;
  if (staticBucket !== PREVIEW_STATIC_BUCKET_NAME) {
    throw new PreviewPackError(`refusing static target ${staticBucket ?? "(missing)"}`);
  }
  const plan = planPreviewStatic(uploadsRoot);
  const confirmedDryRun = dryRun || !upload;
  console.log(
    JSON.stringify({
      bucket: plan.bucket,
      files: plan.fileCount,
      bytes: plan.totalBytes,
      directories: plan.directories,
      upload: !confirmedDryRun,
    }),
  );
  if (confirmedDryRun) {
    console.log("dry-run: no objects uploaded");
    return plan;
  }
  const env = options?.env ?? process.env;
  if (env.GAF_PREVIEW_STATIC_CONFIRM !== PREVIEW_STATIC_BUCKET_NAME) {
    throw new PreviewPackError(`refusing upload until GAF_PREVIEW_STATIC_CONFIRM=${PREVIEW_STATIC_BUCKET_NAME}`);
  }
  const uploader = options?.uploader ?? putPreviewStaticObject;
  for (const object of plan.objects) {
    await uploader(PREVIEW_STATIC_BUCKET_NAME, object.key, new Uint8Array(readFileSync(object.file)), object.contentType);
  }
  console.log(`uploaded ${plan.fileCount} objects to ${PREVIEW_STATIC_BUCKET_NAME}`);
  return plan;
}

async function putPreviewStaticObject(bucket: string, key: string, body: Uint8Array, contentType: string) {
  if (bucket !== PREVIEW_STATIC_BUCKET_NAME) throw new PreviewPackError(`refusing upload to ${bucket}`);
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!account || !token) throw new PreviewPackError("CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required to upload");
  const encoded = key.split("/").map((part) => encodeURIComponent(part)).join("/");
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/r2/buckets/${bucket}/objects/${encoded}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType },
    body: Buffer.from(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new PreviewPackError(`put ${bucket}/${key} failed: ${response.status} ${text.slice(0, 180)}`);
  }
  await response.arrayBuffer();
}
