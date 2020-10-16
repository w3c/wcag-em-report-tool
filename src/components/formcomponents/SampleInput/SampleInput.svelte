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
        {#each value as item (item.id)}
          <li>
            <Sample
              id="{item.id}"
              bind:title="{item.title}"
              bind:href="{item.href}"
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
    on:ADD="{handleAdd}"
  >
    <Input id="{id}__name" label="{$translate('PAGES.SAMPLE.LABEL_HANDLE')}" />
    <Input id="{id}__href" label="{$translate('PAGES.SAMPLE.LABEL_PAGE')}" />
  </AddOther>
</fieldset>

<style>
  :global(.AddItem > *:not(:last-child)) {
    margin: 0 0 1em;
  }
  :global(.AddItem > *:last-child) {
    margin-bottom: 0;
  }
</style>

<script>
  import { t as translate } from 'svelte-i18n';

  import AddOther from '../AddOther.svelte';
  import Details from '../../Details.svelte';
  import Input from '../Input.svelte';
  import Sample from './Sample.svelte';

  export let id;
  export let label;
  export let helptext;
  export let value = [];

  let valueContainer;

  function handleAdd(event) {
    const newId =
      value.length > 0 ? Math.max(...value.map((i) => parseInt(i.id.replace(`${id}__`, ''), 10))) + 1 : 1;

    const newSample = {
      id: `${id}__${newId}`,
      title: event.detail[0],
      href: event.detail[1]
    };

    if (event.detail !== value) {
      value = [...value, newSample];
    }
  }

  function handleSampleDelete(event) {
    const removeSample = value.find(sample => sample.id === event.detail);
    const indexSample = value.indexOf(removeSample);

    // This construct is required due to Svelte's reactivity rules...
    // value need to be set explicitly
    const newValue = value;
    newValue.splice(indexSample, 1);
    value = newValue;
  }
</script>
