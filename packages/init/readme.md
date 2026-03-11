# @kunal-singh/init

Interactive CLI to set up the `@kunal-singh` style guide tooling in a project.

## Usage

```sh
npx @kunal-singh/init
# or
pnpm dlx @kunal-singh/init
```

## Presets

| Preset  | TypeScript config                         | ESLint config                    |
| ------- | ----------------------------------------- | -------------------------------- |
| server  | `@kunal-singh/typescript-config/server`   | `@kunal-singh/eslint-config/server` |
| library | `@kunal-singh/typescript-config/library`  | `@kunal-singh/eslint-config/server` |
| mcp     | `@kunal-singh/typescript-config/server`   | `@kunal-singh/eslint-config/server` |

All presets configure the same Prettier, commitlint, lefthook, lint-staged, and tsup setup.

> **Coming soon:** `react`, `nextjs`

## Files written

| File                           | Description                                      |
| ------------------------------ | ------------------------------------------------ |
| `tsconfig.json`                | Extends the appropriate `@kunal-singh/typescript-config` preset |
| `eslint.config.js`             | Extends `@kunal-singh/eslint-config/server`      |
| `prettier.config.js`           | Re-exports `@kunal-singh/prettier-config`        |
| `commitlint.config.js`         | Extends `@kunal-singh/commitlint-config` + github-issue-reference rule |
| `scripts/check-branch-name.sh` | Validates branch name pattern `<type>/<issue>-<description>` |
| `lefthook.yml`                 | Git hooks: pre-commit (lint-staged), commit-msg (commitlint), pre-push (branch check) |
| `lint-staged.config.js`        | ESLint + Prettier on staged files                |
| `tsup.config.ts`               | Dual CJS+ESM build with `.d.ts` and sourcemaps   |

`package.json` is also patched to add `prepare`, `build`, `dev`, `typecheck`, `clean` scripts, `main`/`module`/`types`/`exports`/`files` fields, and all required devDependencies.
