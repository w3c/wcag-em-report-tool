<Page title="{TRANSLATED.PAGE_TITLE}">

    <Button on:click="{handleHTMLDownloadClick}">
      <span>{TRANSLATED.BUTTON_SAVE_HTML}</span>
    </Button>
    <Button on:click="{handleJSONDownloadClick}">
      <span>{TRANSLATED.BUTTON_SAVE_JSON}</span>
    </Button>

  <Report />
</Page>

<script>
  import { getContext } from 'svelte';

  import evaluationStore from '@app/stores/evaluationStore.js';

  import Button from '@app/components/ui/Button.svelte';
  import Page from '@app/components/ui/Page.svelte';
  import Report, { downloadReport } from '@app/components/ui/Report.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.REPORT.TITLE'),
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
