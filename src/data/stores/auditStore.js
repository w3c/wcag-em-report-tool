import { writable } from 'svelte/store';

export const auditFilter = writable({
  LEVEL: [],
  VERSION: []
});

export default writable({
  'DETAILS_OPEN': {}
});
