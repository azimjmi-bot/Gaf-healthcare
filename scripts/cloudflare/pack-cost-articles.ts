/**
 * Writes the cost-article corpus as one JSON object for the Worker asset.
 * Hostinger never reads this file; it still imports the TypeScript modules.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { encodeCostArticlePack } from "../../src/data/cost-articles/pack";
import { costArticles } from "../../src/data/cost-articles/static-registry";

const destination = process.argv[2];
if (!destination) {
  console.error("usage: pack-cost-articles.ts <destination.json>");
  process.exit(1);
}

const packed = encodeCostArticlePack(costArticles);
mkdirSync(path.dirname(destination), { recursive: true });
writeFileSync(destination, packed);
console.log(
  `[cf:build] packed ${Object.keys(costArticles).length} cost articles (${packed.byteLength} bytes) -> ${destination}`,
);
