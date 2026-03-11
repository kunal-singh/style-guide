# @kunal/eslint-config

Shared ESLint flat configs.

## Usage

Install:
```sh
npm install -D @kunal/eslint-config eslint
```

In `eslint.config.js`:

```js
import base from "@kunal/eslint-config";

export default [...base];
```

### Node.js servers

```js
import server from "@kunal/eslint-config/server";

export default [...server];
```

## Presets

| Export | Use for |
|--------|---------|
| `.` (default) | Any TypeScript project |
| `./server` | Node.js servers (adds Node globals, promise rules) |
