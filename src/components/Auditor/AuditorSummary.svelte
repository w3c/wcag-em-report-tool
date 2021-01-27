{#each principles as principle}
  <h3>{principle} {TRANSLATED.PRINCIPLES[principle].TITLE}</h3>

  {#each guidelines.filter((g) => g.indexOf(principle) === 0) as guideline}
    <h4>{guideline} {TRANSLATED.GUIDELINES[guideline].TITLE}</h4>
    <!--
     * Should filter assertions based on test prop;
     * assertion.test.num in case of wcag.
     * Specificly test.num.indexOf guideline === 0
     * because we are grouping per principle > guideline.
     * -->
    {#each guidelineCriteria(guideline) as criterion (criterion.num)}
      <div class="Auditor__Assertion">
        <div class="box box-simple">
          <h5 class="box-h box-h-simple">{criterion.num}: {criterion.title}</h5>
          <div class="box-i">
            <h6>{TRANSLATED.HEADING_SCOPE_RESULTS}</h6>
            {#each scopeAssertion(criterion) as assertion}
              <dl>
                <dt>{TRANSLATED.LABEL_OUTCOME}</dt>
                <dd>{assertion.result.outcome.title}</dd>
                <dt>{TRANSLATED.LABEL_OBSERVATION}</dt>
                <dd>{assertion.result.description}</dd>
              </dl>
            {:else}
              <p>{TRANSLATED.TEXT_NOT_CHECKED}</p>
            {/each}
            <h6>{TRANSLATED.HEADING_RESULTS_FOR}</h6>
            {#each sampleAssertions(criterion) as assertion}
              <div class="box box-simple">
                <span class="box-h box-h-simple">Results for {assertion.subject.title || `Sample ${assertion.subject.ID}`}</span>
                <dl class="box-i">
                  <dt>{TRANSLATED.LABEL_OUTCOME}</dt>
                  <dd>{assertion.result.outcome}</dd>
                  <dt>{TRANSLATED.LABEL_OBSERVATION}</dt>
                  <dd>{assertion.result.description}</dd>
                </dl>
              </div>
            {:else}
              <p>{TRANSLATED.TEXT_NOT_CHECKED}</p>
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
  import { TestSubjectTypes } from '../../data/stores/earl/subjectStore/';

  export let criteria = [];

  const { translate, translateToObject } = getContext('app');

  $: TRANSLATED = {
    PRINCIPLES: $translateToObject('WCAG.WCAG21.PRINCIPLE'),
    GUIDELINES: $translateToObject('WCAG.WCAG21.GUIDELINE'),
    LABEL_OUTCOME: $translate('PAGES.AUDIT.LABEL_OUTCOME'),
    LABEL_OBSERVATION: $translate('PAGES.AUDIT.ASSERTION_RESULT_DESCRIPTION_LABEL'),
    HEADING_SCOPE_RESULTS: $translate('PAGES.AUDIT.SAMPLE_FINDINGS'),
    HEADING_RESULTS_FOR: $translate('PAGES.AUDIT.RESULTS_FOR'),
    TEXT_NOT_CHECKED: $translate('UI.EARL.UNTESTED')
  };

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
      return assertion.subject.type.indexOf(TestSubjectTypes.WEBSITE) >= 0;
    });
  }

  function sampleAssertions(criterion) {
    return criterionAssertions(criterion).filter((assertion) => {
      return assertion.subject.type.indexOf(TestSubjectTypes.WEBPAGE) >= 0;
    });
  }
</script>
