# @kunal/prettier-config

Shared Prettier configuration.

## Usage

Install:
```sh
npm install -D @kunal/prettier-config prettier
```

In `prettier.config.js`:

```js
import config from "@kunal/prettier-config";

export default config;
```

Or reference it by name in `package.json` (note: this form does not support overrides):

```json
{
  "prettier": "@kunal/prettier-config"
}
```
