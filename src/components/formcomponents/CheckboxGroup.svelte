<fieldset id="{id}" class="field">
  <legend>{label}</legend>

  <ol>
    {#each options as option, index}
      <li>
        <input
          id="{`${id}_${index}`}"
          type="checkbox"
          value="{option.value || option.title || option}"
          checked="{option.checked}"
          name="{label}"
        />
        <label for="{`${id}_${index}`}">{option.title || option}</label>
      </li>
    {/each}
  </ol>
</fieldset>

<style>
  label,
  input {
    display: inline-block;
    cursor: pointer;
  }

  input:focus,
  input:hover {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  ol {
    columns: 4 10em;
    column-gap: 2em;
  }
</style>

<script>
  export let id;
  export let label;
  export let options = [];
</script>
