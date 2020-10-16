<div class="Editable" class:editing>
  <div class="Editable__Contents">
    <slot />
  </div>

  <div class="Editable__Controls">
    <button
      type="button"
      class="Editable__Control--edit button-secondary"
      on:click="{handleEditClick}"
      bind:this="{EditToggle}"
    >{#if editing}Done{:else}Edit{/if}
      <span class="visually-hidden">{label}</span></button>
    {#if !editing}
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
    flex-direction: row;
  }

  .editing {
    flex-direction: column;
  }

  :not(.editing) > .Editable__Controls {
    margin-left: auto;
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

  const dispatch = createEventDispatcher();
  const EVENT = {
    DELETE: 'DELETE',
    EDIT: 'EDIT'
  };

  let EditToggle;

  $: editing = $editMode[id];

  function handleEditClick(event) {
    if (!editing) {
      dispatchEdit();
    }

    $editMode[id] = !editing;
  }

  function dispatchDelete() {
    dispatch(EVENT.DELETE, id);
  }

  function dispatchEdit() {
    dispatch(EVENT.ID, id);
    console.log(EVENT.EDIT);
  }
</script>
