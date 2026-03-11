import config from "@kunal-singh/eslint-config/server";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Config files and scripts are tooling, not source — skip typed linting.
    // Plain-JS packages (eslint-config, prettier-config, commitlint-config) have
    // no tsconfig, so typed rules cannot apply to them from the root.
    ignores: [
      "**/*.config.js",
      "**/*.config.ts",
      "scripts/**",
      "packages/eslint-config/**",
      "packages/prettier-config/**",
      "packages/commitlint-config/**",
      "packages/typescript-config/**",
      "packages/init/tsup.config.ts",
    ],
  },
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
