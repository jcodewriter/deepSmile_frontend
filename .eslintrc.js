module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",

    // Prettier plugin and recommended rules
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  rules: {
    // Include .prettierrc.js rules
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/prop-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off", // this rule is handled by nextjs
    "jsx-a11y/media-has-caption": "off",
  },
  env: {
    browser: true,
    amd: true,
    node: true,
    jest: true,
  },
};
