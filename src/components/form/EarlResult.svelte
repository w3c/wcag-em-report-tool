<!--
 * EarlResult
 *
 * use like:
 *   <EarlResult {...assertion} />
 *
 * Where assertion should be like
 * an earl:Assertion object picked from
 * the assertionStore: $assertions.
 *
 * Important here is to pass the correct result,
 * so test AND subject should always match.
 * -->
<fieldset class="Criterion__Result">
  <legend class="Criterion__Subject">
    {#if label}
      {label}
    {:else}
      {$translate('PAGES.AUDIT.RESULTS_FOR')}: {subject.title || subject.description || `subject ${subject.ID}`}
    {/if}
  </legend>

  <div class="Criterion__Fields">
    <Select
      id="{`assertion__${_assertion.ID}--result__outcome`}"
      label="{$translate('PAGES.AUDIT.LABEL_OUTCOME')}"
      options="{outcomeOptions}"
      bind:value="{_assertion.result.outcome.id}"
      on:change="{handleOutcomeChange}"
    />

    <Textarea
      id="{`assertion__${_assertion.ID}--result__description`}"
      label="{$translate('PAGES.AUDIT.ASSERTION_RESULT_DESCRIPTION_LABEL')}"
      bind:value="{_assertion.result.description}"
      on:change="{handleResultChange}"
    >
      <span slot="before-textarea" class="view-in-report">
      <Link to={`/evaluation/view-report#criterion-${_assertion.test.num.replaceAll('.', '')}`}>{TRANSLATED.VIEW_IN_REPORT}</Link>
      </span>
    </Textarea>
  </div>
</fieldset>

<style>
  .Criterion__Result {
    display: block;
    border: none;
  }

  .Criterion__Subject {
    padding: 0;
    font-size: 1em;
  }
  .Criterion__Fields {
    display: flex;
    gap: 2rem;
  }
  :global(.Criterion__Fields :last-child) {
    flex: 2;
  }
  :global(.Criterion__Fields :last-child label) {
    float: left;
  }
  .view-in-report {
    float: right;
  }
</style>

<script>
  /**
   * This is a result that belongs to an Assertion
   * The assertion required should match:
   * - subject
   * - test
   */

  import { getContext } from 'svelte';
  import { Link } from 'svelte-navigator';

  import assertions from '@app/stores/earl/assertionStore/index.js';

  import Select from '@app/components/form/Select.svelte';
  import Textarea from '@app/components/form/Textarea.svelte';

  export let label = undefined;
  // Used to display subject.title
  export let subject = {};

  // Used for id creation (test.id)
  export let test = {};

  const { translate } = getContext('app');
  const { outcomeValues } = getContext('Evaluation');

  $: TRANSLATED = {
    VIEW_IN_REPORT: $translate('PAGES.AUDIT.VIEW_IN_REPORT')
  };

  $: outcomeOptions = $outcomeValues.map((outcomeValue, index) => {
    const title = outcomeValue.title;
    const value = outcomeValue.id;

    return {
      title,
      value,
      selected: index === $outcomeValues.length - 1
    };
  });

  // Get or create an Assertion
  $: _assertion =
    $assertions.find(($assertion) => {
      const matchedTest = $assertion.test === test;
      const matchedSubject = $assertion.subject === subject;

      return matchedTest && matchedSubject;
    }) || assertions.create({ subject, test });

  function handleOutcomeChange(event) {
    const value = event.target.value;
    
    _assertion.result.outcome = $outcomeValues.find(($outcomeValue) => {
      return $outcomeValue.id === value;
    });

    _assertion.result.setDate();
    assertions.update(() => $assertions);
  }

  function handleResultChange() {
    _assertion.result.setDate();
    assertions.update(() => $assertions);
  }
</script>
