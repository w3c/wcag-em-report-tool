<!--
 * @component
 * Details
 * @property label <String|@html>
 * @slot Detail contents
 * -->
<details class="Details" bind:open="{open}">
  <summary class="Details__label">
    {#if iconPosition !== 'right'}
      <span class="Details__icon">{@html icon}</span>
    {/if}
    <span>{@html label}</span>
    {#if iconPosition === 'right'}
      <span class="Details__icon">{@html icon}</span>
    {/if}
  </summary>

  <div class="Details__body">
    <slot />
  </div>
</details>
<!-- /component -->

<style>
  .Details {}

  .Details__icon {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px #066;
    border-radius: 5px;
    width: 1.5em;
    height: 1.5em;
    font-size: 1em;
    font-weight: bold;
    color: #066;
    background-color: transparent;
  }

  .Details__label {
    list-style: none;
  }

  .Details__label::-webkit-details-marker {
    display: none;
  }

  .Details__label:focus > .Details__icon,
  .Details__label:hover > .Details__icon {
    color: #fff;
    background-color: #036;
    border-color: #036;
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
  export let label = 'label';
  export let open = false;

  export let iconCollapse = '–';
  export let iconExpand = '+';
  export let iconPosition = 'left';

  $: icon = open ? iconCollapse : iconExpand;
</script>
