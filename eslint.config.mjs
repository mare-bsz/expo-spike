import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.git/**'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
      jest: jestPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
          minimumDescriptionLength: 3,
        },
      ],
    },
  },
];
