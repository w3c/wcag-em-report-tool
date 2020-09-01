<Router basepath="/">
  <Layout>

    <!-- Components are Pages or nested Routes -->
    <Route path="/" component={Start} />
    <Route path="/evaluation/*" component={EvaluationRoute} />

    <!-- If anything else, it should hit an error? -->
    <Route path="*" component={Start} />

  </Layout>
</Router>

<script>
  // Refactor to `import ... Routes.svelte` See @todo
  import { Router, Route } from 'svelte-navigator';

  import Layout from '../components/Layout.svelte';

  import EvaluationRoute from './EvaluationRoute.svelte';

  // Import pages
  import Start from '../components/pages/Start.svelte';
</script>
