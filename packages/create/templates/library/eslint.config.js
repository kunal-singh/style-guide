import config from "@kunal-singh/eslint-config/server";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  { ignores: ["**/*.config.js", "**/*.config.ts", "scripts/**", "dist/**"] },
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
