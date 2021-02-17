<!--
 * EarlResult
 *
 * use like:
 *   <EarlResult {...assertion} />
 *
 * Where assertion should be like
 * an earl:Assertion object picked from a store.
 *
 * Important here is to pass the correct result here
 * -->
<fieldset class="Criterion__Result__container">
  <legend class="Criterion__Subject">
    {#if label}
      {label}
    {:else}
      {$translate('PAGES.AUDIT.RESULTS_FOR')}: {subject.title || subject.description || `subject ${subject.ID}`}
    {/if}
  </legend>

  <Flex direction="row" align="start" justify="between" wrap>
    <div class="Criterion__Result--outcome">
      <Select
        id="{`assertion__${_assertion.ID}--result__outcome`}"
        label="{$translate('PAGES.AUDIT.LABEL_OUTCOME')}"
        options="{outcomeOptions}"
        bind:value="{_assertion.result.outcome}"
        on:change="{handleResultChange}"
      />
    </div>

    <div class="Criterion__Result--description">
      <Textarea
        id="{`assertion__${_assertion.ID}--result__description`}"
        label="{$translate('PAGES.AUDIT.ASSERTION_RESULT_DESCRIPTION_LABEL')}"
        bind:value="{_assertion.result.description}"
        on:change="{handleResultChange}"
      />
    </div>
  </Flex>
</fieldset>

<style>
  .Criterion__Result__container {
    display: block;
    border: none;
  }

  .Criterion__Subject {
    padding: 0;
    font-size: 1em;
  }

  .Criterion__Result--outcome {
    margin-right: 2rem;
  }

  .Criterion__Result--description {
    flex-basis: 15rem;
    flex-grow: 1;
    flex-shrink: 1;
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
  import assertions from '@app/stores/earl/assertionStore/index.js';

  import Flex from '@app/components/ui/Flex.svelte';
  import Select from '@app/components/form/Select.svelte';
  import Textarea from '@app/components/form/Textarea.svelte';

  export let label = undefined;
  // Used to display subject.title
  export let subject = {};

  // Used for id creation (test.id)
  export let test = {};

  const { translate } = getContext('app');
  const { outcomeValues } = getContext('Evaluation');

  $: outcomeOptions = $outcomeValues.map((outcomeValue, index) => {
    const title = outcomeValue.title;
    const value = outcomeValue;

    return {
      title,
      value,
      selected: index === $outcomeValues.length - 1
    };
  });

  // Get or create an Assertion
  $: _assertion =
    $assertions.find(($assertion) => {
      return $assertion.test === test && $assertion.subject === subject;
    }) || assertions.create({ subject, test });

  function handleResultChange() {
    _assertion.result.setDate();
  }
</script>
