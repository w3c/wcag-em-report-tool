<div class="Field field">
  {#if label}<label for="{id}">{label}</label>{/if}
  {#if helptext}
    <Details label={`Help <span class="visually-hidden">for ${label}</span>`}>
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
  {/if}

  <slot/>
</div>

<style>
  .Field {
    padding: 0;
  }

  label {
    font-weight: bold;
  }
</style>

<script>
  import Details from '../Details.svelte';

  export let id;
  export let label;
  export let helptext;
</script>
