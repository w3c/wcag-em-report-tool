<Page title="{$translate('PAGES.REPORT.TITLE')}">
  <p>{@html $translate('PAGES.REPORT.INTRO')}</p>

  <Report />
</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Report from '../../Report.svelte';
</script>
