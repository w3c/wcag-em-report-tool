import collection from '@app/stores/collectionStore.js';

import { TestRequirement } from './models.js';

const _tests = [];

/**
 * Set of earl.TestCriterion
 * @type {[TestCriterion]}
 */
const $tests = collection(TestRequirement, _tests);
export default $tests;
