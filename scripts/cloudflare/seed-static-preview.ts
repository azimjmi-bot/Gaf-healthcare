import { runPreviewStaticSeed } from "../../src/lib/storage/preview-static-cli";

runPreviewStaticSeed(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
