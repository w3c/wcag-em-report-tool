<div class="Editable">
  <div class="Editable__Contents" tabindex="0" title="editable text">
    <slot />
  </div>

  <div class="Editable__Controls">
    <button
      type="button"
      class="Editable__Control--edit"
      on:click="{toggleEditMode}"
    >{#if editMode}Done{:else}Edit{/if}</button>
    <button
      type="button"
      class="Editable__Control--delete button-secondary"
      on:click="{dispatchDelete}"
    >Delete</button>
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte';

  export let id = '';

  const dispatch = createEventDispatcher();
  const EVENT = {
    DELETE: 'DELETE',
    EDIT: 'EDIT'
  };
  let editMode = false;

  function dispatchDelete() {
    dispatch(EVENT.DELETE, id);
  }

  function toggleEditMode() {
    editMode = !editMode;
    dispatch(EVENT.EDIT, id);
  }
</script>
