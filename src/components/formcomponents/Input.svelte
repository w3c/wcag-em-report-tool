<Field id="{id}" label="{label}">
  <input id="{id}" type="text" name="" bind:value bind:this={textInput} />
</Field>

<script>
  import { onMount } from 'svelte';
  import Field from './Field.svelte';

  export let id;
  export let label;
  export let value = '';
  export let autofocus = false;

  let textInput;

  onMount(() => {
    if (autofocus) {
      textInput.focus();
    }
  });
</script>
