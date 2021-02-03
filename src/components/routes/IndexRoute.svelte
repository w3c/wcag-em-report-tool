<!-- @Route:/ -->
<Router basepath="{basepath}">
  <BaseLayout>
    <!-- Components are Pages or nested Routes -->
    <Route path="/" component="{OverviewPage}" />
    <Route path="/evaluation/*" component="{EvaluationRoute}" />

    <!-- If anything else, it should hit an error? -->
    <Route path="/*" component="{OverviewPage}" />
  </BaseLayout>
</Router>
<!-- /@Route -->

<script>
  // Refactor to `import ... Routes.svelte` See @todo
  import { Router, Route } from 'svelte-navigator';

  import BaseLayout from 'components/layouts/BaseLayout.svelte';

  import EvaluationRoute from './EvaluationRoute.svelte';

  // Import pages
  import OverviewPage from 'components/pages/OverviewPage.svelte';

  export let basepath;
</script>
