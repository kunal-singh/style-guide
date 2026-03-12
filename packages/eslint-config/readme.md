# @kunal-singh/eslint-config

Shared ESLint flat configs.

## Usage

Install:

```sh
npm install -D @kunal-singh/eslint-config eslint
```

In `eslint.config.js`:

```js
import base from "@kunal-singh/eslint-config";

export default [...base];
```

### Node.js servers

Type-aware rules (`no-floating-promises`, `no-misused-promises`) are enabled. Add `tsconfigRootDir` so the project service can locate your `tsconfig.json`:

```js
import server from "@kunal-singh/eslint-config/server";

export default [
  { ignores: ["**/*.config.js", "scripts/**", "dist/**"] },
  ...server,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

### React

```js
import react from "@kunal-singh/eslint-config/react";

export default [
  { ignores: ["**/*.config.js", "scripts/**", "dist/**"] },
  ...react,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

### Next.js

```js
import nextjs from "@kunal-singh/eslint-config/nextjs";

export default [
  { ignores: ["**/*.config.js", "scripts/**"] },
  ...nextjs,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

## Presets

| Export        | Use for                                                    |
| ------------- | ---------------------------------------------------------- |
| `.` (default) | Any TypeScript project                                     |
| `./server`    | Node.js servers (Node globals, type-aware promise rules)   |
| `./react`     | React libraries (React, hooks, jsx-a11y, type-aware rules) |
| `./nextjs`    | Next.js apps (extends react + Next.js recommended rules)   |

## Note on `tsconfigRootDir`

Type-aware presets (`server`, `react`, `nextjs`) include `projectService: true` to auto-discover your `tsconfig.json`. You must add `tsconfigRootDir: import.meta.dirname` in your consumer config so the project service anchors to your project root rather than the package inside `node_modules`.
