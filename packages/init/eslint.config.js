import config from "@kunal-singh/eslint-config/server";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/*.config.js", "**/*.config.ts", "scripts/**"] },
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
