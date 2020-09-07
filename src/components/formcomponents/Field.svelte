<div class="field">
  <label for="{id}">{label}</label>
  {#if helptext}
    <details>
      <summary>Help <span class="visually-hidden">for {label}</span></summary>
      <p>{helptext}</p>
    </details>
  {/if}

  <slot></slot>
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
