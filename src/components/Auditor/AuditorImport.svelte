<File
  id="import__assertions"
  label="{TRANSLATED.BUTTON}"
  on:change="{handleChange}"
/>

<script>
  import { getContext } from 'svelte';
  import { importAssertions } from '@app/stores/earl/assertionStore/index.js';
  import File, { readFile } from '@app/components/formcomponents/File.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    BUTTON: $translate('UI.NAV.MENU_IMPORT', { default: 'Import data' })
  };

  function handleChange(event) {
    const file = event.target.files[0];

    readFile(file, (result) => {
      let json;

      try {
        json = JSON.parse(result);
      } catch (error) {
        console.error(error.message);
        return;
      }

      console.log('import assertions from', json);
      importAssertions(json);
    });
  }
</script>
