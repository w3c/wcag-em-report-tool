import { derived } from 'svelte/store';

import auditStore from './auditStore.js';

// import wcag data here
import WCAG20 from 'data/wcag/WCAG20.json';
import WCAG21 from 'data/wcag/WCAG21.json';

export const wcag = {
  '2.1': WCAG21,
  '2.0': WCAG20
};

export const newInWcag = {};

/* For every new wcag 2.x version,
 * add an entry for “only in new version” here.
 */
Object.keys(wcag).reverse().reduce((previous, current, index) => {
  // Skip first
  if (index === 0) {
    return current;
  }

  const newInCurrent = wcag[current].filter(
    (currentSc) => !wcag[previous].some((previousSc) => currentSc.num === previousSc.num)
  );

  newInWcag[`${current}`] = newInCurrent;

  // Return the current to set a previous version!
  return current;
}, '');


export const CONFORMANCE_LEVELS = ['A', 'AA', 'AAA'];

export const VERSIONS = ['2.1', '2.0'];

export default derived([auditStore], () => {
  return function lookupWCAG(version) {
    if (!wcag[version]) {
      return wcag['2.1'];
    }

    return wcag[version];
  };
});
