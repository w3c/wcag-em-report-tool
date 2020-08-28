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
  -->

<!-- @Component:App -->
{#if ($isLoading)}
  <p>Loading WCAG Report Tool</p>
{:else}
  <Router>
    <Layout>
      <!-- Components are Pages -->
      <Route path="/" component={Index} />
      <Route path="/:lang" component={Index} />
    </Layout>
  </Router>
{/if}
<!-- /Component -->

<script>
  import { isLoading } from 'svelte-i18n';

  // Refactor to `import ... Routes.svelte`
  import { Router, Route } from 'svelte-navigator';

  import Layout from './includes/components/Layout.svelte';
  import Index from './routes/Index.svelte';
</script>
