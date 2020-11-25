<!-- @Layout:Evaluation -->
<slot />
<!-- /@Layout -->

<script>
  import { getContext } from 'svelte';
  import { subject } from '../../data/stores/earl/subjectStore.js';

  const { scopeStore } = getContext('app');
  // Initialize

  // Create a WebSite subject
  let websiteSubject = subject({
    ID: 1,
    type: 'WebSite',
  });

  $: {
    websiteSubject.title = $scopeStore['SITE_NAME'];
    websiteSubject.description = $scopeStore['WEBSITE_SCOPE'];
  }
</script>
