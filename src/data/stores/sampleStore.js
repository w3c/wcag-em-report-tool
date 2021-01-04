import { derived, writable } from 'svelte/store';

export const initialSampleStore = {
  STRUCTURED_SAMPLE: [],
  RANDOM_SAMPLE: []
};

const sampleStore = writable(initialSampleStore);

export const allSamples = derived(sampleStore, ($sampleStore) => {
  return [...$sampleStore['STRUCTURED_SAMPLE'], ...$sampleStore['RANDOM_SAMPLE']];
});

export default sampleStore;
