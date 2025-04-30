import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import hardcodedNumberRule from "./src/tests/no_hardcoded_numbers.js";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      custom: {
        rules: {
          "no-hardcoded-numbers": hardcodedNumberRule,
        },
      },
    },
    rules: {
      "custom/no-hardcoded-numbers": "warn",
    },
  },
]);