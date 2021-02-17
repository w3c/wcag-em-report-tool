import collection from '@app/stores/collectionStore.js';
import { wcagCriteriaDictionary, WCAG_VERSIONS } from '@app/stores/wcagStore.js';

import { TestRequirement } from './models.js';

/**
 * initialTestStore
 *
 * Set initial tests with latest wcag criteria.
 * Add num(bering) property for internal matching.
 * @type {Array}
 */
const initialTestStore = wcagCriteriaDictionary[WCAG_VERSIONS.slice(-1)].map((criterion) => {
  const newTest = new TestRequirement(criterion);

  newTest.num = criterion.num;

  return newTest;
});

/**
 * $tests
 *
 * Set of earl.TestCriterion,
 * - TestRequirement
 * @todo
 * - TestCase
 *
 * @type {Array[TestCriterion]}
 */
const $tests = collection(TestRequirement, initialTestStore);

export default $tests;
