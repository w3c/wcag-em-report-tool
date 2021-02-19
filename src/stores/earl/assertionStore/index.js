import jsonld from '@app/scripts/jsonld.js';

import { getURL, isURL } from '@app/scripts/urls.js';
import { importContext } from '@app/data/jsonld/appContext.js';

import collectionStore from '@app/stores/collectionStore.js';
import subjects from '@app/stores/earl/subjectStore/index.js';
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
 *  - [x] Check if the test matches
 *  - [x] Check if the subject matches; check urlizable props and match against id
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
  let $subjects;
  let $tests;

  subjects.subscribe((value) => {
    $subjects = value;
  })();

  tests.subscribe((value) => {
    $tests = value;
  })();

  function matchSubject(subject) {
    const idUrl = getURL(subject.id);
    const subjectID = idUrl
      ? idUrl.href
      : ['source', 'description'].reduce((href, key) => {
        if (isURL(href)) {
          return href;
        }

        let url;

        if (subject[key]) {
          url = getURL(subject[key]);
        }

        return url ? url.href : null;
      }, '');

    if (isURL(subjectID)) {
      subject.id = subjectID;

      return $subjects.find(($subject) => {
        return $subject.id === subject.id;
      });
    }

    return null;
  }

  // Match against wcagStore > Test!
  function matchTest(test) {
    const { id, isPartOf } = test;
    const [, testID] = ((isPartOf && isPartOf.id) || id).split(':');
    const criterion = getCriterionById(testID);

    if (criterion) {
      return $tests.find(($test) => {
        return $test.num === criterion.num;
      });
    }

    return null;
  }

  function findMatch(Assertion) {
    const { test, subject } = Assertion;
    const matchedTest = matchTest(test);
    const matchedSubject = matchSubject(subject);

    if (matchedTest && matchedSubject) {
      return {
        subject: matchedSubject.id,
        num: matchedTest.num,
        result: Assertion.result
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

          const matchedResult = findMatch(_Assertion);


          if (matchedResult) {
            if (!_importable[matchedResult.num]) {
              _importable[matchedResult.num] = [];
            }

            _importable[matchedResult.num].push(matchedResult.result);
          }

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
