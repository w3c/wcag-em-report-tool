<!--
 * @component
 * Details
 * @property label <String|@html>
 * @slot Detail contents
 * -->
<details class="Details" bind:open>
  <summary class="Details__summary">
    <Flex direction="row" align="start" justify="start">
      {#if iconPosition !== 'right'}
        <span class="Details__icon">{@html icon}</span>
      {/if}
      <span class="Details__label">{@html label}</span>
      {#if iconPosition === 'right'}
        <span class="Details__icon">{@html icon}</span>
      {/if}
    </Flex>
  </summary>

  <div class="Details__body">
    <slot />
  </div>
</details>
<!-- /component -->

<style>
  .Details {
  }

  .Details__icon {
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px currentColor;
    border-radius: 3px;
    padding: 0 0.25em;
    min-width: 1.5em;
    height: 1.5em;
    font-size: 1em;
    color: inherit;
    background-color: transparent;
  }

  .Details__summary {
    list-style: none;
    outline: none;
  }

  .Details__summary::-webkit-details-marker {
    display: none;
  }

  .Details__summary:focus .Details__icon,
  .Details__summary:hover .Details__icon {
    color: #fff;
    background-color: #333;
    border-color: #333;
  }

  :global(.Details__label > *) {
    margin: 0;
    padding: 0;
  }

  .Details__label:not(:first-child) {
    flex-grow: 1;
    flex-shrink: 1;
  }

  .Details__icon + .Details__label,
  .Details__label + .Details__icon {
    margin-left: 0.5em;
  }

  .Details__body {
    font-style: italic;
  }

  :global(.Details__body > *:not(:last-child)) {
    margin: 0 0 1em;
  }

  :global(.Details__body > *:last-child) {
    margin: 0;
  }
</style>

<script>
  import Flex from './Flex.svelte';

  export let label = 'label';
  export let open = false;

  export let iconCollapse = '–';
  export let iconExpand = '+';
  export let iconPosition = 'left';

  $: icon = open ? iconCollapse : iconExpand;
</script>
