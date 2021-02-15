import { derived } from 'svelte/store';
import { json, locale } from 'svelte-i18n';

import scopeStore from '@app/stores/scopeStore.js';
import wcagCriteriaData from '@app/data/wcag.json';

export const CONFORMANCE_LEVELS = ['A', 'AA', 'AAA'];

export const WCAG_VERSIONS = Object.keys(wcagCriteriaData);

export const scopedWcagVersions = derived([scopeStore], ([$scopeStore]) => {
  const {WCAG_VERSION} = $scopeStore;

  return WCAG_VERSIONS.filter((version) => {
    return version <= WCAG_VERSION;
  });
});


const _wcagCriteria = WCAG_VERSIONS.reduce((result, version) => {
  const versionedCriteria = [];
  let criterion;

  for (criterion in wcagCriteriaData[version]) {
    versionedCriteria.push({
      ...wcagCriteriaData[version][criterion],
      version,
      locales: {}
    });
  }

  return [...result, ...versionedCriteria];
}, []).sort((a, b) => {
  const [ap, ag, ac] = a.num.split('.').map((str) => parseInt(str, 10));
  const [bp, bg, bc] = b.num.split('.').map((str) => parseInt(str, 10));

  if (ap > bp) {
    return 1;
  }

  if (ap < bp) {
    return -1;
  }

  if (ag > bg) {
    return 1;
  }

  if (ag < bg) {
    return -1;
  }

  if (ac > bc) {
    return 1;
  }

  if (ac < bc) {
    return -1;
  }

  return -1;
});

export const wcag = derived(
  [json, locale, scopeStore],
  ([$json, $locale, $scopeStore]) => {
    const wcagVersion = $scopeStore['WCAG_VERSION'];
    const translatedWcagCriteria = $json('WCAG.SUCCESS_CRITERION');

    // Add translations
    _wcagCriteria.forEach((_criterion) => {
      let translated = _criterion.locales[$locale];
      const { TITLE, DESCRIPTION, DETAILS } =
        translatedWcagCriteria[_criterion.num] || {};

      if (!translated) {
        translated = _criterion.locales[$locale] = {
          title: TITLE,
          description: DESCRIPTION,
          details:
            DETAILS &&
            Object.keys(DETAILS).map((key) => {
              const detail = DETAILS[key];

              return {
                title: detail.TITLE,
                description: detail.DESCRIPTION
              };
            })
        };
      }

      // Update translation
      for (let key in translated) {
        if (Object.prototype.hasOwnProperty.call(translated, key)) {
          _criterion[key] = translated[key];
        }
      }
    });

    const result = _wcagCriteria.reduce((_result, criterion) => {
      // Skip pushing criterion if version does not match
      if (criterion.version > wcagVersion) {
        return _result;
      }

      // Filter out duplicate criterion,
      // last version owns the criterion
      const newResult = _result.filter((_criterion) => {
        return _criterion.num !== criterion.num;
      });

      if (criterion.version <= wcagVersion) {
        newResult.push(criterion);
      }

      return newResult;
    }, []);

    return result;
  }
);

export default wcag;
