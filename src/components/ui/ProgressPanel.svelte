<Panel title="{siteName || TRANSLATED.HEADING_PANEL}" subtitle="{siteName ? TRANSLATED.REPORT_FOR : ''}" bind:open="{panelIsOpen}">

  <p class="your-report__description">Reported on {totalEvaluated} of {totalToEvaluate} WCAG {wgacVersion} {conformanceTarget} Success Criteria.</p>

  <ProgressBar percentage={percentageEvaluated}></ProgressBar>
  
  <ul class="your-report__progress-by-principle">
    {#each principles as principle}
    <li class="progress">
      <div class="progress__principle">
        <a href="#@@@" class="principle__name">
          <span>{TRANSLATED.PRINCIPLES[principle].TITLE}</span>
        </a> 
        <span class="progress__part">3 of 6</span>
      </div>
      <ProgressBar percentage="50"></ProgressBar>
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

  $:  console.log('totalevaluated', totalEvaluated);
  $: conformanceTarget = $scopeStore['CONFORMANCE_TARGET'];
  $: wgacVersion = $scopeStore['WCAG_VERSION'];
  $: percentageEvaluated = (totalEvaluated / totalToEvaluate) * 100;

  $: principles = [...new Set($wcag.map((a) => a.num.split('.')[0]))];

  $: console.log($assertions);

  let totalEvaluated = 3;

  export let panelIsOpen = true;

  $: siteName = $scopeStore['SITE_NAME'];
  $: totalToEvaluate = $assertions.length;
  $: totalEvaluated = $assertions.filter(assertion => 
    assertion.result.description !== undefined && 
    assertion.result.outcome.id !== "earl:untested").length;
</script>