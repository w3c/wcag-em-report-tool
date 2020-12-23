import collectionStore from '../collectionStore.js';

import { TestSubject } from './models.js';

const $subjects = collectionStore(TestSubject, []);

export default $subjects;
