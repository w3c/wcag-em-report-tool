<div class="Field">
  {#if helptext}
    <HelpText
      label="{label && `<label for="${id}">${label}</label>`}"
    >
      {@html helptext}
    </HelpText>
  {:else if label}<label for="{id}">{label}:</label>{/if}

  <slot />
</div>

<style>
  .Field {
    padding: 0;
    margin-bottom: 2rem;
  }
  .Field label {
    display: block;
  }
  :global(.Field input) {
    width: 100%;
  }
  :global(.Field > *:not(:last-child)) {
    margin-bottom: 0.25em;
  }
</style>

<script>
  import HelpText from './HelpText.svelte';

  export let id;
  export let label;
  export let helptext = "";
</script>
