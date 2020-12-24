import collectionStore from '../collectionStore.js';

import { TestSubject } from './models.js';

export const initialSubjectStore = [
  new TestSubject({
    ID: 1,
    type: 'WebSite',
    title: '',
    description: ''
  })
];

const $subjects = collectionStore(TestSubject, initialSubjectStore);

export default $subjects;
