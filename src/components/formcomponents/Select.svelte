<Field {id} {label}>
  <select {id} disabled={options.length === 0}>
    {#each options as option}
      <option value="{option.value || option.title || option}" selected={option.selected}>{option.title || option}</option>
    {:else}
      <option value="null">No options</option>
    {/each}
  </select>
</Field>

<script>
  import Field from './Field.svelte';

  export let id;
  export let label;
  export let options = [];
</script>
