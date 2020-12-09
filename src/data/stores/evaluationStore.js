import { derived } from 'svelte/store';
import { locale } from 'svelte-i18n';

// Import related stores and combine
import scopeStore from './scopeStore.js';
import exploreStore from './exploreStore.js';
import sampleStore from './sampleStore.js';
import summaryStore from './summaryStore.js';

import assertionStore from './earl/assertionStore.js';
import { subject } from './earl/subjectStore.js';

export default derived(
  [
    assertionStore,
    locale,
    subject,
    scopeStore,
    exploreStore,
    sampleStore,
    summaryStore
  ],
  ([
    $assertionStore,
    $locale,
    $subject,
    $scopeStore,
    $exploreStore,
    $sampleStore,
    $summaryStore
  ]) => {
    const { CONFORMANCE_TARGET, WCAG_VERSION } = $scopeStore;
    const { RANDOM_SAMPLE, STRUCTURED_SAMPLE } = $sampleStore;

    const {
      EVALUATION_CREATOR,
      EVALUATION_COMMISSIONER,
      EVALUATION_DATE,
      EVALUATION_SPECIFICS,
      EVALUATION_SUMMARY,
      EVALUATION_TITLE
    } = $summaryStore;

    const {
      ESSENTIAL_FUNCTIONALITY,
      PAGE_TYPES,
      TECHNOLOGIES_RELIED_UPON
    } = $exploreStore;

    return {
      language: $locale,
      defineScope: {
        // First subject === scope / website
        scope: $subject(1),

        // https://www.w3.org/WAI/standards-guidelines/wcag/#versions
        wcagVersion: WCAG_VERSION,
        conformanceTarget: CONFORMANCE_TARGET
      },
      exploreTarget: {
        technologiesReliedUpon: TECHNOLOGIES_RELIED_UPON,
        essentialFunctionality: ESSENTIAL_FUNCTIONALITY,
        pageTypeVariety: PAGE_TYPES
      },
      selectSample: {
        randomSample: RANDOM_SAMPLE,
        structuredSample: STRUCTURED_SAMPLE
      },
      auditSample: $assertionStore,
      report: {
        commissioner: EVALUATION_COMMISSIONER,
        date: EVALUATION_DATE,
        evaluator: EVALUATION_CREATOR,
        specifics: EVALUATION_SPECIFICS,
        summary: EVALUATION_SUMMARY,
        title: EVALUATION_TITLE
      }
    };
  }
);
