<div class="AuditorImport">
  <File
    id="import__assertions"
    label="{TRANSLATED.BUTTON}"
    on:change="{handleChange}"
  />
</div>

<style>
  .AuditorImport {
    display: inline-block;
  }
</style>

<script>
  import { getContext } from 'svelte';
  import { importAssertions } from '@app/stores/earl/assertionStore/index.js';
  import File, { readFile } from '@app/components/form/File.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    BUTTON: $translate('UI.NAV.MENU_IMPORT', { default: 'Import data' })
  };

  function handleChange(event) {

    const { target } = event;
    const file = event.target.files[0];

    readFile(file, (result) => {
      let json;

      try {
        json = JSON.parse(result);
      } catch (error) {
        console.error(error.message);
        return;
      }

      importAssertions(json)
        .then(() => {
          alert('Import succeed');
        })
        .catch(() => {
          alert('Import failed');
        })
        .finally(() => {
          target.value = '';
        });
    });
  }
</script>
