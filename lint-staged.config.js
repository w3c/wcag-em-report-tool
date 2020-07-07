/**
 * Lint Staged configuration
 * https://github.com/okonet/lint-staged
 * @type {Object}
 */

module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
};
