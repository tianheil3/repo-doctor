import type { DoctorResult } from "./checks/types.js";

export function formatTextReport(result: DoctorResult): string {
  const lines = [
    `repo-doctor ${result.ok ? "passed" : "failed"} for ${result.root}`,
    "",
    ...result.checks.map((check) => {
      const marker = check.status === "pass" ? "PASS" : "FAIL";
      return `${marker} ${check.title}: ${check.message}`;
    })
  ];

  return lines.join("\n");
}
