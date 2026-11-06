
module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true,
  },
  rules: {
    'no-proto': 0,
    'no-console': 'off',
  },
  plugins: ['jest'],
  overrides: [
    {
      files: ['src/frontend/**/*.ts', 'src/frontend/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['@typescript-eslint'],
      env: {
        browser: true,
      },
      rules: {
        'max-len': 'off',
        'function-paren-newline': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-shadow': 'error',
      },
    },
  ],
};
