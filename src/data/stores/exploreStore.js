import { writable } from 'svelte/store';

const exploreStore = writable({
  TECHNOLOGIES_RELIED_UPON: [],
  ESSENTIAL_FUNCTIONALITY: '',
  PAGE_TYPES: ''
});

export default exploreStore;
