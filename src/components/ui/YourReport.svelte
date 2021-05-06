<Panel title="{siteName || TRANSLATED.HEADING_PANEL}" subtitle="{siteName ? TRANSLATED.REPORT_FOR : ''}">

  <ReportNumbers/>

  <ProgressBar percentage={percentageTotalEvaluated}></ProgressBar>
  
  <ul class="your-report__progress-by-principle">
    {#each principles as principle}
    <li class="progress">
      <div class="progress__principle">
        <a href="#@@@" class="principle__name">
          <span>{TRANSLATED.PRINCIPLES[principle].TITLE}</span>
        </a> 
        <span class="progress__part">{totalsPerPrinciple[principle]["done"]} of {totalsPerPrinciple[principle]["total"]}</span>
      </div>
      <ProgressBar percentage="{totalsPerPrinciple[principle]["percentage"]}"></ProgressBar>
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
  import { Link } from 'svelte-navigator';

  import Panel from '@app/components/ui/Panel.svelte';
  import ProgressBar from '@app/components/ui/ProgressBar.svelte';
  import ReportNumbers from '@app/components/ui/Report/ReportNumbers.svelte';

  import { wcag, scopedWcagVersions } from '@app/stores/wcagStore.js';
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
    REPORT_FOR: $translate('UI.REPORT.REPORT_FOR'),
  };

  $: conformanceTarget = $scopeStore['CONFORMANCE_TARGET'];
  $: percentageTotalEvaluated = (totalEvaluated / totalToEvaluate) * 100;

  $: principles = [...new Set($wcag.map((a) => a.num.split('.')[0]))];

  $: filteredCriteria = {
   1: $wcag.filter(item => item.num.startsWith("1.")).filter(isInScope) || {},
   2: $wcag.filter(item => item.num.startsWith("2.")).filter(isInScope) || {},
   3: $wcag.filter(item => item.num.startsWith("3.")).filter(isInScope) || {},
   4: $wcag.filter(item => item.num.startsWith("4.")).filter(isInScope) || {}
  };

  $: filteredAssertions = {
   1: $assertions.filter(item => item.test.num.startsWith("1.")).filter(isEvaluated),
   2: $assertions.filter(item => item.test.num.startsWith("2.")).filter(isEvaluated),
   3: $assertions.filter(item => item.test.num.startsWith("3.")).filter(isEvaluated),
   4: $assertions.filter(item => item.test.num.startsWith("4.")).filter(isEvaluated)
  }

  $: totalsPerPrinciple = {
    1: {
      "done": filteredAssertions[1].length,
      "total": filteredCriteria[1].length,
      "percentage": (filteredAssertions[1].length / filteredCriteria[1].length) * 100
    },
    2: {
      "done": filteredAssertions[2].length,
      "total": filteredCriteria[2].length,
      "percentage": (filteredAssertions[2].length / filteredCriteria[2].length) * 100
    },
    3: {
      "done": filteredAssertions[3].length,
      "total": filteredCriteria[3].length,
      "percentage": (filteredAssertions[3].length / filteredCriteria[3].length) * 100
    },
    4: {
      "done": filteredAssertions[4].length,
      "total": filteredCriteria[4].length,
      "percentage": (filteredAssertions[4].length / filteredCriteria[4].length) * 100
    },    
  }

  function isInScope(wcagSC) {
    return  wcagSC.conformanceLevel.length <= conformanceTarget.length && conformanceTarget.length &&  $scopedWcagVersions.includes(wcagSC.version)
  };

  function isEvaluated(assertion) {
    return assertion.result.description !== undefined && 
    assertion.result.outcome.id !== "earl:untested"
  }

  $: siteName = $scopeStore['SITE_NAME'];
  $: totalToEvaluate = $assertions.length;
  $: totalEvaluated = $assertions.filter(assertion => 
    assertion.result.description !== undefined && 
    assertion.result.outcome.id !== "earl:untested").length;
</script>