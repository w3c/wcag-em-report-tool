<p class="your-report__description">
  {TRANSLATED.REPORTED_ON} 
  {totalEvaluated} 
  {TRANSLATED.REPORTED_ON_OF} 
  {totalToEvaluate} WCAG {wcagVersion}
  {conformanceTarget} 
  Success Criteria.
</p>

<script>
  import { getContext } from 'svelte';

  import assertions from '@app/stores/earl/assertionStore/index.js';

  const { translate, scopeStore } = getContext('app');

  $: wcagVersion = $scopeStore['WCAG_VERSION'];
  $: conformanceTarget = $scopeStore['CONFORMANCE_TARGET'];

  $: TRANSLATED = {
    REPORTED_ON: $translate('UI.REPORT.REPORTED_ON'),
    REPORTED_ON_OF: $translate('UI.REPORT.REPORTED_ON_OF')
  };

  $: totalToEvaluate = $assertions.length;
  $: totalEvaluated = $assertions.filter(assertion => 
    assertion.result.description !== undefined && 
    assertion.result.outcome.id !== "earl:untested").length;
</script>
