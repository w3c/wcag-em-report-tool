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

  {#each $allSamples as sample, index}
    <Flex align="center" justify="start">
      <Flex align="start" justify="start">
        <input id="sample__{index + 1}" type="checkbox" />
        <label
          for="sample__{index + 1}"
        >{sample.title || sample.description || `Sample ${index + 1}`}
          {#if sample.completed}
            <span
              class="visuallyhidden"
            >{$translate('PAGES.AUDIT.TESTED')}</span>
          {/if}
        </label>
      </Flex>
      <div><button type="button" class="button-small">Open</button></div>
    </Flex>
  {:else}
    <div>{$translate('PAGES.AUDIT.NO_SAMPLE')}</div>
  {/each}
</Panel>

<script>
  import { getContext } from 'svelte';

  import { allSamples } from '../../data/stores/sampleStore.js';

  import Details from '../Details.svelte';
  import Flex from '../Flex.svelte';
  import Panel from '../Panel.svelte';

  const { translate } = getContext('app');
</script>
