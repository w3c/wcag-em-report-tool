import { derived } from 'svelte/store';
import { locale, dictionary } from 'svelte-i18n';

import auditStore from '../auditStore.js';
import wcag from '../wcagStore.js';

import { TestRequirement } from './models.js';

/**
 * Lookup dictionairy for tests
 * {
 *  [locale]: {
 *    [version]: [
 *      {
 *        ID: '#.#.#',
 *        title: '…',
 *        description: '…',
 *        details: [
 *          {
 *            title: '…',
 *            description: '…'
 *          }
 *        ]
 *      }
 *    ]
 *  }
 * }
 * @type {Object}
 */
const _tests = {};

const $tests = derived([auditStore, locale], () => lookupTests);

function lookupTests(wcagVersion) {
  let langCode;

  const unsubscribeLocale = locale.subscribe((value) => {
    langCode = value;
  });
  unsubscribeLocale();

  if (_tests[langCode] && _tests[langCode][wcagVersion]) {
    return _tests[langCode][wcagVersion];
  }

  return createTests(langCode, wcagVersion);
}

function createTests(locale, wcagVersion) {
  const translationVersion = `WCAG${wcagVersion.replace(/[+.]/g, '')}`;
  let translations;
  const unsubscribeDictionary = dictionary.subscribe((value) => {
    translations = value[locale];
  });

  unsubscribeDictionary();

  if (!_tests[locale]) {
    _tests[locale] = {};
  }

  _tests[locale][wcagVersion] = wcag[wcagVersion].map((criterion) => {
    const test = new TestRequirement({
      title:
        translations[
          `WCAG.${translationVersion}.SUCCESS_CRITERION.${criterion.num}.TITLE`
        ],
      description:
        translations[
          `WCAG.${translationVersion}.SUCCESS_CRITERION.${criterion.num}.DESCRIPTION`
        ]
    });

    // Extend with wcag specific props
    Object.assign(test, {
      num: criterion.num,
      conformanceLevel: criterion.conformanceLevel
    });

    return test;
  });

  return _tests[locale][wcagVersion];
}

export default $tests;
