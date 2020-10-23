<!--
 * @component
 * Details
 * @property label <String|@html>
 * @slot Detail contents
 * -->
<details class="Details" bind:open>
  <summary class="Details__summary">
    <Flex direction="row" align="start" justify="start">
      {#if icon.position !== 'right'}
        <span class="Details__icon"><Button type="secondary" small fake>{@html iconValue}</Button></span>
      {/if}
      <span class="Details__label">{@html label}</span>
      {#if icon.position === 'right'}
        <span class="Details__icon"><Button type="secondary" small fake>{@html iconValue}</Button></span>
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Details__summary {
    list-style: none;
  }

  .Details__summary::-webkit-details-marker {
    display: none;
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

  .Details__body {}

  :global(.Details__body > *:not(:last-child)) {
    margin: 0 0 1em;
  }

  :global(.Details__body > *:last-child) {
    margin: 0;
  }
</style>

<script>
  import Button from './Button.svelte';
  import Flex from './Flex.svelte';

  export let label = 'label';
  export let open = false;
  export let icon = {
    collapse: '–',
    expand: '+',
    position: 'left'
  };

  // Enforce icon defaults
  if (!icon.collapse) {
    icon.collapse = '-';
  }

  if (!icon.expand) {
    icon.expand = '+';
  }

  if (!icon.position) {
    icon.position = 'left';
  }

  $: iconValue = open
    ? icon.collapse
    : icon.expand;

</script>
