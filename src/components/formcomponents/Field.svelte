<div class="Field field">
  {#if helptext}
    <Details label={label && `<label for="${id}">${label}</label>`}>
      {#if Array.isArray(helptext)}
        <ul>
          {#each helptext as help}
            <li>{help}</li>
          {/each}
        </ul>
      {:else}
        <p>{helptext}</p>
      {/if}
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

  :global(.Field label) {
    font-weight: bold;
  }
</style>

<script>
  import Details from '../Details.svelte';

  export let id;
  export let label;
  export let helptext;
</script>
