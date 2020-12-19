import jsonld from '../../../node_modules/jsonld/lib/jsonld.js';

import { derived } from 'svelte/store';
import { locale } from 'svelte-i18n';

import appJsonLdContext from '../jsonld/appContext.js';

// Import related stores and combine
import scopeStore from './scopeStore.js';
import exploreStore from './exploreStore.js';
import sampleStore from './sampleStore.js';
import summaryStore from './summaryStore.js';

import assertionStore from './earl/assertionStore.js';
import { subject } from './earl/subjectStore.js';

function downloadFile({ contents, name, type }) {
  const _a = document.createElement('a');
  const file = new Blob([contents], { type });

  _a.href = URL.createObjectURL(file);
  _a.download = name;

  _a.click();
}

const evaluationContext = {
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
  essentialFunctionality: 'wcagem:step2b',
  pageTypeVariety: 'wcagem:step2c',
  technologiesReliedUpon: 'wcagem:step2d',
  selectSample: 'wcagem:step3',
  structuredSample: 'wcagem:step3a',
  randomSample: 'wcagem:step3b',
  auditSample: 'wcagem:step4',
  reportFindings: 'wcagem:step5'
};

const evaluationTypes = [
  'Evaluation',

  // Fallbacktype for previous versions
  'wcagem:Evaluation'
];

class EvaluationModel {
  constructor() {
    this['@context'] = evaluationContext;
    this['@type'] = evaluationTypes[0];
    this['@language'] = 'en';

    this.defineScope = {
      // First subject === scope / website
      scope: {},
      wcagVersion: '2.1',
      conformanceTarget: 'AA'
    };

    this.exploreTarget = {
      technologiesReliedUpon: [],
      essentialFunctionality: '',
      pageTypeVariety: ''
    };

    this.selectSample = {
      randomSample: [],
      structuredSample: []
    };
    this.auditSample = [];
    this.reportFindings = {
      commissioner: '',
      date: new Date(),
      evaluator: '',
      specifics: '',
      summary: '',
      title: ''
    };
  }

  async open(openedEvaluation) {
    console.log('Opening evaluation');

    /**
     *  First save current data by copy
     *  to return to when loading fails.
     *
     */
    const previousEvaluation = this;
    let openedJsonld;
    let language;
    let wcagVersion;

    /**
     *  Apply jsonld conversion to make sure
     *  valid data is presented (expand > compact).
     *
     *  @note: In future we can try to be forgiving and add a simple
     *  fix by setting '@context' on the object before expanding to json-ld.
     *  (As if we were enriching plain json to json-ld).
     *
     *  Return on error, otherwise continue.
     */
    await jsonld
      .expand(openedEvaluation)
      .then((expanded) => {
        openedJsonld = expanded;
      })
      .catch((error) => {
        console.error(
          `[Open Evaluation]: An error ocured while expanding json-ld; ${error.message}`
        );

        openedJsonld = false;
      });

    if (!openedJsonld) {
      return;
    }

    /**
     *  (type: Evaluation; language)
     *  Read the language and set application language to it. Default to app default.
     *  (TestCriteria / WCAG versions differ between languages)
     */
    await jsonld
      .frame(openedJsonld, {
        '@context': evaluationContext,
        '@type': evaluationTypes
      })
      .then((result) => {
        language = result['@language'] || 'en';
      });

    return openedJsonld;
    /**
     *  Read / Determine the (asumed) wcagVersion
     *  - Read the first Assertion found and find the right test
     *    '@id's are translated here as well and supported WCAG versions
     *    are contained in @context. If WCAG version + id does not Match
     *    a fix on the data is required first, e.g. check other version of wcag.
     *
     *  Return on error or no matches found.
     */

    /**
     *  Ready to start loading: Remove current data set?
     */

    /**
     *  Read all samples (TestSubject, WebPage) and recreate.
     *  Replace the sample with the created one.
     */

    /**
     *  Read all Assertions
     *  For each Assertion:
     *  - Create a new appAssertion with Assertion values present in the assertionStore
     *    - Match tests by '@id'
     *    - Match subject by '@id'
     *    - Set result values; outcome and description
     *    - ...
     */

    /**
     * Read / set other values (scope, explore, sample, summary, ...)
     */

    /**
     * Open the evaluation/scope page
     */
  }

  save() {
    jsonld
      .compact(this, appJsonLdContext)
      .then((compacted) => {
        downloadFile({
          name: 'evaluation.json',
          type: 'application/json',
          contents: JSON.stringify(compacted)
        });
      })
      .catch((error) => {
        console.error(`An error occured: “${error.name}”\n${error.message}`);
      });
  }
}

const _evaluation = new EvaluationModel();

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

    _evaluation['@language'] = $locale;

    _evaluation.defineScope = {
      // First subject === scope / website
      scope: $subject(1),
      wcagVersion: WCAG_VERSION,
      conformanceTarget: CONFORMANCE_TARGET
    };

    _evaluation.exploreTarget = {
      technologiesReliedUpon: TECHNOLOGIES_RELIED_UPON,
      essentialFunctionality: ESSENTIAL_FUNCTIONALITY,
      pageTypeVariety: PAGE_TYPES
    };

    _evaluation.selectSample = {
      randomSample: RANDOM_SAMPLE,
      structuredSample: STRUCTURED_SAMPLE
    };

    _evaluation.auditSample = $assertionStore;

    _evaluation.reportFindings = {
      commissioner: EVALUATION_COMMISSIONER,
      date: EVALUATION_DATE,
      evaluator: EVALUATION_CREATOR,
      specifics: EVALUATION_SPECIFICS,
      summary: EVALUATION_SUMMARY,
      title: EVALUATION_TITLE
    };

    return _evaluation;
  },
  _evaluation
);
