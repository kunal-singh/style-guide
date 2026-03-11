# @kunal/commitlint-config

Shared commitlint configuration (extends `@commitlint/config-conventional`).

## Usage

Install:
```sh
npm install -D @kunal/commitlint-config @commitlint/cli @commitlint/config-conventional
```

In `commitlint.config.js`:

```js
import config from "@kunal/commitlint-config";

export default config;
```

## Rules

Extends `@commitlint/config-conventional` with:
- Subject line max 72 chars
- Body line max 100 chars
- Scope and subject must be lower-case
