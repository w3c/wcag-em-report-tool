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
  ],
  rules: {
    indent: [
      'error',
      2,
      {
        /**
         * switch(a){
         *   case "a":
         *     break;
         *   case "b":
         *     break;
         * }
         */
        SwitchCase: 1
      }
    ]
  }
};
