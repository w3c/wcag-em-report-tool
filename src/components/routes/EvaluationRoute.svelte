<!-- @Route:/evaluation -->
<Router>
  <EvaluationLayout>
    <Route path="/scope" component="{DefineScopePage}" />
    <Route path="/explore" component="{ExploreWebsitePage}" />
    <Route path="/sample" component="{SelectSamplePage}" />
    <Route path="/audit" component="{AuditSamplePage}" />
    <Route path="/summary" component="{ReportFindingsPage}" />
    <Route path="/view-report" component="{ViewReportPage}" />
  </EvaluationLayout>
</Router>
<!-- /@Route -->

<script>
  import { Router, Route } from 'svelte-navigator';

  import EvaluationLayout from '@app/components/layouts/EvaluationLayout.svelte';

  import {
    AuditSamplePage,
    ExploreWebsitePage,
    ViewReportPage,
    SelectSamplePage,
    DefineScopePage,
    ReportFindingsPage
  } from '@app/components/pages/Evaluation/Index.svelte';
</script>
