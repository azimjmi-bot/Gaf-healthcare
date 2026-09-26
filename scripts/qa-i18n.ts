/**
 * Every internationalisation check the site has, in one command.
 *
 *   npm run qa:i18n
 *   BASE_URL=http://127.0.0.1:43117 npm run qa:i18n
 *
 * Six checks had grown up separately, each with its own npm script and its own
 * idea of where the site was being served. Running them one at a time meant it
 * was possible — and it happened — to read a green result that had been
 * produced against a server two builds old. This runs the whole set against
 * one server, in one order, and reports which of them failed rather than
 * stopping at the first, because when a canonical moves several of them move
 * together and seeing all of it at once is the point.
 *
 * Five of the six read HTML over HTTP, so a server has to exist. If BASE_URL
 * is already answering, that server is used as-is and left alone. Otherwise
 * one is built and started here on a free port and shut down afterwards, so
 * the command is self-contained and `npm test` can depend on it.
 */
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import { existsSync } from "node:fs";

type Check = {
  /** The npm script, so a failure can be reproduced by hand. */
  script: string;
  what: string;
};

const CHECKS: Check[] = [
  { script: "check:glossary", what: "Arabic term tables agree with the built glossary" },
  { script: "check:alternates", what: "English canonicals and hreflang match the pinned fixture" },
  { script: "check:jsonld", what: "English JSON-LD matches the pinned baseline" },
  { script: "check:jsonld-policy", what: "one identity per entity, one per document, correct inLanguage" },
  { script: "validate:jsonld", what: "served JSON-LD validates against the schema.org vocabulary" },
  { script: "check:latin-leakage", what: "no English prose on a published Arabic page" },
];

async function answers(base: string, timeoutMs = 2000) {
  try {
    const response = await fetch(base, { signal: AbortSignal.timeout(timeoutMs) });
    return response.ok || response.status < 500;
  } catch {
    return false;
  }
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      if (typeof address === "string" || address === null) {
        probe.close(() => reject(new Error("could not reserve a port")));
        return;
      }
      probe.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(base: string, attempts = 120) {
  for (let i = 0; i < attempts; i += 1) {
    if (await answers(base)) return true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
}

async function startServer(): Promise<{ base: string; stop: () => void }> {
  if (!existsSync(".next/BUILD_ID")) {
    console.log("· no build found, running next build");
    const built = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
    if (built.status !== 0) throw new Error("next build failed");
  }
  const port = await freePort();
  const base = `http://127.0.0.1:${port}`;
  console.log(`· starting a server on ${base}`);
  // Bound the same way `npm start` binds it, and not to loopback: a
  // next start --hostname 127.0.0.1 resolves /ar as English — the proxy runs
  // and the rewrite to /doctors happens, but the locale comes back en — so
  // every Arabic check would read an English page and fail for no reason.
  const child = spawn("npx", ["next", "start", "--hostname", "0.0.0.0", "--port", String(port)], {
    stdio: "ignore",
    detached: true,
  });
  const stop = () => {
    // next start forks a next-server child, so killing the npm-visible pid
    // alone leaves the real server listening. The process group gets both.
    try {
      if (child.pid) process.kill(-child.pid, "SIGTERM");
    } catch {
      /* already gone */
    }
  };
  if (!(await waitForServer(base))) {
    stop();
    throw new Error(`the server never answered on ${base}`);
  }
  return { base, stop };
}

async function main() {
  const configured = process.env.BASE_URL;
  let base = configured ?? "";
  let stop = () => {};

  if (base && (await answers(base))) {
    console.log(`· using the server already answering on ${base}`);
  } else {
    if (base) console.log(`· nothing is answering on ${base}`);
    ({ base, stop } = await startServer());
  }

  const failed: Check[] = [];
  try {
    for (const check of CHECKS) {
      console.log(`\n${"═".repeat(78)}\n${check.script} — ${check.what}\n${"═".repeat(78)}`);
      const result = spawnSync("npm", ["run", "--silent", check.script], {
        stdio: "inherit",
        env: { ...process.env, BASE_URL: base },
      });
      if (result.status !== 0) failed.push(check);
    }
  } finally {
    stop();
  }

  console.log(`\n${"═".repeat(78)}\nqa:i18n — ${CHECKS.length - failed.length}/${CHECKS.length} passed\n${"═".repeat(78)}`);
  for (const check of CHECKS) {
    const broke = failed.includes(check);
    console.log(`${broke ? "FAIL" : "ok  "}  ${check.script}`);
  }
  if (failed.length > 0) {
    console.error(
      `\nqa:i18n failed. Reproduce with: BASE_URL=${base} npm run ${failed[0].script}`,
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`\nqa:i18n could not run: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
