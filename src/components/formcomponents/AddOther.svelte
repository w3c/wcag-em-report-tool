<!--
 * @component
 * ListInput
 * A customizable forminput that receives
 * a value as array with either a string or an object.
 * a format of how to add a list item which is
 * an array of objects containing:
 * - required label
 * - required type; text | textarea | select | checkbox(group)
 * - optional helptext
 * - optional ...any; required props to pass on to specific formcomponents
 *
 * -->
<div class="AddOther__container">
  <div class="AddOther__Inputs" bind:this="{otherInputs}">
    <slot />
  </div>
  <button type="button" class="button-secondary" on:click="{handleAddClick}">Add {label}</button>
</div>

<style>
  :global(.AddOther__Inputs > *:not(:last-child)) {
    margin: 0 0 1em;
  }
  :global(.AddOther__Inputs > *:last-child) {
    margin-bottom: 0;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';

  export let label;

  const dispatch = createEventDispatcher();

  let otherInputs;

  function handleAddClick(event) {
    const inputs = Array.from(
      otherInputs.querySelectorAll('input, select, textarea')
    );
    const detail = inputs.map((input) => {
      return input.value;
    });

    dispatch('ADD', detail);
  }
</script>
