import jsonld from '../../../node_modules/jsonld/lib/jsonld.js';

import { derived } from 'svelte/store';
import { locale } from 'svelte-i18n';

import appJsonLdContext, { importContext } from '../jsonld/appContext.js';
import webTechnologies from '../webtechnologies.json';

// Import related stores and combine
import { TestResult } from './earl/models.js';
import scopeStore, { initialScopeStore } from './scopeStore.js';
import exploreStore, { initialExploreStore } from './exploreStore.js';
import sampleStore, { initialSampleStore } from './sampleStore.js';
import summaryStore from './summaryStore.js';

import assertions from './earl/assertionStore.js';
import { outcomeValueStore as outcomeValues } from './earl/resultStore.js';
import subjects, { initialSubjectStore, TestSubjectTypes } from './earl/subjectStore/';
import tests from './earl/testStore.js';

function downloadFile({ contents, name, type }) {
  const _a = document.createElement('a');
  const file = new Blob([contents], { type });

  _a.href = URL.createObjectURL(file);
  _a.download = name;

  _a.click();
}

const evaluationContext = {
  // Dublin Core Terms
  dcterms: 'http://purl.org/dc/terms/',
  title: 'dcterms:title',
  description: 'dcterms:description',
  summary: 'dcterms:summary',
  date: {
    '@id': 'dcterms:date',
    '@type': 'W3CDTF'
  },
  W3CDTF: 'http://www.w3.org/TR/NOTE-datetime',

  // EARL
  earl: 'http://www.w3.org/ns/earl#',

  // WCAG Context
  WAI: 'http://www.w3.org/WAI/',
  WCAG20: 'http://www.w3.org/TR/WCAG20/#',
  WCAG21: 'http://www.w3.org/TR/WCAG21/#',
  wcagVersion: 'WAI:standards-guidelines/wcag/#versions',

  // WCAG-EM Context
  wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
  Evaluation: 'wcagem:procedure',
  defineScope: 'wcagem:step1',
  scope: 'wcagem:step1a',
  conformanceTarget: 'wcagem:step1b',
  accessibilitySupportBaseline: 'wcagem:step1c',
  additionalEvaluationRequirements: 'wcagem:step1d',
  exploreTarget: 'wcagem:step2',
  essentialFunctionality: 'wcagem:step2b',
  pageTypeVariety: 'wcagem:step2c',
  technologiesReliedUpon: 'wcagem:step2d',
  selectSample: 'wcagem:step3',
  structuredSample: 'wcagem:step3a',
  randomSample: 'wcagem:step3b',
  auditSample: 'wcagem:step4',
  reportFindings: 'wcagem:step5',
  documentSteps: 'wcagem:step5a',
  commissioner: 'wcagem:commissioner',
  evaluationSpecifics: 'wcagem:step5b'
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
      '@id': '_:defineScope',
      // First subject === scope / website
      scope: {
        // WEBSITE_NAME
        title: '',

        // WEBSITE_SCOPE
        description: ''
      },
      wcagVersion: '2.1',
      conformanceTarget: 'AA'
    };

    this.exploreTarget = {
      '@id': '_:exploreTarget',
      technologiesReliedUpon: [],
      essentialFunctionality: '',
      pageTypeVariety: ''
    };

    this.selectSample = {
      '@id': '_:selectSample',
      randomSample: [],
      structuredSample: []
    };
    this.auditSample = [];
    this.reportFindings = {
      documentSteps: [
        {
          '@id': '_:about'
        },
        { '@id': '_:defineScope' },
        { '@id': '_:exploreTarget' },
        { '@id': '_:selectSample' }
      ],
      commissioner: '',
      date: new Date(),
      evaluator: '',
      evaluationSpecifics: '',
      summary: '',
      title: ''
    };
  }

  reset() {
    scopeStore.update(() => {
      return { ...initialScopeStore };
    });

    assertions.update(() => []);
    sampleStore.update(() => initialSampleStore);
    exploreStore.update(() => initialExploreStore);
    subjects.update(() => initialSubjectStore);
  }

  async open(openedEvaluation) {
    /**
     *  First save current data by copy
     *  to return to when loading fails.
     *
     */
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

    await this.reset();

    /**
     *  Frame the Evaluation object
     *  and read info:
     *  - language
     *  - wcagVersion
     *  - defineScope
     *  - exploreTarget
     *  - selectSample
     *  - auditSample
     *  - reportFindings
     */
    await jsonld
      .frame(openedJsonld, {
        '@context': importContext,
        '@type': evaluationTypes
      })
      .then((framedEvaluation) => {
        let $subjects;
        const unscribeSubjects = subjects.subscribe((value) => {
          $subjects = value;
        });

        let $tests;
        const unscribeTests = tests.subscribe((value) => {
          $tests = value;
        });

        let $outcomeValues;
        const unscribeOutcomeValues = outcomeValues.subscribe((value) => {
          $outcomeValues = value;
        });

        let {
          auditSample,
          defineScope,
          exploreTarget,
          reportFindings,
          selectSample
        } = framedEvaluation;

        if (!auditSample) {
          auditSample = [];
        }

        if (!defineScope) {
          defineScope = {};
        }

        if (!exploreTarget) {
          exploreTarget = {};
        }

        if (!reportFindings) {
          reportFindings = {};
        }

        if (!selectSample) {
          selectSample = {};
        }

        language = framedEvaluation.language || 'en';
        locale.set(language);

        wcagVersion = defineScope.wcagVersion || '2.1';

        /**
         * Start setting values from the imported json-ld.
         * Any key that is defined in appContext
         * can be accessed, if not present the Context
         * should be updated as well with new or deprecated values.
         */
        scopeStore.update((value) => {
          const scopeSubject = $subjects.find(($subject) => $subject.ID === 1);
          const openedScope =
            defineScope.scope ||
            defineScope.DfnSetOfWebpagesWcag21 ||
            defineScope.DfnSetOfWebpagesWcag20;

          scopeSubject.id = openedScope.id;

          return Object.assign(value, {
            ADDITIONAL_REQUIREMENTS:
              defineScope.additionalEvaluationRequirements || '',
            AS_BASELINE: defineScope.accessibilitySupportBaseline || '',
            CONFORMANCE_TARGET: defineScope.conformanceTarget || 'AA',
            SITE_NAME:
              openedScope.title ||
              // Deprecated
              openedScope['schema:name'] ||
              // Default
              '',
            WEBSITE_SCOPE:
              openedScope.description ||
              // Deprecated
              openedScope.scope ||
              // Default
              ''
          });
        });

        exploreStore.update((value) => {
          const technologies =
            exploreTarget.technologiesReliedUpon ||
            framedEvaluation.DfnReliedUponTechnologyWcag21 ||
            [];

          return Object.assign(value, {
            TECHNOLOGIES_RELIED_UPON: technologies.map((tech) => tech.title),
            ESSENTIAL_FUNCTIONALITY:
              exploreTarget.essentialFunctionality ||
              framedEvaluation.essentialFunctionality ||
              '',
            PAGE_TYPES:
              exploreTarget.pageTypeVariety ||
              framedEvaluation.pageTypeVariety ||
              ''
          });
        });

        sampleStore.update(() => {
          let structuredSample =
            selectSample.structuredSample ||
            // Deprecated / previous versions
            framedEvaluation.structuredSample.DfnWebpageWcag21 ||
            framedEvaluation.structuredSample.DfnWebpageWcag20 ||
            // Default
            [];

          let randomSample =
            selectSample.randomSample ||
            // Deprecated / previous versions
            framedEvaluation.randomSample.DfnWebpageWcag21 ||
            framedEvaluation.randomSample.DfnWebpageWcag20 ||
            // Default
            [];

          if (!Array.isArray(structuredSample)) {
            structuredSample = [structuredSample];
          }

          if (!Array.isArray(randomSample)) {
            randomSample = [randomSample];
          }

          return {
            STRUCTURED_SAMPLE: structuredSample.map((sample) => {
              sample.type = 'Webpage';

              return subjects.create(sample);
            }),
            RANDOM_SAMPLE: randomSample.map((sample) => {
              sample.type = 'Webpage';

              return subjects.create(sample);
            })
          };
        });

        summaryStore.update((value) => {
          return Object.assign(value, {
            EVALUATION_TITLE: reportFindings.title || '',
            EVALUATION_COMMISSIONER:
              reportFindings.commissioner ||
              framedEvaluation.commissioner ||
              '',
            EVALUATION_CREATOR: reportFindings.evaluator || '',
            EVALUATION_DATE: reportFindings.date || '',
            EVALUATION_SUMMARY:
              reportFindings.summary || framedEvaluation.summary || '',
            EVALUATION_SPECIFICS:
              reportFindings.evaluationSpecifics ||
              framedEvaluation.evaluationSpecifics ||
              ''
          });
        });

        (function importAssertions(_assertions) {
          _assertions.forEach((assertion) => {

            const { assertedBy, mode, result, subject, test } = assertion;
            const newSubject = $subjects.find(($subject) => {
              return $subject.id === subject.id;
            });

            let newResult = result ? new TestResult(result) : new TestResult();
            newResult.outcome = $outcomeValues.find(($outcomeValue) => {
              return $outcomeValue.id === newResult.outcome.id;
            });

            const newTest = $tests.find(($test) => {
              const _test = test
                ? test
                // In previous versions a testcase was set on Assertions
                // that was part of the main Assertion
                : assertion.testcase || {};

              const _testId = _test.id || _test;
              const scID = _testId.split(':')[1];

              return (
                $test.id === _test.id ||
                // fallback for bad implemented testIRI
                ($test.id.indexOf(scID) >= 0 && _testId.indexOf(scID) >= 0)
              );
            });

            if (newSubject && newTest) {
              assertions.create({
                assertedBy,
                mode,
                result: newResult,
                subject: newSubject,
                test: newTest
              });
            }

            if (assertion.hasPart && Array.isArray(assertion.hasPart)) {
              importAssertions(assertion.hasPart);
            }
          });
        })(auditSample);

        unscribeSubjects();
        unscribeTests();
        unscribeOutcomeValues();
      });

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
    assertions,
    locale,
    subjects,
    scopeStore,
    exploreStore,
    sampleStore,
    summaryStore
  ],
  ([
    $assertions,
    $locale,
    $subjects,
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

    Object.assign(_evaluation.defineScope, {
      // First subject === scope / website
      scope: $subjects.find(($subject) => {
        return $subject.type.indexOf(TestSubjectTypes.WEBSITE) >= 0;
      }),
      wcagVersion: WCAG_VERSION,
      conformanceTarget: CONFORMANCE_TARGET
    });

    Object.assign(_evaluation.exploreTarget, {
      technologiesReliedUpon: webTechnologies.filter(
        (tech) => TECHNOLOGIES_RELIED_UPON.indexOf(tech.title) >= 0
      ),
      essentialFunctionality: ESSENTIAL_FUNCTIONALITY,
      pageTypeVariety: PAGE_TYPES
    });

    Object.assign(_evaluation.selectSample, {
      randomSample: RANDOM_SAMPLE,
      structuredSample: STRUCTURED_SAMPLE
    });

    _evaluation.auditSample = $assertions;

    Object.assign(_evaluation.reportFindings, {
      commissioner: EVALUATION_COMMISSIONER,
      date: EVALUATION_DATE,
      evaluator: EVALUATION_CREATOR,
      evaluationSpecifics: EVALUATION_SPECIFICS,
      summary: EVALUATION_SUMMARY,
      title: EVALUATION_TITLE
    });

    return _evaluation;
  },
  _evaluation
);
