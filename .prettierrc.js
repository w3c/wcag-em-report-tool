/**
 * Prettier configuration,
 * reflecting editorconfig `.editorconfig`.
 * https://prettier.io/docs/en/options.html
 */
module.exports = {
  arrowParens: 'always',
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  overrides: [
    {
      // Indent JSON files with 4 spaces for readability
      files: ['*.json', '*.jsonld'],
      options: {
        tabWidth: 4,
      },
    },
  ],
};
