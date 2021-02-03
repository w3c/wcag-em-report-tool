<!--
 * @component
 * SampleInput
 * A customizable forminput that receives
 * a value as array with either a string or an object.
 * a format of how to add a list item which is
 * an array of objects containing:
 * - required label
 * - required type; text | textarea | select | checkbox(group)
 * - optional helptext
 * - optional ...any; required props to pass on to specific formcomponents
 * -->
<fieldset id="{id}">
  <legend>{label}</legend>
  {#if helptext}
    <Details label="{TRANSLATED.SHOW_INFO_BUTTON}">
      {@html helptext}
    </Details>
  {/if}

  <slot />

  <div id="{id}--value" class="ListInput--value">
    {#if value.length > 0}
      <ol title="{label}" bind:this="{valueContainer}">
        {#each value as sample, index (sample.ID)}
          <li>
            <Sample
              id="{id}__{index + 1}"
              bind:data="{sample}"
              on:DELETE="{handleSampleDelete}"
            />
          </li>
        {/each}
      </ol>
    {:else}
      <p><em>{TRANSLATED.NO_SAMPLE}</em></p>
    {/if}
  </div>

  <AddOther
    label="{TRANSLATED.ADD_PAGE_BUTTON}"
    on:ADD="{handleSampleAdd}"
  ></AddOther>
</fieldset>
<!-- /component -->

<script>
  import { getContext } from 'svelte';

  import subjects, { TestSubjectTypes } from 'stores/earl/subjectStore/index.js';

  import AddOther from 'components/formcomponents/AddOther.svelte';
  import Details from 'components/Details.svelte';
  import Sample from './Sample.svelte';

  export let id;
  export let label;
  export let helptext;
  export let value = [];

  let valueContainer;
  const { translate } = getContext('app');

  $: TRANSLATED = {
    NO_SAMPLE: $translate('PAGES.SAMPLE.NO_PAGES_DEFINED'),
    ADD_PAGE_BUTTON: $translate('PAGES.SAMPLE.BTN_ADD_PAGE'),
    SHOW_INFO_BUTTON: $translate('UI.COMMON.BUTTON.INFO')
  };

  function handleSampleAdd() {
    const newSample = subjects.create({
      type: TestSubjectTypes.WEBPAGE
    });

    value = [...value, newSample];
  }

  function handleSampleDelete(event) {

    const removeSample = value.find(sample => sample.ID === event.detail);
    const indexSample = value.indexOf(removeSample);

    // value need to be set explicitly
    const newValue = value;
    newValue.splice(indexSample, 1);
    value = newValue;
    // @TODO: removeSample.delete(); !required for cleanup
    subjects.remove(removeSample);
  }
</script>
