<Editable
  id="{data.ID}"
  label="{data.title || $translate('PAGES.SAMPLE.SAMPLE_PAGE')}"
  persistent="{true}"
  removable="{true}"
  on:DELETE
>
  <fieldset>
    <legend>{$translate('PAGES.SAMPLE.SAMPLE_PAGE')} {data.title || id}</legend>
    <div>
      <Input
        id="{id}--title"
        label="{$translate('PAGES.SAMPLE.LABEL_HANDLE')}"
        autofocus="{true}"
        bind:value="{data.title}"
      />
      <Input
        id="{id}--description"
        label="{$translate('PAGES.SAMPLE.LABEL_PAGE')}"
        bind:value="{data.description}"
      />
    </div>
  </fieldset>
</Editable>

<script>
  import { getContext } from 'svelte';

  import Editable from '../Editable.svelte';
  import Input from '../Input.svelte';

  export let id;
  export let data;

  const { translate } = getContext('app');
</script>
