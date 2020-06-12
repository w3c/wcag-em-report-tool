/**
 * ESlint configuration for WCAG-EM Reporting tool
 * ---
 * Intended to increase readability of code with rules adding
 * whitespace, empty lines and newlines to the code.
 *
 * @type {Object}
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true
  },
  extends: 'standard',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    angular: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {

    /*
    ** Array notation:
    ** [1] or
    ** [
    **   1,
    **   2
    ** ]
     */
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 2
      }
    ],
    'array-element-newline': [
      'error',
      'always'
    ],

    /**
     * Function notation:
     *
     * fn(a, b) {…}
     *
     * or
     *
     * fn(
     *   a,
     *   b,
     *   c
     * ) {…}
     */
    'function-paren-newline': [
      'error',
      'multiline-arguments'
    ],

    /**
     * Chained call notation like:
     *
     * object.method();
     *
     * or
     *
     * object
     *   .method()
     *   .method();
     */
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 1
      }
    ],

    /**
     * One statement at a time like:
     *
     * var a;
     * var b;
     *
     * not
     *
     * var a; var b;
     */
    'max-statements-per-line': [
      'error',
      {
        max: 1
      }
    ],

    /**
     * Semicolon usage always add after statement endings like:
     *
     * execute();
     */
    semi: [
      'error',
      'always'
    ]
  }
};
