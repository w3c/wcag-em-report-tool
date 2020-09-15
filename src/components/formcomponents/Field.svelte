<div class="field">
  {#if label}<label for="{id}">{label}</label>{/if}
  {#if helptext}
    <details>
      <summary>Help <span class="visually-hidden">for {label}</span></summary>
      <p>{helptext}</p>
    </details>
  {/if}

  <slot />
</div>

<style>
  label {
    font-weight: bold;
  }
</style>

<script>
  export let id;
  export let label;
  export let helptext;
</script>
