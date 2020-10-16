<Editable
  id="{id}"
  label="{title || href}"
  on:EDIT="{handleSampleEdit}"
  on:DELETE
>
  {#if editing}
    <fieldset>
      <legend>Edit {title}</legend>
      <Input
        id="{id}__name"
        label="{$translate('PAGES.SAMPLE.LABEL_HANDLE')}"
        autofocus="{true}"
        bind:value="{title}"
        on:keydown="{handleEditableKeydown}"
      />
      <Input
        id="{id}__href"
        label="{$translate('PAGES.SAMPLE.LABEL_PAGE')}"
        bind:value="{href}"
        on:keydown="{handleEditableKeydown}"
      />
    </fieldset>
  {:else}
    <!-- <Sample title description edit/> -->
    {#if href !== ''}
      <a
        href="{href}"
        target="_blank"
        rel="noreferrer noopener"
      >{#if title !== ''}{title}{:else}{href}{/if}</a> ({href})
    {:else}{title}{/if}
  {/if}
</Editable>

<script>
  import { t as translate } from 'svelte-i18n';

  import Editable, { editMode } from '../Editable.svelte';
  import Input from '../Input.svelte';

  export let id;
  export let title;
  export let href;

  $: editing = $editMode[id];

  function handleSampleEdit() {
    toggleEditMode();
  }

  function handleEditableKeydown(event) {
    if (event.key === 'Enter') {
      toggleEditMode();
    }
  }

  function toggleEditMode() {
    $editMode[id] = !editing;
  }
</script>
