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
    <Details label="Info">
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
      <p><em>{$translate('PAGES.SAMPLE.NO_PAGES_DEFINED')}</em></p>
    {/if}
  </div>

  <AddOther
    label="{$translate('PAGES.SAMPLE.BTN_ADD_PAGE')}"
    on:ADD="{handleSampleAdd}"
  ></AddOther>
</fieldset>
<!-- /component -->

<script>
  import { getContext } from 'svelte';

  import subjects from '../../../data/stores/earl/subjectStore.js';

  import AddOther from '../AddOther.svelte';
  import Details from '../../Details.svelte';
  import Sample from './Sample.svelte';

  export let id;
  export let label;
  export let helptext;
  export let value = [];

  const { translate } = getContext('app');
  let valueContainer;

  function handleSampleAdd() {
    const newSample = subjects.create({
      type: 'WebPage'
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
