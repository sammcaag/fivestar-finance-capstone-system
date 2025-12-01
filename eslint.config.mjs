// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended, // JS rules
  nextPlugin.configs["core-web-vitals"], // Next.js rules

  {
    files: ["**/*.{ts,tsx}"], // TypeScript files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
      globals: {
        window: "readonly", // fixes 'window is not defined'
        document: "readonly", // fixes 'document is not defined'
        localStorage: "readonly", // fixes 'localStorage is not defined'
        console: "readonly", // fixes 'console is not defined'
        setTimeout: "readonly", // fixes 'setTimeout is not defined'
        clearTimeout: "readonly", // fixes 'clearTimeout is not defined'
        navigator: "readonly", // <- add this
        alert: "readonly", // <- add this
        confirm: "readonly", // <- add this
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    ignores: [".next/**", "node_modules/**", "dist/**", "build/**"],
  },
];
