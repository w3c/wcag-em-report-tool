/**
 * ESLint configuration
 * https://eslint.org/docs/rules/
 *
 * @TODO Check if this is the desired setup,
 * "eject" otherwise.
 */
module.exports = {
  extends: [
    // Extending Airbnb config and adds a lot off options
    '@open-wc/eslint-config',

    // Leave this at the bottom
    // to ensure prettier options
    // are disabled in eslint.
    'eslint-config-prettier',
  ],
};
