<!-- @Layout:Evaluation -->
<slot />
<!-- /@Layout -->

<script>
  import { getContext, onDestroy, onMount, setContext } from 'svelte';
  import { outcomeValueStore } from '../../data/stores/earl/resultStore.js';
  import subjects from '../../data/stores/earl/subjectStore.js';
  import testStore from '../../data/stores/earl/testStore.js';

  const { scopeStore } = getContext('app');
  // Initialize

  // Create a WebSite subject
  let websiteSubject =
    $subjects.find((subject) => {
      return subject.type.indexOf('WebSite') >= 0;
    }) ||
    subjects.create({
      type: 'WebSite'
    });

  let endSubscription;

  $: {
    websiteSubject.title = $scopeStore['SITE_NAME'];
    websiteSubject.description = $scopeStore['WEBSITE_SCOPE'];
  }

  setContext('Evaluation', {
    outcomeValues: outcomeValueStore,
    testCriteria: testStore
  });

  onMount(() => {
    // Stores that need to be up-to-date in background
    endSubscription = (() => {
      const unscribeOutcomeStore = outcomeValueStore.subscribe(() => {});
      const unscribeTestStore = testStore.subscribe(() => {});

      return () => {
        unscribeOutcomeStore();
        unscribeTestStore();
      };
    })();
  });

  onDestroy(() => {
    endSubscription();
  });
</script>
