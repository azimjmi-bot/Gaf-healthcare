import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { robotsPolicy, robotsTxtBody } from "./robots-policy";

describe("robots.txt policy", () => {
  it("advertises a hostname Host and the published language sitemaps", () => {
    const policy = robotsPolicy();
    assert.equal(policy.host, "gaf.healthcare");
    assert.ok(!String(policy.host).includes("://"));
    assert.deepEqual(policy.sitemap, [
      "https://gaf.healthcare/sitemap-en.xml",
      "https://gaf.healthcare/sitemap-ar.xml",
      "https://gaf.healthcare/sitemap-blogs.xml",
    ]);
  });

  it("keeps the static app/robots.txt file in lockstep with the policy", () => {
    const onDisk = readFileSync(join(process.cwd(), "src/app/robots.txt"), "utf8");
    assert.equal(onDisk, robotsTxtBody());
  });
});
