# style-guide

Personal config monorepo. Publishes five scoped npm packages under `@kunal-singh/`.

## Packages

| Package | Description |
|---|---|
| `@kunal-singh/typescript-config` | Shared tsconfig presets (`base`, `server`, `library`) |
| `@kunal-singh/eslint-config` | Shared ESLint v9 flat config presets (`base`, `server`) |
| `@kunal-singh/prettier-config` | Shared Prettier config |
| `@kunal-singh/commitlint-config` | Shared commitlint config (conventional commits) |
| `@kunal-singh/init` | CLI that scaffolds all of the above into a new project |

## Stack

- **pnpm workspaces** — package management and monorepo linking
- **Changesets** — versioning and changelog generation
- **tsup** — only used in `packages/init` (the only package with a build step)
- **lefthook** — git hooks (pre-commit, commit-msg, pre-push)
- **ESLint v9 flat config** — no legacy `.eslintrc`

## Key conventions

- ESM only (`"type": "module"`) across all packages
- Config packages publish as source — no build step
- `packages/init` is the only package that compiles TypeScript to `dist/`
- All packages dogfood each other via `workspace:*` during development
- Changesets rewrites `workspace:*` to real semver at publish time
- `module: preserve` + `moduleResolution: bundler` + `noEmit: true` in all tsconfigs — tsup handles emit in consumer projects

## Release workflow
```bash
pnpm changeset       # describe what changed and which packages are affected
# open PR, merge to main
# Changesets action opens a "Version Packages" PR automatically
# merge that PR → packages publish to npm automatically
```

## First publish (one-time)
```bash
pnpm install
pnpm build
pnpm changeset       # mark all packages as minor
pnpm version
pnpm release
```

## Adding a new preset

1. Add the config file to the relevant package (e.g. `packages/eslint-config/react.js`)
2. Add the export to that package's `package.json` exports map
3. Update `packages/init/src/setup/` to reference the new preset where relevant
4. Run `pnpm changeset` to document the change
