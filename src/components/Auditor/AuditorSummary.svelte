{#each principles as principle}
  <h3>{principle} {$translate(`WCAG.WCAG21.PRINCIPLE.${principle}.TITLE`)}</h3>

  {#each guidelines.filter((g) => g.indexOf(principle) === 0) as guideline}
    <h4>
      {guideline}
      {$translate(`WCAG.WCAG21.GUIDELINE.${guideline}.TITLE`)}
    </h4>
    <!--
     * Should filter assertions based on test prop;
     * assertion.test.num in case of wcag.
     * Specificly test.num.indexOf guideline === 0
     * because we are grouping per principle > guideline.
     * -->
    {#each guidelineCriteria(guideline) as criterion (criterion.num)}
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
        <div class="box box-simple">
          <h5 class="box-h box-h-simple">
            {criterion.num}: {$translate(`WCAG.WCAG21.SUCCESS_CRITERION.${criterion.num}.TITLE`)}
          </h5>
          <div class="box-i">
            <h6>{$translate('PAGES.AUDIT.SAMPLE_FINDINGS')}</h6>
            {#each scopeAssertion(criterion) as assertion}
              <dl>
                <dt>Outcome</dt>
                <dd>{assertion.result.outcome}</dd>
                <dt>Observation</dt>
                <dd>{assertion.result.description}</dd>
              </dl>
            {:else}
              <p>Not checked.</p>
            {/each}
            <h6>Results for individual pages</h6>
            {#each sampleAssertions(criterion) as assertion}
              <div class="box box-simple">
                <span class="box-h box-h-simple">Results for {assertion.subject.title || `Sample ${assertion.subject.ID}`}</span>
                <dl class="box-i">
                  <dt>Outcome</dt>
                  <dd>{assertion.result.outcome}</dd>
                  <dt>Observation</dt>
                  <dd>{assertion.result.description}</dd>
                </dl>
              </div>
            {:else}
              <p>Not checked.</p>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  {/each}
{/each}

<script>
  import { getContext } from 'svelte';

  import assertions from '../../data/stores/earl/assertionStore.js';

  import Details from '../Details.svelte';

  export let criteria = [];

  const { translate } = getContext('app');

  // Sets are unique values
  $: principles = [...new Set(criteria.map((a) => a.num.split('.')[0]))];
  $: guidelines = [
    ...new Set(
      criteria.map((a) => {
        const splittedNum = a.num.split('.');

        return `${splittedNum[0]}.${splittedNum[1]}`;
      })
    )
  ];

  function guidelineCriteria(guideline) {
    return criteria.filter(
      (criterion) => criterion.num.indexOf(guideline) === 0
    );
  }

  function criterionAssertions(criterion) {
    return $assertions.filter((assertion) => {
      return assertion.test === criterion;
    });
  }

  function scopeAssertion(criterion) {
    return criterionAssertions(criterion).filter((assertion) => {
      return assertion.subject.type.indexOf('WebSite') >= 0;
    });
  }

  function sampleAssertions(criterion) {
    return criterionAssertions(criterion).filter((assertion) => {
      return assertion.subject.type.indexOf('WebPage') >= 0;
    });
  }
</script>
