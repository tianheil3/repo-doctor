import { access, readFile } from "node:fs/promises";
import path from "node:path";

import type { RepoCheck } from "./types.js";

const MARKDOWN_LINK_PATTERN = /\[[^\]]+\]\(([^)]+)\)/g;

export const checkMarkdownLinks: RepoCheck = async ({ root }) => {
  const readmePath = path.join(root, "README.md");

  let contents: string;
  try {
    contents = await readFile(readmePath, "utf8");
  } catch {
    return {
      id: "markdown-links",
      title: "Markdown links",
      status: "pass",
      message: "No README.md links to check."
    };
  }

  const brokenLinks: string[] = [];

  for (const match of contents.matchAll(MARKDOWN_LINK_PATTERN)) {
    const target = match[1];

    if (!target || isExternalOrAnchor(target)) {
      continue;
    }

    const targetPath = path.resolve(root, target.split("#")[0] ?? target);

    try {
      await access(targetPath);
    } catch {
      brokenLinks.push(target);
    }
  }

  if (brokenLinks.length > 0) {
    return {
      id: "markdown-links",
      title: "Markdown links",
      status: "fail",
      message: `Broken README.md links: ${brokenLinks.join(", ")}.`
    };
  }

  return {
    id: "markdown-links",
    title: "Markdown links",
    status: "pass",
    message: "README.md relative links resolve."
  };
};

function isExternalOrAnchor(target: string): boolean {
  return target.startsWith("http://") || target.startsWith("https://") || target.startsWith("#");
}
