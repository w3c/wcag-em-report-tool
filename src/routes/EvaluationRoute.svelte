<Router>
  <EvaluationLayout>
    <Route path="/scope" component={Scope} />
    <Route path="/explore" component={Explore} />
    <Route path="/sample" component={Sample} />
    <Route path="/audit" component={Audit} />
    <Route path="/summary" component={Summary} />
  </EvaluationLayout>
</Router>

<script>
  import { Router, Route } from 'svelte-navigator';

  import {
    Scope,
    Explore,
    Sample,
    Audit,
    Summary
  } from '../components/pages/Evaluation/Index.svelte';
  import EvaluationLayout from '../components/EvaluationLayout.svelte';
</script>
