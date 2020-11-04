<Panel title="{$translate('PAGES.AUDIT.HD_SAMPLE_SELECT')}" open>
  <Details label="show info">
    <div>{$translate('PAGES.AUDIT.INF_AUDIT_SAMPLE')}</div>
  </Details>

  <div class="buttongroup actionbar">
    <input
      id="AuditorSamples__multiselect"
      type="checkbox"
      indeterminate="true"
    /><label
      for="AuditorSamples__multiselect"
      class="visuallyhidden"
    >{$translate('PAGES.AUDIT.SELECT_ALL')}</label>
    <button class="button button-small button-secondary">V<span class="visuallyhidden">{$translate('PAGES.AUDIT.BTN_COMPLETE_SELECTED')}</span></button>
    <button class="button button-small button-secondary">X<span class="visuallyhidden">{$translate('PAGES.AUDIT.BTN_UNCOMPLETE_SELECTED')}</span></button>
    <button class="button button-small button-secondary">^<span class="visuallyhidden">{$translate('PAGES.AUDIT.BTN_OPEN_SELECTED')}</span></button>
  </div>

  {#each samples as sample}
    <div>
      <input id="{sample.id}" type="checkbox" />
      <label for="{sample.id}">{sample.title}
        {#if sample.completed}
          <span class="visuallyhidden">{$translate('PAGES.AUDIT.TESTED')}</span>
        {/if}
      </label>
      <button type="button">Open</button>
    </div>
  {:else}
    <div>{$translate('PAGES.AUDIT.NO_SAMPLE')}</div>
  {/each}
  <div class=""></div>
</Panel>

<script>
  import { getContext } from 'svelte';
  import { t as translate } from 'svelte-i18n';

  import Details from '../Details.svelte';
  import Panel from '../Panel.svelte';

  const { sampleStore } = getContext('app');

  $: samples = [
    ...$sampleStore['STRUCTURED_SAMPLE'],
    ...$sampleStore['RANDOM_SAMPLE']
  ];

  console.log(samples);
</script>
