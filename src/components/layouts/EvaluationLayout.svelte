<!-- @Layout:Evaluation -->
<slot />
<!-- /@Layout -->

<script>
  import { getContext, setContext } from 'svelte';
  import { subject } from '../../data/stores/earl/subjectStore.js';
  import { outcomeValueStore } from '../../data/stores/earl/resultStore.js';

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
    outcomeValues: $outcomeValueStore
  });
</script>
