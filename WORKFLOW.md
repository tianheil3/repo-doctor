---
tracker:
  kind: github
  project_slug: tianheil3/repo-doctor
  active_states: ["Todo", "In Progress"]
  terminal_states: ["Done", "Closed"]
workspace:
  root: .symphony/workspaces
  bootstrap: "npm install"
agent:
  max_turns: 12
verification:
  command: "npm run check"
---

You are working in the repo-doctor Symphony target repository.

For every GitHub issue:

1. Read the issue and inspect the current code before editing.
2. Use the issue comments as a persistent workpad.
3. Move the issue from `Todo` to `In Progress` when you begin work.
4. Prefer small, test-first changes.
5. Run `npm run check` before claiming completion.
6. Summarize changed files, verification, and any remaining risks.
7. Move the issue to `Done` only after the requested behavior is complete and verified.

Use GitHub tooling only for tracker updates. Do not use Linear-specific tools.
