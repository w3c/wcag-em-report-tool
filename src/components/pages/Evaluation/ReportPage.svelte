<Page title="{$translate('PAGES.REPORT.TITLE')}">
  <p>
    {@html $translate('PAGES.REPORT.INTRO')}
  </p>

  <aside class="box">
    <header class="box-h">
      <h2>{$translate('PAGES.REPORT.DOWNLOAD_REPORT')}</h2>
    </header>
    <div class="box-i">
      <button><span>{$translate('PAGES.REPORT.BTN_SAVE_HTML')}</span></button>
      <button><span>{$translate('PAGES.REPORT.BTN_SAVE_JSON')}</span></button>
    </div>
  </aside>

  <Report />
</Page>

<script>
  import { getContext } from 'svelte';

  import Page from '../../Page.svelte';
  import Report from '../../Report.svelte';

  const { translate } = getContext('app');
</script>
