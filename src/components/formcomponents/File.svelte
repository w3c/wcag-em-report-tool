<div class="field">
  <input
    id="{id}"
    class="visuallyhidden"
    type="file"
    accept="{accept}"
    bind:files
    bind:value
    on:change
  />
  <label for="{id}"><Button type="secondary" fake>{label}</Button></label>
  {#if showFiles}
    <output for="{id}" title="Selected file(s)">
      {#each files as file}{file.name}<br />{:else}No file selected{/each}
    </output>
  {/if}
</div>

<style>
  :focus + label {
  }
</style>

<script context="module">
  export function readFile(file, callback = () => {}) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      callback(fileReader.result);
    };

    fileReader.onabort = () => {
      console.error('Reading aborted');
    };

    fileReader.onerror = (error) => {
      throw error;
    };

    fileReader.readAsText(file);
  }
</script>

<script>
  import Button from '../Button.svelte';

  export let id;
  export let label = 'File';
  export let value = '';
  export let accept = ['.json', '.jsonld'].join(',');
  export let showFiles = false;

  let files = [];
</script>
