import jsonld from '@app/scripts/jsonld.js';

import { importContext } from '@app/data/jsonld/appContext.js';
import collectionStore from '@app/stores/collectionStore.js';

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
 * - Walk the imported assertions once!;
 *  - Check for required keys; test, subject, result.
 *  - Check if the subject matches
 *  - Check if the test matches
 *  - If all pass, add the assertion as importable and combine results for test + subject combination
 *
 * - Walk the importableAssertions
 *  - Get or create an assertion based on the test + subject.
 *  - Agregate result.outcome;
 *    If starting result.outcome is not failed change either to failed or cantTell
 *    - Finally aggregate to scope result outcome if changed to failed / cantTell.
 *
 *  - Append all result.description to the result.description.
 *
 * - Done
 *
 * @param  {[type]} json [description]
 * @return {[type]}      [description]
 */
export async function importAssertions(json) {

  await jsonld
    .frame(json, {
      '@context': importContext,
      '@type': AssertionTypes
    })
    .then((framedAssertions) => {
      console.log(framedAssertions);

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
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const initialAssertions = [];
const $assertions = collectionStore(Assertion, initialAssertions);

export default $assertions;
