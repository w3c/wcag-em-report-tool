/**
 * Lint Staged configuration
 * https://github.com/okonet/lint-staged
 */

module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
};
