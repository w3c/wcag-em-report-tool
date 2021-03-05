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
        .then((imported) => {
          const criteria = Object.keys(imported)
            .map((num) => `– ${num}`)
            .join('\n');

          alert(`Import succeeded for criteria:\n${criteria}.`);
        })
        .catch((error) => {
          console.error(error);
          let errorMessage;

          switch (error.message) {
            case 'JSONLD.SYNTAX_ERROR':
              errorMessage = 'UI.IMPORT.ERROR.JSONLD_SYNTAX';
              break;

            case 'IMPORT.NO_ASSERTIONS_ERROR':
              errorMessage = 'UI.IMPORT.ERROR.NO_ASSERTIONS';
              break;

            case 'IMPORT.NO_COMPATIBLE_ASSERTIONS_ERROR':
              errorMessage = 'UI.IMPORT.ERROR.NO_COMPATIBLE_ASSERTIONS';
              break;

            case 'IMPORT.USER_DECLINED_ERROR':
              errorMessage = 'UI.IMPORT.ERROR.USER_DECLINED';
              break;

            default:
              errorMessage = 'UI.COMMON.ERROR.DEFAULT';
          }

          alert(`Import aborted:\n\t${errorMessage}`);
        })
        .finally(() => {
          target.value = '';
        });
    });
  }
</script>
