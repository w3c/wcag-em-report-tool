<div class="Editable">
  <div class="Editable__Contents">
    <slot />
  </div>

  <div class="Editable__Controls">
    {#if !persistent}
      <button
        type="button"
        class="Editable__Control--edit button-secondary"
        on:click="{handleEditClick}"
        bind:this="{EditToggle}"
      >{#if editing}Done{:else}Edit{/if}
        <span class="visually-hidden">{label}</span></button>
    {/if}
    {#if removable}
      <button
        type="button"
        class="Editable__Control--delete button-secondary"
        on:click="{dispatchDelete}"
      >Delete <span class="visually-hidden">{label}</span></button>
    {/if}
  </div>
</div>

<style>
  .Editable {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
  }

  :global(.Editable__Contents > *:not(:last-child)) {
    margin-bottom: 1em;
  }

  :global(.Editable__Contents > *:last-child) {
    margin-bottom: 0;
  }
</style>

<script context="module">
  import { writable } from 'svelte/store';

  export const editMode = writable({});
</script>

<script>
  import { createEventDispatcher } from 'svelte';

  export let id = '';
  export let label = '';
  export let persistent = false;
  export let removable = false;

  const dispatch = createEventDispatcher();
  const EVENT = {
    DELETE: 'DELETE',
    EDIT: 'EDIT'
  };

  let EditToggle;

  $: editing = $editMode[id] = persistent;

  function handleEditClick() {
    if (!editing) {
      dispatchEdit();
    }

    $editMode[id] = !editing;
  }

  function dispatchDelete() {
    dispatch(EVENT.DELETE, id);
  }

  function dispatchEdit() {
    dispatch(EVENT.EDIT, id);
  }
</script>
