<!-- @Route:/evaluation -->
<Router>
  <EvaluationLayout>
    <Route path="/scope" component="{ScopePage}" />
    <Route path="/explore" component="{ExplorePage}" />
    <Route path="/sample" component="{SamplePage}" />
    <Route path="/audit" component="{AuditPage}" />
    <Route path="/summary" component="{SummaryPage}" />
    <Route path="/view-report" component="{ReportPage}" />
  </EvaluationLayout>
</Router>
<!-- /@Route -->

<script>
  import { Router, Route } from 'svelte-navigator';

  import EvaluationLayout from '@app/components/layouts/EvaluationLayout.svelte';

  import {
    AuditPage,
    ExplorePage,
    ReportPage,
    SamplePage,
    ScopePage,
    SummaryPage
  } from '@app/components/pages/Evaluation/Index.svelte';
</script>
