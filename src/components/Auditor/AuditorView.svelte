<div class="AuditorView">
  {#each [...principles] as principle}
    <Details
      label="{`<h2>${principle} ${TRANSLATED.PRINCIPLES[principle].TITLE}</h2>`}"
      bind:open="{$auditStore['DETAILS_OPEN'][`PRINCIPLE_${principle}`]}"
    >
      {#each [...guidelines].filter((g) => g.indexOf(principle) === 0) as guideline}
        <Details
          label="{`<h3>${guideline} ${TRANSLATED.GUIDELINES[guideline].TITLE}</h3>`}"
          bind:open="{$auditStore['DETAILS_OPEN'][`GUIDELINE_${guideline}`]}"
        >
          <!--
           * Should filter assertions based on test prop;
           * assertion.test.num in case of wcag.
           * Specificly test.num.indexOf guideline === 0
           * because we are grouping per principle > guideline.
           * -->
          {#each criteria.filter((criterion) => criterion.num.indexOf(guideline) === 0) as criterion (criterion.num)}
            <div class="Auditor__Assertion">
              <!--
               * This should probably not be called an assertion
               * We do target a certain group of assertions,
               * but we are displaying a complex testView based on multiple assertions;
               * This one specificly shows all assertions:
               * 1. that are tested agains one specific type of test
               * 2. and contain website results shown first
               * 3. followed by webpage specific results
               *
               * proposed:
               * - AuditView / AuditorView,
               *   with props possibly
               *
               *   - collection? The assertions to pass through.
               *   - groupby?
               *     To create one or multiple expandable groups?
               *     values should be picked from collection item props
               *     eg: <AuditorView collection="{$assertions}" groupby="test subject" />
               *
               *
               *   May be slotted? To use as a template of some sorts?
               *   eg:
               *    <AuditorView collection="{$assertions}" let:slotprop={assertion}>
               *      <div>{assertion.subject}</div>
               *    </AuditorView>
               *
               *
               * -->
              <Criterion test="{criterion}" />
            </div>
          {/each}
        </Details>
      {/each}
    </Details>
  {:else}
    <p>No criteria, use the filter to show some criteria.</p>
  {/each}
</div>

<script>
  import { getContext } from 'svelte';

  import Criterion from './Criterion.svelte';
  import Details from '@app/components/Details.svelte';

  export let criteria = [];

  const { auditStore, translateToObject } = getContext('app');

  $: TRANSLATED = {
    PRINCIPLES: $translateToObject('WCAG.WCAG21.PRINCIPLE'),
    GUIDELINES: $translateToObject('WCAG.WCAG21.GUIDELINE')
  };

  // Sets are unique values
  $: principles = new Set(criteria.map((a) => a.num.split('.')[0]));
  $: guidelines = new Set(
    criteria.map((a) => {
      const splittedNum = a.num.split('.');

      return `${splittedNum[0]}.${splittedNum[1]}`;
    })
  );
</script>
