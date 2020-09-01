<!-- @Route:/evaluation -->
<Router>
  <EvaluationLayout>
    <Route path="/scope" component={ScopePage} />
    <Route path="/explore" component={ExplorePage} />
    <Route path="/sample" component={SamplePage} />
    <Route path="/audit" component={AuditPage} />
    <Route path="/summary" component={SummaryPage} />
  </EvaluationLayout>
</Router>
<!-- /@Route -->

<script>
  import { Router, Route } from 'svelte-navigator';

  import EvaluationLayout from '../components/layouts/EvaluationLayout.svelte';

  import {
    ScopePage,
    ExplorePage,
    SamplePage,
    AuditPage,
    SummaryPage
  } from '../components/pages/Evaluation/Index.svelte';
</script>
