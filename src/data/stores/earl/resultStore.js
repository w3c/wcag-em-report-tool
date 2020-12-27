import { derived } from 'svelte/store';

import { locale, t as translate } from 'svelte-i18n';


import { OUTCOME } from './models.js';

const _outcomeValues = Object.keys(OUTCOME).map((key) => {
  return {
    ...OUTCOME[key],
    key,
    title: '',
    locales: {}
  };
});

export const outcomeValueStore = derived(
  [locale, translate],
  ([$locale, $translate]) => {
    // add translations to locales property like:
    // {
    //  [locale]: {
    //    title: translation,
    //  }
    // }
    // Then set title to locales.locale.title
    _outcomeValues.forEach((_outcomeValue) => {

      if (!_outcomeValue.locales[$locale]) {
        _outcomeValue.locales[$locale] = {
          title: $translate(`UI.EARL.${_outcomeValue.key}`)
        };
      }

      _outcomeValue.title = _outcomeValue.locales[$locale].title;
    });

    return _outcomeValues;
  },
  _outcomeValues
);

export default {};
