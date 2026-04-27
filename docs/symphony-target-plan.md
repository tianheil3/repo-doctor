# repo-doctor Symphony Target Plan

Goal: create a small GitHub-hosted TypeScript CLI repository that can be used as a repeatable Symphony target.

Architecture:

- `src/index.ts` orchestrates repository checks and returns structured results.
- `src/checks/*` contains one focused check per file.
- `src/report.ts` formats human-readable CLI output.
- `src/cli.ts` is a thin command-line entry point.
- `test/repoDoctor.test.ts` verifies behavior through temporary repositories.

Validation:

- `npm run lint` runs TypeScript strict checks.
- `npm test` builds and runs Node's built-in test runner.
- GitHub Actions runs `npm ci` and `npm run check` on pushes and pull requests.

Symphony exercises this target by:

1. Creating GitHub Issues from `docs/symphony-backlog.md`.
2. Labeling candidate issues `Todo`.
3. Running the Symphony concierge setup in this repository.
4. Confirming Symphony moves issues to `In Progress`, posts a workpad comment, edits code, runs checks, and produces a reviewable change.
5. Using the shared console to send `explain`, `prompt <text>`, `continue`, and `cancel` during selected runs.
