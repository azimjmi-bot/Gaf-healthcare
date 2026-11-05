import { runPackPreview } from "../../src/lib/storage/pack-preview-cli";

runPackPreview(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
