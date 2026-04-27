import { readFile } from "node:fs/promises";
import path from "node:path";

import type { RepoCheck } from "./types.js";

interface PackageJson {
  name?: unknown;
  version?: unknown;
  license?: unknown;
  scripts?: unknown;
}

export async function readPackageJson(root: string): Promise<PackageJson | undefined> {
  try {
    const contents = await readFile(path.join(root, "package.json"), "utf8");
    return JSON.parse(contents) as PackageJson;
  } catch {
    return undefined;
  }
}

export const checkPackageJson: RepoCheck = async ({ root }) => {
  const packageJson = await readPackageJson(root);

  if (!packageJson) {
    return {
      id: "package-json",
      title: "package.json",
      status: "fail",
      message: "package.json is missing or invalid JSON."
    };
  }

  const missing = [
    typeof packageJson.name === "string" && packageJson.name.length > 0 ? undefined : "name",
    typeof packageJson.version === "string" && packageJson.version.length > 0 ? undefined : "version",
    typeof packageJson.license === "string" && packageJson.license.length > 0 ? undefined : "license"
  ].filter((value): value is string => Boolean(value));

  if (missing.length > 0) {
    return {
      id: "package-json",
      title: "package.json",
      status: "fail",
      message: `package.json is missing required metadata: ${missing.join(", ")}.`
    };
  }

  return {
    id: "package-json",
    title: "package.json",
    status: "pass",
    message: "package.json has required metadata."
  };
};

export function scriptNames(packageJson: PackageJson | undefined): string[] {
  if (!packageJson || typeof packageJson.scripts !== "object" || packageJson.scripts === null) {
    return [];
  }

  return Object.keys(packageJson.scripts);
}
