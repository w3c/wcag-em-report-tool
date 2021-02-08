/**
 * Stylelint configuration for WCAG-EM Reporting Tool
 * ---
 * Intended to adhere to a consistent style notation
 * and to improve readabillity.
 *
 * @type {Object}
 */
module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-scss'],
  rules: {

    /**
     * Enable scss at-rule to add scss at-rules to whitelist
     */
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,

    /**
     * Force multiline declarations
     * @type {Array}
     */
    'block-closing-brace-newline-before': 'always',
    'block-opening-brace-newline-after': 'always',

    /**
     * Add empty line before comments.
     * Comments belong to folowing ruleblocks.
     */
    'comment-empty-line-before': 'always',

    /**
     * Add extra empty line between rule blocks
     */
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment']
      }
    ],

    /**
     * Attribute selector require quotes (consistency), like:
     *
     * [attribute="value"]
     */
    'selector-attribute-quotes': 'always'
  }
};
