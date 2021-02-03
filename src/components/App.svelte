<!--
  * This file should be used to arange the base of the App.
  * Meaning: importing stuff and display without the need
  * to do any logic etc.
  * If the app needs configuration, this can be passed on
  * from the main file 'client.js' and passed as props.
  * e.g.:
  *   new App({
  *     ...
  *     props: {
  *       settings,
  *       theme,
  *       hacks,
  *       etc
  *     }
  *     ...
  *   });
  *
  * In here, App.svelte, they would then be accessed like props:
  * e.g.:
  *   export let settings;
  *   export let theme;
  *   export let hacks;
  *   export let etc;
  *
  *   and passed on to the Components who need them.
  * -->

<!-- @Component:App -->
{#if $isLoading}
  <p>Loading WCAG Report Tool</p>
{:else}
  <!--
    * @todo:
    * - Pass settings / configuration / routes
    * -->
  <BaseRoute basepath="{basepath}" />
{/if}
<!-- /Component -->

<script>
  import { setContext } from 'svelte';
  import { isLoading } from 'svelte-i18n';

  import jsonld from 'jsonld/lib/jsonld.js';

  import { translate, translateToObject } from 'stores/i18nStore.js';
  import auditStore from 'stores/auditStore.js';
  import exploreStore from 'stores/exploreStore.js';
  import sampleStore from 'stores/sampleStore.js';
  import scopeStore from 'stores/scopeStore.js';
  import summaryStore from 'stores/summaryStore.js';
  import wcagStore from 'stores/wcagStore.js';

  import BaseRoute from 'components/routes/BaseRoute.svelte';

  export let basepath = '/';

  setContext('app', {
    translate,
    translateToObject,
    jsonld,
    auditStore,
    exploreStore,
    sampleStore,
    scopeStore,
    summaryStore,
    wcagStore
  });

</script>
