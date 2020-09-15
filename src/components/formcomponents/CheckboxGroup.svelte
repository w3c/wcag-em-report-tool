<fieldset {id} class="field">
  <legend>{label}</legend>

  {#each options as option, index}
    <div>
      <input
        id="{`${id}_${index}`}"
        type="checkbox"
        value="{option.value || option.title || option}"
        checked="{option.checked}"
        name="{label}"
      />
      <label for="{`${id}_${index}`}">{option.title || option}</label>
    </div>
  {/each}
</fieldset>

<style>
  label,
  input {
    display: inline !important;
  }
</style>

<script>
  export let id;
  export let label;
  export let options = [];
</script>
