import { derived } from 'svelte/store';

import { locale, t as translate } from 'svelte-i18n';

import { OutcomeValue } from './models.js';

// Create outcomeValues
const PASSED = new OutcomeValue({
  '@id': 'earl:passed',
  type: 'Pass'
});

const FAILED = new OutcomeValue({
  '@id': 'earl:failed',
  type: 'Fail'
});

const CANT_TELL = new OutcomeValue({
  '@id': 'earl:cantTell',
  type: 'CannotTell'
});

const INAPPLICABLE = new OutcomeValue({
  '@id': 'earl:inapplicable',
  type: 'NotApplicable'
});

const UNTESTED = new OutcomeValue({
  '@id': 'earl:untested',
  type: 'NotTested'
});

const OUTCOME = {
  PASSED,
  FAILED,
  CANT_TELL,
  INAPPLICABLE,
  UNTESTED
};

const _outcomeValues = [PASSED, FAILED, CANT_TELL, INAPPLICABLE, UNTESTED];

export const outcomeValueStore = derived(
  [locale, translate],
  ([$locale, $translate]) => {
    const outcomeKeys = Object.keys(OUTCOME);

    // Set locales property
    if (!Object.prototype.hasOwnProperty.call(_outcomeValues[0], 'locales')) {
      _outcomeValues.forEach((_outcomeValue) => {
        // add a locales property containing
        // translations for translateable properties
        _outcomeValue.locales = {};
      });
    }

    // add translations to locales property like:
    // {
    //  [locale]: {
    //    title: translation,
    //  }
    // }
    // Then set title to locales.locale.title
    outcomeKeys.forEach((outcomeKey, index) => {
      const _outcomeValue = _outcomeValues[index];

      if (!_outcomeValue.locales[$locale]) {
        _outcomeValue.locales[$locale] = {
          title: $translate(`UI.EARL.${outcomeKey}`)
        };
      }

      _outcomeValue.title = _outcomeValue.locales[$locale].title;
    });

    return _outcomeValues;
  },
  _outcomeValues
);

export default {};
