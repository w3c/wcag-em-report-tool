<Field id="{id}" label="{label}" helptext="{helptext}">
  <textarea id="{id}" rows="5" bind:value on:change></textarea>
</Field>

<script>
  import Field from './Field.svelte';

  export let id;
  export let label;
  export let helptext;
  export let value;
</script>
