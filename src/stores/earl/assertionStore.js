import jsonld from 'jsonld/lib/jsonld.js';

import { importContext } from '@app/data/jsonld/appContext.js';
import collectionStore from '@app/stores/collectionStore.js';
import { AssertionTypes, Assertion } from './models.js';

export async function importAssertions(json) {

  await jsonld
    .frame(json, {
      '@context': importContext,
      '@type': AssertionTypes
    })
    .then((framedAssertions) => {
      console.log(framedAssertions);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const initialAssertions = [];
const $assertions = collectionStore(Assertion, initialAssertions);

export default $assertions;
