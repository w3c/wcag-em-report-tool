<div class="AuditorImport">
  <p>{@html TRANSLATED.IMPORT_DATA_INTRO}</p>
  <File
    id="import__assertions"
    label="{TRANSLATED.BUTTON}"
    labelsub="({TRANSLATED.BUTTON_HINT})"
    on:change="{handleChange}"
  />
</div>

<style>
  .AuditorImport {
    margin: 1em 0 1em;
    border: 1px solid var(--line-grey);
    padding: 1em;
  }
    .AuditorImport p:first-child {
      margin-top: 0;
    }
  @media (min-width: 47.5em) {
    .AuditorImport {
      float: right;
      margin: 0 0 1em 2em;
      padding: 1em;
      text-align: center;
      max-width: 10em;
    }
  }
</style>

<script>
  import { getContext } from 'svelte';

  import { IMPORT_ERROR, JSONLD_ERROR } from '@app/data/errors.json';
  import { importAssertions } from '@app/stores/earl/assertionStore/index.js';
  import File, { readFile } from '@app/components/form/File.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    BUTTON: $translate('UI.NAV.MENU_IMPORT', { default: 'Import data' }),
    BUTTON_HINT: $translate('UI.NAV.MENU_IMPORT_HINT'),
    IMPORT_DATA_INTRO: $translate('PAGES.AUDIT.IMPORT_DATA_INTRO'),
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
            case JSONLD_ERROR.SYNTAX:
              errorMessage = 'UI.IMPORT.ERROR.JSONLD_SYNTAX';
              break;

            case IMPORT_ERROR.NO_ASSERTIONS:
              errorMessage = 'UI.IMPORT.ERROR.NO_ASSERTIONS';
              break;

            case IMPORT_ERROR.NO_COMPATIBLE_ASSERTIONS:
              errorMessage = 'UI.IMPORT.ERROR.NO_COMPATIBLE_ASSERTIONS';
              break;

            case IMPORT_ERROR.USER_DECLINED:
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
