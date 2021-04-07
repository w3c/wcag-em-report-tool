{#if editing}
<Select
bind:value={storeToUse[field]}
id={`evaluation-meta-edit-${field}`}
options={options}
>
</Select>
{:else}
{#if storeToUse[field]}
{storeToUse[field]}
{:else}
<span class="no-result">(Not provided)</span>
{/if}
{/if}

<style>
  .no-result {
    font-weight: normal;
    font-style: italic;
  }
</style>

<script>
  import Select from '@app/components/form/Select.svelte';
  import { getContext } from 'svelte';

  const { scopeStore, summaryStore } = getContext('app');  

  export let field;
  export let editing;
  export let options;
  export let store = "scopeStore";
 
  $: storeToUse = getStore(store); 
  
  function getStore(store) {
    if (store === "scopeStore") {
      return $scopeStore
    }
    if (store === "summaryStore") {
      return $summaryStore
    }
  }
</script>
