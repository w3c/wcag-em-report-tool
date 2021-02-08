import { writable } from 'svelte/store';

import collection from './collectionStore.js';

import webTechnologies from '@app/data/webtechnologies.json';

export const initialExploreStore = {
  TECHNOLOGIES_RELIED_UPON: [],
  ESSENTIAL_FUNCTIONALITY: '',
  PAGE_TYPES: ''
};

export const webTechnologyStore = collection(null, [...webTechnologies]);

const exploreStore = writable({...initialExploreStore});

export default exploreStore;
