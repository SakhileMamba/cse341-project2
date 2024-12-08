// import globals from "globals";
// import pluginJs from "@eslint/js";
// import eslintConfigPrettier from "eslint-config-prettier";
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   // {
//   //   plugins: {
//   //     prettier: eslintPluginPrettierRecommended
//   //   },
//   //   rules: {
//   //     ...eslintConfigPrettier.rules,
//   //     //'prettier/prettier': 'error'
//   //   }
//   // },
//   eslintConfigPrettier,
//   eslintPluginPrettierRecommended
// ];

import globals from 'globals';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error'
    }
  }
];
