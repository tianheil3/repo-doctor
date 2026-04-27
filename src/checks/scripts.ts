import { readPackageJson, scriptNames } from "./packageJson.js";
import type { RepoCheck } from "./types.js";

const REQUIRED_SCRIPTS = ["test", "lint"];

export const checkScripts: RepoCheck = async ({ root }) => {
  const scripts = scriptNames(await readPackageJson(root));
  const missing = REQUIRED_SCRIPTS.filter((script) => !scripts.includes(script));

  if (missing.length > 0) {
    return {
      id: "scripts",
      title: "NPM scripts",
      status: "fail",
      message: `Missing npm scripts: ${missing.join(", ")}.`
    };
  }

  return {
    id: "scripts",
    title: "NPM scripts",
    status: "pass",
    message: "Required npm scripts are present."
  };
};
