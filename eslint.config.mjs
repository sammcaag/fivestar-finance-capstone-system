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
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },

  {
    ignores: [".next/**", "node_modules/**", "dist/**", "build/**"],
  },
];
