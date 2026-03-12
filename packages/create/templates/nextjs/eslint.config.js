import config from "@kunal-singh/eslint-config/nextjs";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [{ ignores: ["**/*.config.js", "**/*.config.ts", "scripts/**"] }, ...config];
