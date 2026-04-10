import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import nextVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: [
    '**/build/**',
    '**/dist/**',
    '**/public/**',
    '**/packages/Popup/utils/**',
  ],
  settings: {
    react: {
      version: '19',
    },
  },
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      project: ['./tsconfig.json'],
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    ...nextVitals,
    eslintConfigPrettier,
  ],
  rules: {
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'react/no-unknown-property': [
      2,
      {
        ignore: ['jsx', 'global'],
      },
    ],
  },
});
