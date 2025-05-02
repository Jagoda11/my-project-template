// eslint.config.js
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jest from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'package-lock.json',
      '*.min.js',
      'coverage/',
      'build/',
      'public/',
      '*.md',
      '.vscode/',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      jest,
      prettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    plugins: {
      jest,
      import: importPlugin,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-unused-vars': 'warn',
      'no-redeclare': 'error',
      'no-shadow': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'global-require': 'warn',
      'handle-callback-err': 'warn',
      'no-buffer-constructor': 'warn',
      'no-new-require': 'warn',
      'no-path-concat': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '**',
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'consistent-return': 'error',
      'no-unused-expressions': 'warn',
    },
    settings: {
      jest: {
        version: 'detect',
      },
    },
  },
]
