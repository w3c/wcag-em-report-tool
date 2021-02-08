<div class="File">
  <input
    id="{id}"
    class="File__input visuallyhidden"
    type="file"
    accept="{accept}"
    bind:files
    bind:value
    on:change
  />
  <label for="{id}" class="File__label button button-secondary">{label}</label>
  {#if showFiles}
    <output for="{id}" title="Selected file(s)">
      {#each files as file}{file.name}<br />{:else}No file selected{/each}
    </output>
  {/if}
</div>

<style>
  :focus + .File__label {
    color: #fff;
    background-color: #036;
    border-color: #036;
  }

  .File__label {
    display: block;
    text-align: center;
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
  export let id;
  export let label = 'File';
  export let value = '';
  export let accept = ['.json', '.jsonld'].join(',');
  export let showFiles = false;

  let files = [];
</script>
