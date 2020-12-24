import collectionStore from '../collectionStore.js';
import { Assertion } from './models.js';

const initialAssertions = [];
const $assertions = collectionStore(Assertion, initialAssertions);

export default $assertions;
