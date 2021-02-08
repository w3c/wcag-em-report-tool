<Page title="{TRANSLATED.PAGE_TITLE}">
  <p>
    {@html TRANSLATED.INTRODUCTION}
  </p>

  <aside class="box">
    <header class="box-h">
      <h2>{TRANSLATED.DOWNLOAD_REPORT_HEADING}</h2>
    </header>
    <div class="box-i">
      <Button on:click="{handleHTMLDownloadClick}">
        <span>{TRANSLATED.BUTTON_SAVE_HTML}</span>
      </Button>
      <Button type="secondary" on:click="{handleJSONDownloadClick}">
        <span>{TRANSLATED.BUTTON_SAVE_JSON}</span>
      </Button>
    </div>
  </aside>

  <Report />
</Page>

<script>
  import { getContext } from 'svelte';

  import evaluationStore from '@app/stores/evaluationStore.js';

  import Button from '@app/components/ui/Button.svelte';
  import Page from '@app/components/Page.svelte';
  import Report, { downloadReport } from '@app/components/Report.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.REPORT.TITLE'),
    INTRODUCTION: $translate('PAGES.REPORT.INTRO'),
    DOWNLOAD_REPORT_HEADING: $translate('PAGES.REPORT.DOWNLOAD_REPORT'),
    BUTTON_SAVE_HTML: $translate('PAGES.REPORT.BTN_SAVE_HTML'),
    BUTTON_SAVE_JSON: $translate('PAGES.REPORT.BTN_SAVE_JSON')
  };

  function handleHTMLDownloadClick() {
    downloadReport();
  }

  function handleJSONDownloadClick() {
    $evaluationStore.save();
  }
</script>
