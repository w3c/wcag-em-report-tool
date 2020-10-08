<div class="Editable">
  <div class="Editable__Contents" tabindex="0" title="editable text">
    <slot />
  </div>

  <div class="Editable__Controls">
    {#if editMode}
      <button
        type="button"
        class="Editable__Control--edit"
        on:click={handleUpdateClick}
      >Done</button>
    {:else}
      <button
        type="button"
        class="Editable__Control--edit"
        on:click={toggleEditMode}
      >Edit</button>
    {/if}
    <button
      type="button"
      class="Editable__Control--delete button-secondary"
      on:click={dispatchDelete}
    >Delete</button>
  </div>
</div>

<script>
  let editMode = false;

  function handleUpdateClick() {
    console.log('UPDATE');
    toggleEditMode();
  }

  function dispatchDelete() {
    console.log('DELETE');
  }

  function toggleEditMode() {
    editMode = !editMode;
  }
</script>
