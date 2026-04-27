import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { runDoctor } from "../src/index.js";

async function makeRepo(files: Record<string, string>): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "repo-doctor-"));

  await Promise.all(
    Object.entries(files).map(async ([name, contents]) => {
      await writeFile(path.join(root, name), contents, "utf8");
    })
  );

  return root;
}

test("reports a healthy repository as passing", async () => {
  const root = await makeRepo({
    "README.md": "# Example\n\nSee [package](./package.json).\n",
    "package.json": JSON.stringify({
      name: "example",
      version: "1.0.0",
      scripts: { test: "node --test", lint: "tsc --noEmit" }
    })
  });

  const result = await runDoctor({ root });

  assert.equal(result.ok, true);
  assert.deepEqual(
    result.checks.map((check) => check.status),
    ["pass", "pass", "pass", "pass"]
  );
});

test("reports missing README, incomplete package metadata, and missing scripts", async () => {
  const root = await makeRepo({
    "package.json": JSON.stringify({ name: "example", scripts: { test: "node --test" } })
  });

  const result = await runDoctor({ root });

  assert.equal(result.ok, false);
  assert.deepEqual(
    result.checks.map((check) => [check.id, check.status]),
    [
      ["readme", "fail"],
      ["package-json", "fail"],
      ["scripts", "fail"],
      ["markdown-links", "pass"]
    ]
  );
});

test("reports broken relative markdown links", async () => {
  const root = await makeRepo({
    "README.md": "# Example\n\nSee [missing](./docs/missing.md).\n",
    "package.json": JSON.stringify({
      name: "example",
      version: "1.0.0",
      scripts: { test: "node --test", lint: "tsc --noEmit" }
    })
  });

  const result = await runDoctor({ root });
  const linkCheck = result.checks.find((check) => check.id === "markdown-links");

  assert.equal(result.ok, false);
  assert.equal(linkCheck?.status, "fail");
  assert.match(linkCheck?.message ?? "", /docs\/missing\.md/);
});
