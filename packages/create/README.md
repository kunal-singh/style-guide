# @kunal-singh/create

Scaffolds a new TypeScript project pre-configured with shared tooling from `@kunal-singh/`.

## Usage

```sh
npm create @kunal-singh@latest <project-name> [preset]
```

The preset argument is optional — you will be prompted if omitted.

## Presets

| Preset    | Description                             |
| --------- | --------------------------------------- |
| `server`  | Node.js / backend services              |
| `library` | Publishable packages and shared modules |
| `react`   | React component libraries               |
| `nextjs`  | Next.js apps                            |

## What gets scaffolded

- `package.json` — with name, scripts (`typecheck`, `lint`, `format`, `prepare`), and dev dependencies
- `tsconfig.json` — extending the chosen preset
- `.eslintrc` / ESLint flat config — extending `@kunal-singh/eslint-config`
- `.prettierrc` — extending `@kunal-singh/prettier-config`
- `commitlint.config.js` — extending `@kunal-singh/commitlint-config`
- `lefthook.yml` — pre-commit (lint + format), commit-msg (commitlint), pre-push (branch name check)
- `scripts/check-branch-name.sh` — enforces `<type>/<issue>-<description>` branch naming

## Next steps

```sh
cd <project-name>
pnpm install
```
