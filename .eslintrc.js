module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2019,
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
