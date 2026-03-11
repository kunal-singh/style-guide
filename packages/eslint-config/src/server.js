import globals from "globals";
import tseslint from "typescript-eslint";
import base from "./index.js";

export default tseslint.config(...base, {
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    // Node.js servers commonly use floating promises for fire-and-forget patterns;
    // enforce explicit handling instead.
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
  },
});
