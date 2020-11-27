import { derived, writable } from 'svelte/store';

import { TestSubject } from './models.js';

const _subjects = {};
const $subjects = writable(_subjects);

const $subject = derived([$subjects], () => lookupSubject);

function lookupSubject(ID, options) {
  if (!options && typeof ID === 'object') {
    options = ID;
    ID = null;
  }

  // read or create
  if (ID && _subjects[ID]) {
    return _subjects[ID];
  }

  return createSubject(ID, options);
}

function createSubject(ID, options) {
  const _subject = new TestSubject(options);

  if (ID) {
    _subject.ID = ID;
  }

  _subjects[_subject.ID] = _subject;

  return _subject;
}

export {$subject as subject};

export default $subjects;
