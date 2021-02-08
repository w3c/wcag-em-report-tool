import { derived } from 'svelte/store';
import { json, locale } from 'svelte-i18n';

import scopeStore from 'stores/scopeStore.js';
import { wcag, VERSIONS } from 'stores/wcagStore.js';

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

// Add version data to tests
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

/**
 * Set of earl.TestCriterion
 * @type {[TestCriterion]}
 */
const $tests = derived(
  [json, locale, scopeStore],
  ([$json, $locale, $scopeStore]) => {
    const wcagVersion = $scopeStore['WCAG_VERSION'];
    const wcagLdIRI = `WCAG${wcagVersion.replace('.', '')}`;
    // const wcagTranslationKey = `WCAG.${wcagLdIRI}.SUCCESS_CRITERION`;
    const wcagTranslationKey = 'WCAG.WCAG21.SUCCESS_CRITERION';
    const criteria = $json(wcagTranslationKey);

    // Set locales property
    if (
      _tests.length > 0 &&
      !Object.prototype.hasOwnProperty.call(_tests[0], 'locales')
    ) {
      _tests.forEach((_test) => {
        // add a locales property containing
        // translations for translateable properties
        _test.locales = {};
      });
    }

    // Get or set translations like:
    // {
    //  [locale]: {
    //    title: translation,
    //    description: translation,
    //    details: [translation],
    //  }
    // }
    // Then set title to locales.locale.title
    _tests.forEach((_test) => {
      let translateable;
      let translations = _test.locales[$locale];
      const translatedCriterion = criteria[_test.num];

      if (!translations) {
        translations = _test.locales[$locale] = {
          id: translatedCriterion.ID,
          title: translatedCriterion.TITLE,
          description: translatedCriterion.DESCRIPTION,

          // Get details from dictionary instead,
          // the amount of details vary per SC.
          details: Object.keys(translatedCriterion.DETAILS).map((key) => {
            const detail = translatedCriterion.DETAILS[key];

            return {
              title: detail.TITLE,
              description: detail.DESCRIPTION
            };
          })
        };
      }

      // Translate all
      for (translateable in translations) {
        if (Object.prototype.hasOwnProperty.call(translations, translateable)) {
          _test[translateable] = translations[translateable];
        }
      }
    });

    return _tests;
  },
  _tests
);
export default $tests;
