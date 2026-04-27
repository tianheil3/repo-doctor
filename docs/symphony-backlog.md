# Symphony Backlog

Create these as GitHub Issues after pushing this repository to GitHub. Apply the `Todo` label to each issue you want Symphony to pick up.

## Issue 1: Add JSON output mode

Add a `--json` flag to the `repo-doctor` CLI. When present, print the full structured result as JSON instead of the text report. Keep the existing text output as the default.

Acceptance criteria:

- `node dist/src/cli.js --json .` prints valid JSON.
- JSON includes `ok`, `root`, and `checks`.
- Existing text output still works.
- `npm run check` passes.

## Issue 2: Detect missing license metadata

Add a package metadata check for the `license` field.

Acceptance criteria:

- Repositories without `package.json.license` fail the package metadata check.
- Repositories with a non-empty string `license` pass the metadata check.
- Tests cover both cases.
- `npm run check` passes.

## Issue 3: Add Markdown heading check

Add a check that verifies `README.md` contains exactly one level-one heading.

Acceptance criteria:

- Missing `# Heading` fails.
- Multiple `# Heading` lines fail.
- Exactly one level-one heading passes.
- The check appears in the CLI output.
- `npm run check` passes.

## Issue 4: Improve broken link diagnostics

Improve broken Markdown link output so each broken link includes the source file and original target.

Acceptance criteria:

- Broken links report `README.md -> ./missing.md`.
- Tests assert the improved message.
- Existing link behavior remains unchanged.
- `npm run check` passes.

## Issue 5: Add CI status badge to README

Add a GitHub Actions status badge to the README after the repository is pushed to GitHub.

Acceptance criteria:

- README displays the `CI` workflow badge.
- The badge URL points to this repository.
- `npm run check` passes.

## Issue 6: Console intervention drill

Make a deliberately small code change, then pause and explain the approach in the Symphony shared console when the operator sends `explain`.

Acceptance criteria:

- The issue workpad shows progress.
- The shared console responds to `explain`.
- The final change is small and `npm run check` passes.
