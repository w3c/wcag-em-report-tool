import { derived } from 'svelte/store';
import { dictionary, locale, t as translate } from 'svelte-i18n';

import scopeStore from '../scopeStore.js';
import { wcag, VERSIONS } from '../wcagStore.js';

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
 * -
 * @todo
 *  Change to derived store;
 *  dependencies:
 *  - $locale / $dictionary
 *  - $scopeStore -> wcagVersion
 *
 *  This to autoupdate @id, title and description
 *  values of the tests.
 * -
 * @type {[TestCriterion]}
 */
const $tests = derived(
  [dictionary, locale, scopeStore, translate],
  ([$dictionary, $locale, $scopeStore, $translate]) => {
    const wcagVersion = $scopeStore['WCAG_VERSION'];
    const wcagLdIRI = `WCAG${wcagVersion.replace('.', '')}`;

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
      const wcagTranslationKey = 'WCAG.WCAG21.SUCCESS_CRITERION';
      let translateable;
      let translations = _test.locales[$locale];

      if (!translations) {
        translations = _test.locales[$locale] = {
          id: `${wcagLdIRI}:${$translate(`${wcagTranslationKey}.${_test.num}.ID`)}`,
          title: $translate(`${wcagTranslationKey}.${_test.num}.TITLE`),
          description: $translate(
            `${wcagTranslationKey}.${_test.num}.DESCRIPTION`
          ),

          // Get details from dictionary instead,
          // the amount of details vary per SC.
          details: Object.keys($dictionary[$locale])
            // Get ...DETAILS.DETAIL_#... entries
            .filter((key) => {
              return (
                key.indexOf(`${wcagTranslationKey}.${_test.num}.DETAILS`) >=
                  0 && key.indexOf('TITLE') >= 0
              );
            })
            .map((key) => {
              const detail = key.replace('.TITLE', '');

              return {
                title: $translate(`${detail}.TITLE`),
                description: $translate(`${detail}.DESCRIPTION`)
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
