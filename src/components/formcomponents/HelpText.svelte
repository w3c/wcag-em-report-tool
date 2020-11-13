<!--
 * @component
 * HelpText
 * @property label <String|@html>
 * @slot Detail contents
 * -->
<details class="HelpText information" bind:open>
  <summary class="HelpText__summary">
    <Flex direction="row" align="start" justify="start">
      <div class="HelpText__label">
        {@html label}
      </div>
      <div class="HelpText__icon">
        <span class="button button-small showhidebutton">
          <span class="visuallyhidden">,</span> {@html iconValue}
        </span>
      </div>
    </Flex>
  </summary>

  <div class="HelpText__body">
    <slot />
  </div>
</details>
<!-- /component -->

<style>
  .HelpText {
    padding: 0;
  }

  .HelpText__icon {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5em;
    height: 1.5em;
  }

  .HelpText__summary {
    display: inline-block;
    margin: 0;
    list-style: none;
  }

  .HelpText__summary::-webkit-details-marker {
    display: none;
  }

  :global(.HelpText__label > *) {
    margin: 0;
    padding: 0;
  }

  .HelpText__label:not(:first-child) {
    flex-grow: 1;
    flex-shrink: 1;
  }

  .HelpText__body {
    margin: 1em 0;
    border: solid 1px #069;
    padding: 1em;
    background-color: #d0e1f1;
  }

  :global(.HelpText__body > *:not(:last-child)) {
    margin: 0 0 1em;
  }

  :global(.HelpText__body > *:last-child) {
    margin: 0;
  }
</style>

<script>
  import Flex from '../Flex.svelte';

  export let label = 'label';
  export let open = false;
  export let icon = {
    collapse: '–',
    expand: '+',
    position: 'left'
  };

  // Enforce icon defaults
  if (!icon.collapse) {
    icon.collapse = '–';
  }

  if (!icon.expand) {
    icon.expand = '+';
  }

  if (!icon.position) {
    icon.position = 'left';
  }

  $: iconValue = open ? icon.collapse : icon.expand;
</script>
