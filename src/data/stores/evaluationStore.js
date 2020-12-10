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
      '@context': {
        // EARL
        earl: 'http://www.w3.org/ns/earl#',

        // WCAG Context
        WCAG20: 'http://www.w3.org/TR/WCAG20/#',
        WCAG21: 'http://www.w3.org/TR/WCAG21/#',
        wcagVersion: 'http://www.w3.org/WAI/standards-guidelines/wcag/#versions',

        // WCAG-EM Context
        wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
        Evaluation: 'wcagem:procedure',
        defineScope: 'wcagem:step1',
        scope: 'wcagem:step1a',
        conformanceTarget: 'wcagem:step1b',
        exploreTarget: 'wcagem:step2',
        essentialFunctionality: 'step2b',
        pageTypeVariety: 'step2c',
        technologiesReliedUpon: 'step2d',
        selectSample: 'wcagem:step3',
        structuredSample: 'wcagem:step3a',
        randomSample: 'wcagem:step3b',
        auditSample: {
          '@id': 'wcagem:step4',
          '@type': 'earl:Assertion'
        },
        reportFindings: 'wcagem:step5'
      },
      '@type': 'Evaluation',
      '@language': $locale,
      defineScope: {
        // First subject === scope / website
        scope: $subject(1),
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
      reportFindings: {
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
