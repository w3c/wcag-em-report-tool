<div class="AuditorImport">
  <p>{@html TRANSLATED.IMPORT_DATA_INTRO}</p>
  <File
    id="import__assertions"
    label="{TRANSLATED.BUTTON}"
    labelsub="({TRANSLATED.BUTTON_HINT})"
    on:change="{handleChange}"
    on:click={handleClick}
  />
</div>

<style>
  .AuditorImport {
    margin: 1em 0 1em;
    border: 1px solid var(--line-grey);
    padding: 1em;
    font-size: 90%;
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
    JSONLD_SYNTAX: $translate('UI.IMPORT.ERROR.JSONLD_SYNTAX'),
    NO_ASSERTIONS: $translate('UI.IMPORT.ERROR.NO_ASSERTIONS'),
    NO_COMPATIBLE_ASSERTIONS: $translate('UI.IMPORT.ERROR.NO_COMPATIBLE_ASSERTIONS'),
    ERROR_DEFAULT: $translate('UI.COMMON.ERROR.DEFAULT'),
    IMPORT_SUCCESSFUL: $translate('UI.IMPORT.SUCCESSFUL'),
    FILE_ERROR: $translate('UI.IMPORT.ERROR.FILE_ERROR')
  };

  function handleClick (event) {
    event.target.value = ''
  }

  function handleChange(event) {
    const { target } = event;
    const file = event.target.files[0];

    readFile(file, (result) => {
      let json;

      try {
        console.log(TRANSLATED.FILE_ERROR);
        json = JSON.parse(result);
      } catch (error) {
        console.error(error.message);
        let errorMessage = TRANSLATED.FILE_ERROR;
        alert(`Import failed:\n${errorMessage}`);
        return;
      }

      importAssertions(json)
        .then((imported) => {
          const criteria = Object.keys(imported)
            .map((num) => `– ${num}`)
            .join('\n');

          alert(`Import successful:\n${TRANSLATED.IMPORT_SUCCESSFUL}.`);
        })
        .catch((error) => {
          console.error(error);
          let errorMessage;

          switch (error.message) {
            case JSONLD_ERROR.SYNTAX:
              errorMessage = 'TRANSLATED.JSONLD_SYNTAX';
              break;

            case IMPORT_ERROR.NO_ASSERTIONS:
              errorMessage = 'TRANSLATED.NO_ASSERTIONS';
              break;

            case IMPORT_ERROR.NO_COMPATIBLE_ASSERTIONS:
              errorMessage = TRANSLATED.NO_COMPATIBLE_ASSERTIONS;
              break;

            default:
              errorMessage = TRANSLATED.ERROR_DEFAULT;
          }

          alert(`Import failed:\n${errorMessage}`);
        })
        .finally(() => {
          target.value = '';
        });
    });
  }
</script>
