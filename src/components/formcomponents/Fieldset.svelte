<fieldset id="{id}" class="Fieldset field">
  <legend>{@html legend}</legend>

  {#if helptext}
    <div class="Fieldset__helptext">
      <Details label="Show info">
        {@html helptext}
      </Details>
    </div>
  {/if}

  <div class="Fieldset__elements">
    <slot />
  </div>
</fieldset>

<style>
  .Fieldset {
    padding: 0;
  }

  .Fieldset__helptext {
    margin: 1em 0;
  }

  :global(.Fieldset__elements > *:not(:last-child)) {
    margin-bottom: 2rem;
  }
</style>

<script>
  import Details from '../Details.svelte';

  export let id;
  export let legend;
  export let helptext;

</script>
