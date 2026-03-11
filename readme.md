# style-guide

Personal style guide monorepo — four shareable config packages (ESLint, Prettier, TypeScript, commitlint) plus one init CLI that wires them into a new project automatically.

---

## Packages

| Package | Install | Description |
|---|---|---|
| `@kunal-singh/eslint-config` | `pnpm add -D @kunal-singh/eslint-config` | Shared ESLint flat config (browser + server presets) |
| `@kunal-singh/prettier-config` | `pnpm add -D @kunal-singh/prettier-config` | Shared Prettier config |
| `@kunal-singh/typescript-config` | `pnpm add -D @kunal-singh/typescript-config` | Shared TypeScript base configs |
| `@kunal-singh/commitlint-config` | `pnpm add -D @kunal-singh/commitlint-config` | Shared commitlint conventional config |
| `@kunal-singh/init` | `npx @kunal-singh/init` | CLI that scaffolds all four configs into a new project |

---

## Quick setup

```sh
npx @kunal-singh/init
# or
pnpm dlx @kunal-singh/init
```

The CLI detects your package manager, installs all config packages, and writes the config files.

---

## Manual setup

### ESLint

```sh
pnpm add -D @kunal-singh/eslint-config eslint
```

```js
// eslint.config.js
import config from '@kunal-singh/eslint-config/server'
export default config
```

Use `@kunal-singh/eslint-config/browser` for browser projects.

### Prettier

```sh
pnpm add -D @kunal-singh/prettier-config prettier
```

```js
// prettier.config.js
export { default } from '@kunal-singh/prettier-config'
```

### TypeScript

```sh
pnpm add -D @kunal-singh/typescript-config typescript
```

```json
// tsconfig.json
{
  "extends": "@kunal-singh/typescript-config/base"
}
```

Use `@kunal-singh/typescript-config/bundler` for projects using a bundler.

### commitlint

```sh
pnpm add -D @kunal-singh/commitlint-config @commitlint/cli
```

```js
// commitlint.config.js
export { default } from '@kunal-singh/commitlint-config'
```

---

## Contributing / Release workflow

1. Make changes in a feature branch
2. Run `pnpm changeset` and describe the change
3. Open a PR — CI runs lint, typecheck, and build
4. Merge to `main` — the Release workflow opens (or updates) a "Version Packages" PR
5. Merge the Version PR — packages are published to npm automatically

---

## First publish

On a fresh repo before any release has run, publish manually once:

```sh
pnpm install
pnpm build
pnpm changeset
pnpm changeset version
npm publish --access public --workspaces
```

After that, all subsequent releases are handled by the Release workflow.
