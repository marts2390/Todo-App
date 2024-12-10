// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ["expo", "prettier", "plugin:@typescript-eslint/recommended"],
    ignorePatterns: ["/dist/*", "/generated/*", "**/*.js"],
    env: {
      es2021: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: [
      "prettier",
      "@typescript-eslint",
      "react-hooks",
      "eslint-plugin-import",
      "eslint-plugin-prettier",
      "eslint-plugin-react"
    ],
    rules: {
      "react/no-deprecated": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true
        }
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: ["export", "if", "return"]
        },
        {
          blankLine: "always",
          prev: ["const", "let"],
          next: "*"
        },
        {
          blankLine: "any",
          prev: ["const", "let"],
          next: ["const", "let"]
        }
      ],
      "@typescript-eslint/no-var-requires": 0,
      "arrow-body-style": ["warn", "as-needed"],
      "no-console": "warn",
      "object-curly-spacing": ["error", "always"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  };
  