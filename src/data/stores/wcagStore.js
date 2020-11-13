import { derived } from 'svelte/store';

// import dependent scopeStore
import scopeStore from './scopeStore.js';

// import wcag data
import WCAG20 from '../wcag/WCAG20.json';
import WCAG21 from '../wcag/WCAG21.json';

const wcag = derived(scopeStore, ($scopeStore) => {
  switch ($scopeStore['WCAG_VERSION']) {
    case 'WCAG20':
      return WCAG20;

    case 'WCAG21':
    default:
      return WCAG21;
  }
});

export const newInWcag = {
  2.1: WCAG21.filter(
    (newsc) => !WCAG20.some((oldsc) => newsc.num === oldsc.num)
  )
};

export const CONFORMANCE_LEVELS = [
  'A',
  'AA',
  'AAA'
];

export const VERSIONS = [
  '2.1',
  '2.0'
];

export default wcag;
