import { derived, writable } from 'svelte/store';

const sampleStore = writable({
  STRUCTURED_SAMPLE: [],
  RANDOM_SAMPLE: []
});

export const allSamples = derived(sampleStore, ($sampleStore) => {
  return [...$sampleStore['STRUCTURED_SAMPLE'], ...$sampleStore['RANDOM_SAMPLE']];
});

export default sampleStore;
