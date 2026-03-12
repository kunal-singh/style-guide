import config from "@kunal-singh/eslint-config/server";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  { ignores: ["**/*.config.js", "scripts/**", "dist/**"] },
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
