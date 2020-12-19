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

  import evaluationStore from '../../../data/stores/evaluationStore.js';

  import Button from '../../Button.svelte';
  import Page from '../../Page.svelte';
  import Report from '../../Report.svelte';

  const { translate } = getContext('app');

  function handleJSONDownloadClick() {
    $evaluationStore.save();
  }
</script>
