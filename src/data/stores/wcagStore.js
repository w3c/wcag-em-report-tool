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

export default wcag;
