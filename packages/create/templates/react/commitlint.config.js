import baseConfig from "@kunal-singh/commitlint-config";

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  ...baseConfig,
  plugins: [
    {
      rules: {
        "github-issue-reference": (parsed) => {
          const { header } = parsed;
          const valid = /^[a-z]+\/\d+-/.test(header ?? "");
          return [valid, "Commit subject must reference a GitHub issue, e.g. feat/123-my-feature"];
        },
      },
    },
  ],
  rules: {
    ...baseConfig.rules,
    "github-issue-reference": [2, "always"],
  },
};

export default config;
