<div class="Field field">
  {#if helptext}
    <HelpText
      label="{label && `<label for="${id}">${label}</label>`}"
      icon={helptextIcon}
    >
      {@html helptext}
    </HelpText>
  {:else if label}<label for="{id}">{label}</label>{/if}

  <slot />
</div>

<style>
  .Field {
    padding: 0;
  }

  :global(.Field > *:not(:last-child)) {
    margin-bottom: 0.5em;
  }
</style>

<script>
  import HelpText from './HelpText.svelte';

  export let id;
  export let label;
  export let helptext;

  const helptextIcon = {
    collapse: 'Hide info',
    expand: 'Show info',
    position: 'right'
  };
</script>
