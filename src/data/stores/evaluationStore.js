import { derived } from 'svelte/store';

// Import related stores and combine
import scopeStore from './scopeStore.js';
import exploreStore from './exploreStore.js';
import sampleStore from './sampleStore.js';
import summaryStore from './summaryStore.js';

export default derived([
  scopeStore,
  exploreStore,
  sampleStore,
  summaryStore
], (
  $scopeStore,
  $exploreStore,
  $sampleStore,
  $summaryStore
) => {
  return {
    language: '',
    defineScope: {
      scope: {
        // TestSubject with type WebSite
      },

      // https://www.w3.org/WAI/standards-guidelines/wcag/#versions
      wcagVersion: '',
      conformanceTarget: '',

    },
    exploreTarget: {
      technologiesReliedUpon: [],
      essentialFunctionality: '',
      pageTypeVariety: ''
    },
    selectSample: {
      structuredSample: [],
      randomSample: []
    },
    auditSample: [
      // earl:Assertion collection
    ],
    report: {
      evaluator: {
        // Agent / earl:MainAssertor
      },
      commissioner: {
        // Agent / earl:Assertor?
      },
      date: ''
    }
  };
});
