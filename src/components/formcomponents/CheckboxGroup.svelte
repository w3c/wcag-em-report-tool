<fieldset id="{id}" class="CheckboxGroup field">
  <legend>{label}</legend>

  <ol>
    {#each options as option, index (option)}
      <li>
        <input
          id="{`${id}_${index}`}"
          type="checkbox"
          value="{option.value || option.title || option}"
          checked="{option.checked}"
          name="{label}"
          bind:group={value}
          on:change
        />
        <label for="{`${id}_${index}`}">{option.title || option}</label>
      </li>
    {/each}
  </ol>

  {#if editable}
    <AddOther label="Add other {label}" on:ADD="{handleCheckboxAdd}">
      <Input id="{id}__other" label="Other {label}" />
    </AddOther>
  {/if}
</fieldset>

<style>
  label,
  input[type="checkbox"] {
    display: inline-block;
    cursor: pointer;
  }

  input[type="checkbox"] {
    flex-grow: 0;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  label {
    margin-left: 0.5em;
    flex-grow: 0;
    flex-shrink: 1;
    word-break: break-word;
  }

  input[type="checkbox"]:focus,
  input[type="checkbox"]:hover {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  ol {
    margin: 0 0 3em;
    padding: 0;
    columns: 4 10em;
    column-gap: 2em;
    list-style: none;
  }

  ol > li {
    break-inside: avoid-column;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';

  import AddOther from './AddOther.svelte';
  import Input from './Input.svelte';

  export let id;
  export let label;
  export let options = [];
  export let editable = false;

  const dispatch = createEventDispatcher();

  function handleCheckboxAdd(event) {
    const newOption = {
      title: event.detail.join(),
      // checked: true
    };

    if (!options.some(option => option.title === newOption.title)) {
      options = [...options, newOption];
      value = [...value, newOption.title];

      dispatch('change', value);
    }
  }
</script>

<script context="module">
  let value = [];

  export function getValue() {
    return value;
  }
</script>
