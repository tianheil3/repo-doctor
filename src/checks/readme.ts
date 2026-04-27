import { access, readFile } from "node:fs/promises";
import path from "node:path";

import type { RepoCheck } from "./types.js";

export const checkReadme: RepoCheck = async ({ root }) => {
  const readmePath = path.join(root, "README.md");

  try {
    await access(readmePath);
    const contents = await readFile(readmePath, "utf8");

    if (contents.trim().length === 0) {
      return {
        id: "readme",
        title: "README",
        status: "fail",
        message: "README.md exists but is empty."
      };
    }

    return {
      id: "readme",
      title: "README",
      status: "pass",
      message: "README.md exists and has content."
    };
  } catch {
    return {
      id: "readme",
      title: "README",
      status: "fail",
      message: "README.md is missing."
    };
  }
};
