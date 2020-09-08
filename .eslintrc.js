module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      plugins: ['svelte3'],
      processor: 'svelte3/svelte3'
    }
  ]
};
