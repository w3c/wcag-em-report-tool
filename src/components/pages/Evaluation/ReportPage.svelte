<Page title="{$translate('PAGES.REPORT.TITLE')}">
  <p>{@html $translate('PAGES.REPORT.INTRO')}</p>

  <p class="info">ReportComponent here</p>
</Page>

<Panel title="Export evaluation">
  <p>{$translate('PAGES.REPORT.DOWNLOAD_REPORT')}</p>
  <button type="button" class="button-primary">{$translate('PAGES.REPORT.BTN_SAVE_HTML')}</button>
  <button type="button" class="button-secondary">{$translate('PAGES.REPORT.BTN_SAVE_JSON')}</button>
</Panel>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Panel from '../../Panel.svelte';
</script>
