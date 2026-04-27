import path from "node:path";

import { checkMarkdownLinks } from "./checks/markdownLinks.js";
import { checkPackageJson } from "./checks/packageJson.js";
import { checkReadme } from "./checks/readme.js";
import { checkScripts } from "./checks/scripts.js";
import type { DoctorOptions, DoctorResult, RepoCheck } from "./checks/types.js";

const CHECKS: RepoCheck[] = [checkReadme, checkPackageJson, checkScripts, checkMarkdownLinks];

export async function runDoctor(options: DoctorOptions): Promise<DoctorResult> {
  const root = path.resolve(options.root);
  const checks = await Promise.all(CHECKS.map((check) => check({ root })));

  return {
    ok: checks.every((check) => check.status === "pass"),
    root,
    checks
  };
}

export type { CheckResult, DoctorOptions, DoctorResult } from "./checks/types.js";
