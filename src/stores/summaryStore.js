import { writable } from 'svelte/store';

export const initialSummaryStore = {
  EVALUATION_TITLE: '',
  EVALUATION_COMMISSIONER: '',
  EVALUATION_CREATOR: '',
  EVALUATION_DATE: new Date().toDateString(),
  EVALUATION_SUMMARY: '',
  EVALUATION_SPECIFICS: ''
};

const summaryStore = writable({...initialSummaryStore});

export default summaryStore;
