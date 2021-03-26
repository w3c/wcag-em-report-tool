<Panel title="{siteName || TRANSLATED.HEADING_PANEL}" subtitle="{siteName ? TRANSLATED.REPORT_FOR : ''}" bind:open="{panelIsOpen}">

  <p class="your-report__description">Reported on {totalEvaluated} of {totalToEvaluate} WCAG {wcagVersion} {conformanceTarget} Success Criteria.</p>

  <ProgressBar percentage={percentageEvaluated}></ProgressBar>
  
  <ul class="your-report__progress-by-principle">
    {#each principles as principle}
    <li class="progress">
      <div class="progress__principle">
        <a href="#@@@" class="principle__name">
          <span>{TRANSLATED.PRINCIPLES[principle].TITLE}</span>
        </a> 
        <span class="progress__part">{filteredAssertions[principle].length} of {filteredCriteria[principle].length}</span>
      </div>
      <ProgressBar percentage="{filteredAssertions[principle].length / filteredCriteria[principle].length * 100}"></ProgressBar>
    </li>
    {/each}
  </ul>
  
  <Link class="button" to="/evaluation/view-report">
    {TRANSLATED.VIEW_REPORT}
  </Link>
</Panel>

<style>  
.your-report__progress-by-principle {
  columns: 1;
}
</style>

<script>
  import { getContext } from 'svelte';
  import { useLocation, Link } from 'svelte-navigator';

  import Panel from '@app/components/ui/Panel.svelte';
  import ProgressBar from '@app/components/ui/ProgressBar.svelte';

  import wcag from '@app/stores/wcagStore.js';
  import assertions from '@app/stores/earl/assertionStore/index.js';

  const { translate, translateToObject, scopeStore } = getContext('app');

  $: TRANSLATED = {
    PRINCIPLES: $translateToObject('WCAG.PRINCIPLE'),
    BUTTON_NEW_EVALUATION: $translate('UI.NAV.MENU_NEW', {
      default: 'New report'
    }),
    HEADING_PANEL: $translate('UI.COMMON.YOUR_REPORT', {
      default: 'Your report'
    }),
    STEP: $translate('UI.NAV.STEP', { default: 'step' }),
    VIEW_REPORT: $translate('UI.NAV.STEP_VIEWREPORT', {
      default: 'View report'
    }),
    CONFORMANCE_LEVEL: $translate('WCAG.COMMON.CONFORMANCE_LEVEL'),
    REPORT_FOR: $translate('UI.REPORT.REPORT_FOR')
  };

  $: conformanceTarget = $scopeStore['CONFORMANCE_TARGET'];
  $: wcagVersion = $scopeStore['WCAG_VERSION'];
  $: percentageEvaluated = (totalEvaluated / totalToEvaluate) * 100;

  $: principles = [...new Set($wcag.map((a) => a.num.split('.')[0]))];

  $: upToWcagVersion = wcagVersion === "2.0" ?
    ["2.0"] : ["2.0", "2.1"];

  $: filteredCriteria = {
   1: $wcag.filter(item => item.num.startsWith("1.")).filter(isInScope) || {},
   2: $wcag.filter(item => item.num.startsWith("2."))
    .filter(isInScope) || {},
   3: $wcag.filter(item => item.num.startsWith("3."))
    .filter(isInScope) || {},
   4: $wcag.filter(item => item.num.startsWith("4."))
    .filter(isInScope) || {}
  };

  $: filteredAssertions = {
   1: $assertions.filter(item => item.test.num.startsWith("1.")).filter(isEvaluated),
   2: $assertions.filter(item => item.test.num.startsWith("2.")).filter(isEvaluated),
   3: $assertions.filter(item => item.test.num.startsWith("3.")).filter(isEvaluated),
   4: $assertions.filter(item => item.test.num.startsWith("4.")).filter(isEvaluated)
  }

  function isInScope(wcagSC) {
    return  wcagSC.conformanceLevel.length <= conformanceTarget.length && conformanceTarget.length &&  upToWcagVersion.includes(wcagSC.version)
  };

  function isEvaluated(assertion) {
    return assertion.result.description !== undefined && 
    assertion.result.outcome.id !== "earl:untested"
  }

  let totalEvaluated = 3;

  export let panelIsOpen = true;

  $: siteName = $scopeStore['SITE_NAME'];
  $: totalToEvaluate = $assertions.length;
  $: totalEvaluated = $assertions.filter(assertion => 
    assertion.result.description !== undefined && 
    assertion.result.outcome.id !== "earl:untested").length;
</script>