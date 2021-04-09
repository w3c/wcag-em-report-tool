<fieldset class="AuditorSamples">
  <legend>
    {TRANSLATED.SAMPLE_SELECT_HEADING}
  </legend>

  <ol class="AuditorSamples__list">
  {#if $allSamples.length > 0 }
    {#each $allSamples as sample, index (sampleID(index))}
      <li class="AuditorSamples__item">
        <input
          id="sample__{sampleID(index)}"
          type="checkbox"
          value="{sample.ID}"
          bind:group="{$auditSamples}"
        />
        <label
          for="sample__{sampleID(index)}"
        >{sample.title || sample.description || `Sample ${sampleID(index)}`}
          {#if sample.completed}
            <span
              class="visuallyhidden"
            >{TRANSLATED.SAMPLE_SELECT_TESTED}</span>
          {/if}
        </label>
        {#if isURL(sample.description)}
          <a class="AuditorSamples__link" href="{sample.description}">{sample.description}</a>
        {/if}
    </li>
    {/each}
    <div class="AuditorSamples__select-all">
      <input
        id="AuditorSamples__multiselect"
        type="checkbox"
        indeterminate="{someChecked}"
        checked="{allChecked}"
        on:change="{handleMultiselectClick}"
      />
      <label
        for="AuditorSamples__multiselect"
      >{TRANSLATED.SAMPLE_SELECT_LABEL_SELECT_ALL}</label>
    </div>
  {:else}
    <div class="AuditorSamples__empty">{TRANSLATED.SAMPLE_SELECT_NO_SAMPLE}</div>
  {/if}
</fieldset>

<style media="screen">
  .AuditorSamples__list {
    padding: 0;
    margin: 0;
  }
  .AuditorSamples__item {
    list-style: none;
  }
  .AuditorSamples__select-all {
    margin-top: 1em;
  }
  .AuditorSamples__link {
    display: block;
    font-size: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 12em;
  }
  legend {
    font-size: 1rem;
  }
</style>

<script>
  import { getContext } from 'svelte';

  import { auditSamples } from '@app/stores/auditStore.js';
  import { allSamples } from '@app/stores/sampleStore.js';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    SAMPLE_SELECT_HEADING: $translate('PAGES.AUDIT.HD_SAMPLE_SELECT'),
    SAMPLE_SELECT_INFO: $translate('PAGES.AUDIT.INF_AUDIT_SAMPLE'),
    SAMPLE_SELECT_LABEL_SELECT_ALL: $translate('PAGES.AUDIT.SELECT_ALL'),
    SAMPLE_SELECT_BUTTON_COMPLETE_SELECTED: $translate('PAGES.AUDIT.BTN_COMPLETE_SELECTED'),
    SAMPLE_SELECT_BUTTON_UNCOMPLETE_SELECTED: $translate('PAGES.AUDIT.BTN_UNCOMPLETE_SELECTED'),
    SAMPLE_SELECT_BUTTON_OPEN_SELECTED: $translate('PAGES.AUDIT.BTN_OPEN_SELECTED'),
    SAMPLE_SELECT_TESTED: $translate('PAGES.AUDIT.TESTED'),
    SAMPLE_SELECT_NO_SAMPLE: $translate('PAGES.AUDIT.NO_SAMPLE')
  };

  $: allSampleIDs = $allSamples.map((sample) => sample.ID);
  $: allChecked = allSampleIDs.length === $auditSamples.length;
  $: someChecked = !allChecked && $auditSamples.length > 0;

  function sampleID(index) {
    return parseInt(index, 10) + 1;
  }

  function isURL(value) {
    try {
      return new URL(value);
    } catch (e) {
      return false;
    }
  }

  function handleMultiselectClick() {
    $auditSamples = [];

    if (!allChecked) {
      $auditSamples = allSampleIDs;
    }
  }
</script>
