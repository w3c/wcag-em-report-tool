<Panel title="{$translate('PAGES.AUDIT.HD_SAMPLE_SELECT')}" open>
  <Details label="show info">
    <div>{$translate('PAGES.AUDIT.INF_AUDIT_SAMPLE')}</div>
  </Details>

  <Flex align="center" justify="stretch">
    <div>
      <input
        id="AuditorSamples__multiselect"
        type="checkbox"
        indeterminate="true"
      /><label
        for="AuditorSamples__multiselect"
        class="visuallyhidden"
      >{$translate('PAGES.AUDIT.SELECT_ALL')}</label>
    </div>
    <div style="margin-left: auto;">
      <button class="button button-small button-secondary">V<span class="visuallyhidden">{$translate('PAGES.AUDIT.BTN_COMPLETE_SELECTED')}</span></button>
      <button class="button button-small button-secondary">X<span class="visuallyhidden">{$translate('PAGES.AUDIT.BTN_UNCOMPLETE_SELECTED')}</span></button>
      <button class="button button-small button-secondary">^<span class="visuallyhidden">{$translate('PAGES.AUDIT.BTN_OPEN_SELECTED')}</span></button>
    </div>
  </Flex>

  <hr />

  {#each $allSamples as sample, index (sampleID(index))}
    <Flex align="center" justify="start" wrap>
      <Flex align="start" justify="start">
        <input id="sample__{sampleID(index)}" type="checkbox" value="{sample.ID}" bind:group="{$auditSamples}" />
        <label
          for="sample__{sampleID(index)}"
        >{sample.title || sample.description || `Sample ${sampleID(index)}`}
          {#if sample.completed}
            <span
              class="visuallyhidden"
            >{$translate('PAGES.AUDIT.TESTED')}</span>
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
    <div>{$translate('PAGES.AUDIT.NO_SAMPLE')}</div>
  {/each}
</Panel>

<style media="screen">
  .AuditorSample__controls {
    margin-left: auto;
  }
</style>

<script>
  import { getContext } from 'svelte';

  import { auditSamples } from '../../data/stores/auditStore.js';
  import { allSamples } from '../../data/stores/sampleStore.js';

  import Details from '../Details.svelte';
  import Flex from '../Flex.svelte';
  import Panel from '../Panel.svelte';

  const { translate } = getContext('app');

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
</script>
