import { readable } from 'svelte/store';

import { wcag, VERSIONS } from '../wcagStore.js';

import { TestRequirement } from './models.js';

/**
 * Initial tests created with latest wcag 2
 * @NOTE
 * If there would arrive a new wcag version
 * that is not compatible with previous versions, e.g.
 * WCAG 3.0... this should be updated!
 */
let _tests = wcag[VERSIONS[0]].map((criterion) => {
  const test = new TestRequirement();

  // Extend with wcag specific props
  Object.assign(test, criterion);

  return test;
});

// Push version data to tests
VERSIONS.forEach((version) => {
  wcag[version].forEach((criterion) => {
    const matchedTest = _tests.find((_test) => _test.num === criterion.num);

    if (!matchedTest) {
      return;
    }

    if (!matchedTest.version) {
      matchedTest.version = [version];
    } else {
      matchedTest.version.push(version);
    }
  });
});


const $tests = readable(_tests);
export default $tests;
