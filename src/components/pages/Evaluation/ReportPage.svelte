<Page title="{$translate('PAGES.REPORT.TITLE')}">
  <p>
    {@html $translate('PAGES.REPORT.INTRO')}
  </p>

  <aside class="box">
    <header class="box-h">
      <h2>{$translate('PAGES.REPORT.DOWNLOAD_REPORT')}</h2>
    </header>
    <div class="box-i">
      <Button><span>{$translate('PAGES.REPORT.BTN_SAVE_HTML')}</span></Button>
      <Button type="secondary" on:click="{handleJSONDownloadClick}">
        <span>{$translate('PAGES.REPORT.BTN_SAVE_JSON')}</span>
      </Button>
    </div>
  </aside>

  <Report />
</Page>

<script>
  import { getContext } from 'svelte';

  import appJsonLdContext from '../../../data/jsonld/appContext.js';
  import evaluationStore from '../../../data/stores/evaluationStore.js';

  import Button from '../../Button.svelte';
  import Page from '../../Page.svelte';
  import Report from '../../Report.svelte';

  const { jsonld, translate } = getContext('app');

  function handleJSONDownloadClick() {
    $evaluationStore.save();

    jsonld.compact($evaluationStore, appJsonLdContext)
      .then((compacted) => {
        downloadFile({
          name: 'evaluation.json',
          type: 'application/json',
          contents: JSON.stringify(compacted)
        });
      })
      .catch((error) => {
        console.error(`An error occured: “${error.name}”\n${error.message}`);
      });
  }

  function downloadFile({ contents, name, type }) {
    const _a = document.createElement('a');
    const file = new Blob([contents], { type });

    _a.href = URL.createObjectURL(file);
    _a.download = name;

    _a.click();
  }
</script>
