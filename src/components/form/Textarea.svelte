<Field {id} {label} {helptext}>
  <slot name="before-textarea"></slot>
  <textarea id="{id}" rows="5" bind:value on:change></textarea>
</Field>

<style>
  textarea {
    display: block;
    width: 100%;
  }
</style>

<script>
  import Field from './Field.svelte';

  export let id;
  export let label;
  export let helptext = "";
  export let value = "";
</script>
