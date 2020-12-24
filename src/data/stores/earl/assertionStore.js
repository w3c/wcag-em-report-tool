import { derived } from 'svelte/store';

import collectionStore from '../collectionStore.js';
import { Assertion, TestResult } from './models.js';

const _assertions = [];
const $assertions = collectionStore(Assertion, []);

const $assertion = derived([$assertions], () => lookupAssertion);

function lookupAssertion(ID, options = {}) {
  if (typeof ID === 'object') {
    options = ID;
    ID = undefined;
  }

  let _assertion = _assertions.find((a) => {
    if (a.ID === ID) {
      return true;
    }

    return a.test === options.test && a.subject === options.subject;
  });

  if (_assertion) {
    return _assertion;
  }

  return createAssertion(ID, options);
}

function createAssertion(ID, options) {
  if (ID) {
    options.ID = ID;
  }

  if (!options.result) {
    options.result = new TestResult({});
  }

  const _assertion = new Assertion(options);

  _assertions.push(_assertion);

  return _assertion;
}

export { $assertion as assertion };
export default $assertions;
