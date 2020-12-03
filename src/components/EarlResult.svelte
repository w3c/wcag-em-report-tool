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
      />
    </div>

    <div class="Criterion__Result--description">
      <Textarea
        id="{`assertion__${_assertion.ID}--result__description`}"
        label="{$translate('PAGES.AUDIT.ASSERTION_RESULT_DESCRIPTION_LABEL')}"
        bind:value="{_assertion.result.description}"
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
  import { assertion } from '../data/stores/earl/assertionStore.js';

  import Flex from './Flex.svelte';
  import Select from './formcomponents/Select.svelte';
  import Textarea from './formcomponents/Textarea.svelte';

  export let label = undefined;
  // Used to display subject.title
  export let subject = {};

  // Used for id creation (test.id)
  export let test = {};

  const { translate } = getContext('app');

  // Create or get an Assertion
  $: _assertion = $assertion({
    subject,
    test
  });

  // Grab this from earl data maybe?
  // Keeping the values consistent
  $: outcomeOptions = [
    {
      title: $translate('UI.EARL.PASSED')
    },
    {
      title: $translate('UI.EARL.FAILED')
    },
    {
      title: $translate('UI.EARL.CANT_TELL')
    },
    {
      title: $translate('UI.EARL.NOT_PRESENT')
    },
    {
      title: $translate('UI.EARL.NOT_CHECKED'),
      selected: true
    }
  ];
</script>
