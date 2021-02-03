<Panel title="{TRANSLATED.SAMPLE_SELECT_HEADING}" open>
  <Details label="show info">
    <div>{TRANSLATED.SAMPLE_SELECT_INFO}</div>
  </Details>

  <Flex align="center" justify="stretch">
    <div>
      <input
        id="AuditorSamples__multiselect"
        type="checkbox"
        indeterminate="{someChecked}"
        checked="{allChecked}"
        on:change="{handleMultiselectClick}"
      /><label
        for="AuditorSamples__multiselect"
        class="visuallyhidden"
      >{TRANSLATED.SAMPLE_SELECT_LABEL_SELECT_ALL}</label>
    </div>
    <div style="margin-left: auto;">
      <button class="button button-small button-secondary">V<span class="visuallyhidden">{TRANSLATED.SAMPLE_SELECT_BUTTON_COMPLETE_SELECTED}</span></button>
      <button class="button button-small button-secondary">X<span class="visuallyhidden">{TRANSLATED.SAMPLE_SELECT_BUTTON_UNCOMPLETE_SELECTED}</span></button>
      <button class="button button-small button-secondary">^<span class="visuallyhidden">{TRANSLATED.SAMPLE_SELECT_BUTTON_OPEN_SELECTED}</span></button>
    </div>
  </Flex>

  <hr />

  {#each $allSamples as sample, index (sampleID(index))}
    <Flex align="center" justify="start" wrap>
      <Flex align="start" justify="start">
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
      </Flex>
      <div class="AuditorSample__controls">
        {#if isURL(sample.description)}
          <a class="button button-small" href="{sample.description}">Open</a>
        {/if}
      </div>
    </Flex>
  {:else}
    <div>{TRANSLATED.SAMPLE_SELECT_NO_SAMPLE}</div>
  {/each}
</Panel>

<style media="screen">
  .AuditorSample__controls {
    margin-left: auto;
  }
</style>

<script>
  import { getContext } from 'svelte';

  import { auditSamples } from 'data/stores/auditStore.js';
  import { allSamples } from 'data/stores/sampleStore.js';

  import Details from 'components/Details.svelte';
  import Flex from 'components/Flex.svelte';
  import Panel from 'components/Panel.svelte';

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
