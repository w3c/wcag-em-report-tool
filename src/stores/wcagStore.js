import { derived } from 'svelte/store';

import scopeStore from '@app/stores/scopeStore.js';
import wcagCriteriaData from '@app/data/wcag.json';

export const CONFORMANCE_LEVELS = ['A', 'AA', 'AAA'];

export const VERSIONS = Object.keys(wcagCriteriaData);

const _wcagCriteria = VERSIONS.reduce((result, version) => {
  const versionedCriteria = [];
  let criterion;

  for (criterion in wcagCriteriaData[version]) {
    versionedCriteria.push({
      ...wcagCriteriaData[version][criterion],
      version
    });
  }

  return [...result, ...versionedCriteria];
}, []);

export const wcag = derived([scopeStore], ([$scopeStore]) => {
  const wcagVersion = $scopeStore['WCAG_VERSION'];

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

  return result.sort((a, b) => {
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
});

export default wcag;
