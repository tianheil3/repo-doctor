# repo-doctor

`repo-doctor` is a small TypeScript CLI target project for exercising Symphony against a real GitHub repository.

It checks a repository for a few simple health signals:

- `README.md` exists and is not empty
- `package.json` contains required metadata
- `package.json` defines `test` and `lint` scripts
- relative links in `README.md` resolve

## Usage

```sh
npm install
npm run build
node dist/src/cli.js .
```

The CLI exits with `0` when every check passes and `1` when any check fails.

## Development

```sh
npm run check
```

`npm run check` runs TypeScript validation and the Node test suite.

## Symphony Target

This repository is intentionally small and issue-driven. It is meant to be connected to Symphony through GitHub Issues with these labels:

- `Todo`
- `In Progress`
- `Done`

Use the suggested backlog in [docs/symphony-backlog.md](docs/symphony-backlog.md) to create predictable issues for Symphony to pick up.
