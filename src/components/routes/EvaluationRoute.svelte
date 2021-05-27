<!-- @Route:/evaluation -->
<Router>
  <EvaluationLayout>
    <Route path="/define-scope"><DefineScopePage /></Route>
    <Route path="/explore-website"><ExploreWebsitePage /></Route>
    <Route path="/select-sample"><SelectSamplePage /></Route>
    <Route path="/audit-sample"><AuditSamplePage /></Route>
    <Route path="/report-findings"><ReportFindingsPage /></Route>
    <Route path="/view-report"><ViewReportPage /></Route>
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
