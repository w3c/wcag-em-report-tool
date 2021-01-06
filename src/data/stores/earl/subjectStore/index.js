import collectionStore from '../../collectionStore.js';

import { TestSubject, TestSubjectTypes } from './models.js';

export const initialSubjectStore = [
  new TestSubject({
    ID: 1,
    type: TestSubjectTypes.WEBSITE,
    title: '',
    description: ''
  })
];

const $subjects = collectionStore(TestSubject, initialSubjectStore);

export {
  TestSubjectTypes
};

export default $subjects;
