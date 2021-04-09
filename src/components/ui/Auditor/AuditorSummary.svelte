{#each principles as principle}
  <h4>{principle} {TRANSLATED.PRINCIPLES[principle].TITLE}</h4>

  {#each guidelines.filter((g) => g.indexOf(principle) === 0) as guideline}
    <h5>{guideline} {TRANSLATED.GUIDELINES[guideline].TITLE}</h5>
    <table class="Auditor__ResultsTable">
      <tbody>
          <tr class="Auditor__ResultsTableHeader">
            <th>Success Criterion</th>
            <th>Result</th>
            <th>Observations</th>
            <th></th><!-- cell for edit button -->
          </tr>
        <!--
        * Should filter assertions based on test prop;
        * assertion.test.num in case of wcag.
        * Specificly test.num.indexOf guideline === 0
        * because we are grouping per principle > guideline.
        * -->
        {#each guidelineCriteria(guideline) as criterion (criterion.num)}
          <tr class="Auditor__Assertion">
            <td id={`criterion-${criterion.num.replaceAll('.', '')}`}>{criterion.num}: {TRANSLATED.CRITERIA[criterion.num].TITLE}</td>
            <td>
                {#each scopeAssertion(criterion) as assertion}
                  <h6>{TRANSLATED.HEADING_SCOPE_RESULTS}</h6>
                  <p>{assertion.result.outcome.title || TRANSLATED.TEXT_NOT_CHECKED}</p>
                {:else}
                  <p>{TRANSLATED.TEXT_NOT_CHECKED}</p>
                {/each}
                {#if sampleAssertions(criterion).length}
                  {#each sampleAssertions(criterion) as assertion}
                    <h6>{assertion.subject.title || `Sample ${assertion.subject.ID}`}</h6>
                    <p>{assertion.result.outcome.title || TRANSLATED.TEXT_NOT_CHECKED}</p>
                  {:else}
                    <p>{TRANSLATED.TEXT_NOT_CHECKED}</p>
                  {/each}
                {/if}
            </td>
            <td>
              {#each scopeAssertion(criterion) as assertion}
                {#if assertion.result.description}
                  <h6>{TRANSLATED.HEADING_SCOPE_RESULTS}</h6>
                  {@html marked(assertion.result.description)}
                {/if}
              {/each}
              {#if sampleAssertions(criterion).length}
              {#each sampleAssertions(criterion) as assertion}
                <h6>{assertion.subject.title || `Sample ${assertion.subject.ID}`}</h6>
                {#if assertion.result.description}
                  {@html marked(assertion.result.description)}
                {/if}
              {/each}
            {/if}
            </td>
            <td>
              <Link to={`/evaluation/audit#criterion-${criterion.num.replaceAll('.','')}`}>
                <span class="visuallyhidden">Edit {criterion.num}</span>
                <svg
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-edit">
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </Link>        
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/each}
{/each}

<style>
  .Auditor__ResultsTable {
    width: 100%;
  }
  .Auditor__ResultsTable th {
    width: 30%;
  }
  .Auditor__ResultsTable th:nth-child(2) {
    width: 25%;
  }
  .Auditor__ResultsTable th:nth-child(3) {
    width: 60%;
  }
  .Auditor__ResultsTableHeader {
    position: sticky;
    top: 0;
  }
</style>

<script>
  import { getContext } from 'svelte';
  import { Link } from 'svelte-navigator';
  import marked from 'marked';

  import assertions from '@app/stores/earl/assertionStore/index.js';
  import { TestSubjectTypes } from '@app/stores/earl/subjectStore/index.js';

  export let criteria = [];

  const { translate, translateToObject } = getContext('app');

  $: TRANSLATED = {
    PRINCIPLES: $translateToObject('WCAG.PRINCIPLE'),
    GUIDELINES: $translateToObject('WCAG.GUIDELINE'),
    CRITERIA: $translateToObject('WCAG.SUCCESS_CRITERION'),
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
      return assertion.test.num === criterion.num;
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
