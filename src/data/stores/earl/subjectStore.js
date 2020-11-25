import { writable } from 'svelte/store';

import { TestSubject } from './models.js';

const _subjectIds = [];
const _subjects = {};

export function subject(options) {
  const { ID } = options;
  // read or create
  if (ID && _subjects[ID]) {
    return _subjects[ID];
  }

  return createSubject(options);
}

function createSubject(options) {
  const _subject = new TestSubject(options);
  _subject.ID = _subjectIds.length > 0 ? Math.max.apply(_subjectIds) + 1 : 1;

  _subjects[_subject.ID] = _subject;

  return _subject;
}

export default writable(_subjects);
