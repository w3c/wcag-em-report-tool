<Editable
  id="{id}"
  label="{title || $translate('PAGES.SAMPLE.SAMPLE_PAGE')}"
  persistent="{true}"
  removable="{true}"
  on:DELETE
>
  <fieldset>
    <legend>{$translate('PAGES.SAMPLE.SAMPLE_PAGE')} {title || id.replace(/_+/g, ' ')}</legend>
    <div>
      <Input
        id="{id}__name"
        label="{$translate('PAGES.SAMPLE.LABEL_HANDLE')}"
        autofocus="{true}"
        bind:value="{title}"
      />
      <Input
        id="{id}__href"
        label="{$translate('PAGES.SAMPLE.LABEL_PAGE')}"
        bind:value="{href}"
      />
    </div>
  </fieldset>
</Editable>

<script>
  import { t as translate } from 'svelte-i18n';

  import Editable from '../Editable.svelte';
  import Input from '../Input.svelte';

  export let id;
  export let title;
  export let href;
</script>
