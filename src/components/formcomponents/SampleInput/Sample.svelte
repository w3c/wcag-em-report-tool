<Editable
  id="{id}"
  on:EDIT="{handleSampleEdit}"
  on:DELETE
>
  {#if editMode}
    <Input
      id="{id}__name"
      label="{$translate('PAGES.SAMPLE.LABEL_HANDLE')}"
      autofocus={true}
      bind:value="{title}"
      bind:this={SampleName}
    />
    <Input
      id="{id}__href"
      label="{$translate('PAGES.SAMPLE.LABEL_PAGE')}"
      bind:value="{href}"
    />
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

  import Editable from '../Editable.svelte';
  import Input from '../Input.svelte';

  export let id;
  export let title;
  export let href;

  export let editable = false;

  let editMode = editable;
  let SampleName;

  function handleSampleEdit(event) {
    editMode = !editMode;
  }
</script>
