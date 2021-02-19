import jsonld from '@app/scripts/jsonld.js';

import { importContext } from '@app/data/jsonld/appContext.js';
import collectionStore from '@app/stores/collectionStore.js';
import tests from '@app/stores/earl/testStore/index.js';
import { getCriterionById } from '@app/stores/wcagStore.js';

import { AssertionTypes, Assertion } from './models.js';

/**
 * Try to import Assertions from any JSON(-LD)
 * formatted file.
 * This can be a real pain to process due to the unknown
 * amount of Assertions available, depending on the creator
 * of these data files. It could be a few, but created with
 * automated test tools could be in the hundreds or thousands even.
 *
 * Roughly what we will be doing to be as performant as possible is:
 * - [x] Walk the imported assertions once! (Preparation);
 *  - [x] Check for required keys; test, subject, result.
 *  - [ ] Check if the test matches
 *  - [ ] Check if the subject matches
 *  - [ ] If all pass, add the assertion as importable and combine results for test + subject combination
 *
 * - [ ] Walk the importableAssertions (Import)
 *  - [ ] Get or create an assertion based on the test + subject.
 *  - [ ] Agregate result.outcome;
 *        If starting result.outcome is not failed
 *        change either to failed or cantTell.
 *
 *    - [ ] Finally aggregate to scope result outcome if changed to failed / cantTell.
 *
 *  - [ ] Append all result.description to the result.description.
 *
 * - Done
 *
 * @param  {[type]} json [description]
 * @return {[type]}      [description]
 */
export async function importAssertions(json) {
  let $tests;

  tests.subscribe((value) => {
    $tests = value;
  })();

  // Match against wcagStore > Test!
  function matchTest(test) {
    const { id, isPartOf } = test;
    const [, testID] = (isPartOf && isPartOf.id || id).split(':');
    const criterion = getCriterionById(testID);

    if (criterion) {
      return $tests.find(($test) => {
        return $test.num === criterion.num;
      });
    }

    return null;
  }

  function findMatch(Assertion) {
    const { test } = Assertion;
    const matchedTest = matchTest(test);

    if (matchedTest) {
      return {
        ...Assertion,
        test: matchedTest
      };
    }

    return false;
  }

  await jsonld
    .frame(json, {
      '@context': importContext,
      '@type': AssertionTypes
    })
    .then((framedAssertions) => {

      /**
       * importableAssertions
       * Create this:
       *  {
       *    [criterion.num]: [
       *      {
       *        type: ['TestSubject', 'Webpage'],
       *        id: 'http://...',
       *        title: '...',
       *        description: '...http://...',
       *        results: [
       *          {
       *            type: ['TestResult'],
       *            outcome: {...OutcomeValue...},
       *            description: 'observation...'
       *          },
       *          ...results
       *        ]
       *      },
       *      ...subjects
       *    ],
       *    ...tests
       *  }
       * @type {[type]}
       */
      const importableAssertions = jsonld
        .getItems(framedAssertions)

        // Prepare imports
        .reduce((_importable, _Assertion) => {
          // Check required assertion keys
          if (!_Assertion.test || !_Assertion.subject || !_Assertion.result) {
            return _importable;
          }

          const validatedAssertion = findMatch(_Assertion);

          _importable[_Assertion.test.id] = _Assertion;

          return _importable;
        }, {});

      console.log(importableAssertions);
    })
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      throw error;
    });
}

const initialAssertions = [];
const $assertions = collectionStore(Assertion, initialAssertions);

export default $assertions;
