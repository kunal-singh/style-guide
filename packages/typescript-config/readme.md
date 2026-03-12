# @kunal-singh/typescript-config

Shared TypeScript compiler configurations.

## Usage

Install:

```sh
npm install -D @kunal-singh/typescript-config
```

Extend in your `tsconfig.json`:

```json
{
  "extends": "@kunal-singh/typescript-config/base"
}
```

## Presets

| Preset    | Path                                     | Use for                     |
| --------- | ---------------------------------------- | --------------------------- |
| `base`    | `@kunal-singh/typescript-config/base`    | Any TypeScript project      |
| `server`  | `@kunal-singh/typescript-config/server`  | Node.js servers and scripts |
| `library` | `@kunal-singh/typescript-config/library` | Published packages          |
| `react`   | `@kunal-singh/typescript-config/react`   | React component libraries   |
| `nextjs`  | `@kunal-singh/typescript-config/nextjs`  | Next.js apps                |

## File selection

Presets provide compiler options only — they do not include `include` or `exclude`. Define these in your own `tsconfig.json`:

```json
{
  "extends": "@kunal-singh/typescript-config/server",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```
