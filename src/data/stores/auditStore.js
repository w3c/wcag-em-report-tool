import { writable } from 'svelte/store';

export const auditFilter = writable({
  LEVEL: [],
  VERSION: []
});

export const auditSamples = writable([]);

export default writable({
  'DETAILS_OPEN': {}
});
