<div class="Field field">
  {#if helptext}
    <Details label={label && `<label for="${id}">${label}</label>`}>
      {@html helptext}
    </Details>
  {:else if label}
    <label for="{id}">{label}</label>
  {/if}

  <slot/>
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
  import Details from '../Details.svelte';

  export let id;
  export let label;
  export let helptext;
</script>
