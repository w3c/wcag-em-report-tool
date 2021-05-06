<!-- @Route:/evaluation -->
<Router>
  <EvaluationLayout>
    <Route path="/define-scope" component="{DefineScopePage}" />
    <Route path="/explore-website" component="{ExploreWebsitePage}" />
    <Route path="/select-sample" component="{SelectSamplePage}" />
    <Route path="/audit-sample" component="{AuditSamplePage}" />
    <Route path="/report-findings" component="{ReportFindingsPage}" />
    <Route path="/view-report" component="{ViewReportPage}" />
  </EvaluationLayout>
</Router>
<!-- /@Route -->

<script>
  import { Router, Route } from 'svelte-navigator';

  import EvaluationLayout from '@app/components/layouts/EvaluationLayout.svelte';

  import {
    AuditSamplePage,
    DefineScopePage,
    ExploreWebsitePage,
    ReportFindingsPage,
    SelectSamplePage,
    ViewReportPage
  } from '@app/components/pages/Evaluation/Index.svelte';
</script>
