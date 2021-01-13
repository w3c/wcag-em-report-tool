import { writable } from 'svelte/store';

import webTechnologies from '../webtechnologies.json';

export const initialExploreStore = {
  TECHNOLOGIES_RELIED_UPON: [],
  ESSENTIAL_FUNCTIONALITY: '',
  PAGE_TYPES: ''
};

export const webTechnologyStore = writable([...webTechnologies]);

const exploreStore = writable({...initialExploreStore});

export default exploreStore;
