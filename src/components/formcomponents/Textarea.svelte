<Field id="{id}" label="{label}" helptext="{helptext}">
  <textarea id="{id}" rows="5"></textarea>
</Field>

<script>
  import Field from './Field.svelte';

  export let id;
  export let label;
  export let helptext;
</script>
