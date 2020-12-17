<!-- @Layout:Evaluation -->
<slot />
<!-- /@Layout -->

<script>
  import { getContext, setContext } from 'svelte';
  import { outcomeValueStore } from '../../data/stores/earl/resultStore.js';
  import { subject } from '../../data/stores/earl/subjectStore.js';
  import testStore from '../../data/stores/earl/testStore.js';

  const { scopeStore } = getContext('app');
  // Initialize

  // Create a WebSite subject
  let websiteSubject = $subject(1, {
    type: 'WebSite'
  });

  $: {
    websiteSubject.title = $scopeStore['SITE_NAME'];
    websiteSubject.description = $scopeStore['WEBSITE_SCOPE'];
  }

  setContext('Evaluation', {
    outcomeValues: $outcomeValueStore,
    testCriteria: $testStore
  });
</script>
