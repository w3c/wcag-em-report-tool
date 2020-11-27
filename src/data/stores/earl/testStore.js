import { derived } from 'svelte/store';

import auditStore from '../auditStore.js';
import wcagStore, { VERSIONS } from '../wcagStore.js';

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
  if (VERSIONS.indexOf(wcagVersion) === -1) {
    wcagVersion = VERSIONS[0];
  }

  if (_tests[wcagVersion]) {
    return _tests[wcagVersion];
  }

  return createTests(wcagVersion);
}

function createTests(wcagVersion) {
  let wcag;
  const unscribeWCAG = wcagStore.subscribe((get) => {
    wcag = get(wcagVersion);
  });
  unscribeWCAG();

  _tests[wcagVersion] = wcag.map((criterion) => {
    const test = new TestRequirement();

    // Extend with wcag specific props
    Object.assign(test, criterion);

    return test;
  });

  return _tests[wcagVersion];
}

export default $tests;
