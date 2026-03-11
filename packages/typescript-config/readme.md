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
