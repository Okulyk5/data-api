module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'import',
  ],
  extends: [
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'class-methods-use-this': ['error', { 'exceptMethods': ['onModuleInit'] }],

    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-unused-vars': 'warn',

    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    // 'simple-import-sort/sort': 'warn',
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-undef': 'error',
    'no-console': 'warn',
  },
};
