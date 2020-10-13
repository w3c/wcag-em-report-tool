<Field id="{id}" label="{label}">
  <input id="{id}" type="text" name="" bind:value />
</Field>

<script>
  import Field from './Field.svelte';

  export let id;
  export let label;
  export let value = '';
</script>
