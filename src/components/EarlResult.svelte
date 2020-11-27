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
    Result for {subject.title || subject.description || subject.id}
  </legend>

  <Flex direction="row" align="start" justify="between" wrap>
    <div class="Criterion__Result--outcome">
      <Select
        id="{`${test}--${subject.id}--result__outcome`}"
        label="{$translate('PAGES.AUDIT.LABEL_OUTCOME')}"
        options="{outcomeOptions}"
        bind:value="{assertion.result.outcome}"
      />
    </div>

    <div class="Criterion__Result--description">
      <Textarea
        id="{`${test}--${subject.id}--result__description`}"
        label="{$translate('PAGES.AUDIT.ASSERTION_RESULT_DESCRIPTION_LABEL')}"
        bind:value="{assertion.result.description}"
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

  import Flex from './Flex.svelte';
  import Select from './formcomponents/Select.svelte';
  import Textarea from './formcomponents/Textarea.svelte';

  // Might setup to accept an assertion only
  // To reduce mistakes made.

  // Where data gets stored
  // used as:
  // - bind:value="{result.outcome}"
  // - bind:value="{result.description}"
  export let result = {};

  // Used to display as groupname
  // and for id creation
  export let subject = {};

  // Used for id creation (test.id)
  export let test = {};

  const { translate } = getContext('app');

  // This should be storeLike stuff
  // Get or set; e.g. $assertion(test, subject)
  // and returns an Assertion object
  // Will be passed through for better composability!
  let assertion = {
    result,
    test,
    subject
  };

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
