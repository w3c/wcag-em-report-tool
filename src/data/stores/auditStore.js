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
import { derived, writable } from 'svelte/store';

// wcag data
import WCAG20 from '../wcag/WCAG20.json';
import WCAG21 from '../wcag/WCAG21.json';

// dependent stores
import scopeStore from './scopeStore.js';

export const assertionPrototype = {
  assertedBy: {},
  id: '',
  mode: {},
  result: {},
  subject: {},
  test: {}
};

const assertions = writable([]);

export const testrequirements = derived(scopeStore, ($scopeStore) => {
  const { WCAG_VERSION } = $scopeStore;

  switch (WCAG_VERSION) {
    case 'WCAG20':
      return WCAG20;

    case 'WCAG21':
    default:
      return WCAG21;
  }
});

export const auditFilter = writable({
  LEVEL: [],
  VERSION: []
});

export const filteredAssertions = derived(
  [testrequirements, auditFilter],
  ([$testrequirements, $auditFilter]) => {
    return $testrequirements.filter((a) => {
      return $auditFilter['LEVEL'].indexOf(a.conformanceLevel) >= 0;
    });
  }
);

export default writable({
  'ASSERTIONS': []
});
