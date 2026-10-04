import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("homepage search is a no-JS GET form onto /doctors", () => {
  const source = readFileSync(join(process.cwd(), "src/components/home/home-search.tsx"), "utf8");
  assert.match(source, /method="get"/);
  assert.match(source, /localePath\("\/doctors"/);
  assert.doesNotMatch(source, /"use client"/);
  assert.doesNotMatch(source, /useRouter/);
});

test("site header no longer hydrates a radix sheet on every page", () => {
  const source = readFileSync(join(process.cwd(), "src/components/site-header.tsx"), "utf8");
  assert.doesNotMatch(source, /"use client"/);
  assert.doesNotMatch(source, /components\/ui\/sheet/);
  assert.match(source, /<details className="site-menu/);
});
