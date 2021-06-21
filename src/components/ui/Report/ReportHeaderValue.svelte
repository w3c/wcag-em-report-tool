{#if editing}
  {#if multiline}
    <textarea
    bind:value={storeToUse[field]}
    id={`evaluation-meta-edit-${field}`}
    ></textarea>
  {:else}
  <input
    type="text"
    bind:value={storeToUse[field]}
    id={`evaluation-meta-edit-${field}`} />
  {/if}
{:else}
  {#if storeToUse[field]}
    {storeToUse[field]}
  {:else}
    <span class="no-result">{TRANSLATED.LABEL_NOT_PROVIDED}</span>
  {/if}
{/if}

<style>
  .no-result {
    font-weight: normal;
    font-style: italic;
    margin-bottom: 1em;
  }
  textarea {
    margin-bottom: 1em;
  }
</style>

<script>
  import { getContext } from 'svelte';
  const { scopeStore, summaryStore, translate } = getContext('app');  
  
  export let field;
  export let multiline = false;
  export let editing;
  export let store;

  $: storeToUse = getStore(store); 
  
  function getStore(store) {
    if (store === "scopeStore") {
      return $scopeStore
    }
    if (store === "summaryStore") {
      return $summaryStore
    }
  }

  $: TRANSLATED = {
    LABEL_NOT_PROVIDED: $translate('UI.REPORT.LABEL_NOT_PROVIDED'),
  };
</script>