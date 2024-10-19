module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'prettier',
    'jest',
    'testing-library',
    'unicorn',
    'folders',
    'filename-rules',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    jest: true,
  },
  rules: {
    'no-nested-ternary': 'warn',
    'prettier/prettier': 'error',
    'no-console': 'error',
    'no-use-before-define': 'off',
    'consistent-return': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'semi': 'error',
    'max-params': ['warn', 4],
    'global-require': 'warn',
    'react/prop-types': 'off',
    'react/style-prop-object': 'off',
    'camelcase': 'warn',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'curly': 'error',
    'no-shadow': 'off',
    'no-underscore-dangle': 'warn',
    'no-plusplus': 'warn',
    'no-bitwise': 'warn',
    'operator-assignment': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: ['const', 'let', 'if', 'for', 'try'],
        next: 'return',
      },
    ],
    'array-callback-return': 'warn',
    'no-param-reassign': 'warn',
    'no-restricted-syntax': 'warn',
    'no-prototype-builtins': 'warn',
    'no-case-declarations': 'warn',
    'prefer-destructuring': 'warn',
    'no-return-assign': 'warn',
    'max-classes-per-file': 'warn',
    'class-methods-use-this': 'warn',
    'no-dupe-class-members': 'warn',
    'no-useless-return': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-restricted-globals': 'warn',
    'no-unused-expressions': 'warn',
    'no-continue': 'warn',
    'no-useless-escape': 'warn',
    'no-template-curly-in-string': 'warn',
    'object-curly-spacing': 'warn',
    'object-shorthand': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-empty-file': 'error',

    // React
    'react/require-default-props': 'off',
    'react/jsx-curly-brace-presence': 'warn',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/static-property-placement': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/sort-comp': 'warn',
    'react/display-name': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React Native
    'react-native/no-inline-styles': 'error',

    // Imports
    'import/no-unresolved': 'off',
    'import/newline-after-import': 'warn',
    'import/no-named-as-default': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        json: 'always',
      },
    ],
    'import/no-unused-modules': [
      'error',
      {
        missingExports: true,
        unusedExports: true,
        ignoreExports: ['src/**/index.ts'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-cycle': 'error',
    'import/no-duplicates': 'off',
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'unknown', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        warnOnUnassignedImports: true,
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],

    // Typescript
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '^React$',
        args: 'after-used',
        argsIgnorePattern: '^_$',
      },
    ],

    // Naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['enumMember', 'enum'],
        format: ['PascalCase'],
      },
      {
        selector: 'typeParameter',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'folders/match-regex': ['error', '^(__)?[a-z-]+(__)?$', '/src/'],
    'filename-rules/match': [
      'error',
      {
        '.tsx': /^[A-Z]+[a-z]+([A-Z][a-z]*)*(\.test)?(\.tsx)?$/,
        '.ts': /^([a-z]+([A-Z][a-z]*)*|[A-Z][a-z]+([A-Z][a-z]*)*)(\.test|\.types)?(\.ts)?$/,
      },
    ],
    'unicorn/filename-case': 'off',
  },
  overrides: [
    {
      // Put required *.d.ts files here to whitelist
      files: ['global.d.ts'],
      rules: {
        'filename-rules/match': 'off',
      },
    },
    {
      files: ['*.test.{ts,tsx}'],
      rules: {
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'testing-library/prefer-screen-queries': 'off',
        'import/no-unused-modules': 'off',
      },
      extends: ['plugin:testing-library/react'],
    },
  ],
};