<Page title="{$translate('REPORT.TITLE')}">
  <p>{$translate('REPORT.INTRO')}</p>

  <p class="info">ReportComponent here</p>
</Page>

<Panel title="Export report">
  <p>You can download the evaluation html and data for customization and publishing on your own website.</p>
  <button type="button" class="button-primary">Download the evaluation report (HTML)</button>
  <button type="button" class="button-secondary">Download the evaluation data (JSON-LD)</button>
</Panel>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Panel from '../../Panel.svelte';
</script>
