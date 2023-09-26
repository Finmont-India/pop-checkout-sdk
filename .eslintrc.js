module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:react-hooks/recommended',
      'airbnb',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          mjs: 'never',
        },
      ],
      'arrow-body-style': 1,
      'react-hooks/exhaustive-deps': 0,
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 1,
      'prettier/prettier': [
        1,
        {
          semi: true,
        },
      ],
      'react/require-default-props': [
        'error',
        {
          ignoreFunctionalComponents: true,
        },
      ],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['state'] },
      ],
    },
    globals: {
      JSX: true,
      test: true,
      expect: true,
    },
  };
  