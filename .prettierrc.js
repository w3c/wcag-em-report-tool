module.exports = {
  // EditorConfig
  endOfLine: 'lf',
  tabWidth: 2,
  useTabs: false,

  // General prettier stuff
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.json',
      options: {
        tabWidth: 4
      }
    },
    {
      // Svelte
      files: '*.svelte',
      options: {
        svelteSortOrder: 'markup-styles-scripts',
        svelteStrictMode: true,
        svelteBracketNewLine: true,
        svelteAllowShorthand: true,
        svelteIndentScriptAndStyle: true
      }
    }
  ]
};
