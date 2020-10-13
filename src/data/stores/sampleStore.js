import { writable } from 'svelte/store';

const sampleStore = writable({
  STRUCTURED_SAMPLE: [],
  RANDOM_SAMPLE: []
});

export default sampleStore;
