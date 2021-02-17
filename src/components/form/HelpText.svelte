<!--
 * @component
 * HelpText
 * @property label <String|@html>
 * @slot Detail contents
 * -->
<div class="HelpText information" >
  <div class="HelpText__label">
    {@html label}
    <button type="button" on:click={toggle} class="button button-small showhidebutton">
      {@html iconValue}
    </button>
  </div>
   {#if open}
  <div class="HelpText__body">
    <slot />
  </div>
  {/if}
</div>
 <!-- /component -->

<style>
  .HelpText {
    padding: 0;
  }

  :global(.HelpText__label label) {
    display: inline-block;
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
  export let label = 'label';
  export let open = false;
  export let icon = {
    collapse: '–',
    expand: '+',
    position: 'left'
  };

  function toggle() {
    open = !open;
  }

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
