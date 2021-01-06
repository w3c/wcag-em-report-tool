import { writable } from 'svelte/store';

export const initialExploreStore = {
  TECHNOLOGIES_RELIED_UPON: [],
  ESSENTIAL_FUNCTIONALITY: '',
  PAGE_TYPES: ''
};

const exploreStore = writable({...initialExploreStore});

export default exploreStore;
