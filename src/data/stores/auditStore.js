/**
 * auditStore
 * ==========
 * This is the most complex store.
 * Assertions are created here and are derived from:
 * - scopeStore; scope
 * - scopeStore; wcag version
 * - sampleStore; assertions created from samples
 *
 * The actual assertions is set internally and returned to components.
 * This could then be split up into other derivedStores
 * for performance reasons:
 * - toggled samples to evaluate
 * - filtered by level, version
 */
import { derived, get, writable } from 'svelte/store';

import wcagStore from './wcagStore.js';

import { AssertionModel, TestResultModel } from '../earl.js';


export const auditFilter = writable({
  LEVEL: [],
  VERSION: []
});

const assertions = [];
get(wcagStore).forEach((test, index) => {
  const newAssertion = Object.create(AssertionModel);
  newAssertion.id = `assertion__${index}`;
  newAssertion.test = test;
  newAssertion.subject = {
    type: ['TestSubject', 'WebSite'],
  };
  newAssertion.result = Object.create(TestResultModel);
  assertions.push(newAssertion);
});

export const filteredAssertions = derived(
  auditFilter,
  ($auditFilter) => {
    return assertions.filter((a) => {
      return $auditFilter['LEVEL'].indexOf(a.test.conformanceLevel) >= 0;
    });
  }
);

export default writable({
  'ASSERTIONS': assertions,
  'DETAILS_OPEN': {}
});
