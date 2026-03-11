# @kunal/typescript-config

Shared TypeScript compiler configurations.

## Usage

Install:
```sh
npm install -D @kunal/typescript-config
```

Extend in your `tsconfig.json`:

```json
{
  "extends": "@kunal/typescript-config/base"
}
```

## Presets

| Preset | Path | Use for |
|--------|------|---------|
| `base` | `@kunal/typescript-config/base` | Any TypeScript project |
| `server` | `@kunal/typescript-config/server` | Node.js servers and scripts |
| `library` | `@kunal/typescript-config/library` | Published packages |
