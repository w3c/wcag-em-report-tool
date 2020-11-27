import { derived } from 'svelte/store';

import auditStore from '../auditStore.js';
import wcag from '../wcagStore.js';

import { TestRequirement } from './models.js';

/**
 * Lookup dictionairy for tests
 * {
 *    [version]: [
 *      {
 *        ...TestRequirement,
 *        num: '…',
 *        conformanceLevel: '…'
 *      }
 *    ]
 * }
 * @type {Object}
 */
const _tests = {};

const $tests = derived([auditStore], () => lookupTests);

function lookupTests(wcagVersion) {
  if (_tests[wcagVersion]) {
    return _tests[wcagVersion];
  }

  return createTests(wcagVersion);
}

function createTests(wcagVersion) {
  _tests[wcagVersion] = wcag[wcagVersion].map((criterion) => {
    const test = new TestRequirement();

    // Extend with wcag specific props
    Object.assign(test, criterion);

    return test;
  });

  return _tests[wcagVersion];
}

export default $tests;
