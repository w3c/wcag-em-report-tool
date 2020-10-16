<Page title="{$translate('PAGES.AUDIT.TITLE')}">
  <p>{@html $translate('PAGES.AUDIT.INTRO')}</p>

  <div>
    <div>{$translate('PAGES.AUDIT.BTN_SHOW_TEXT')}</div>
    <div>{$translate('PAGES.AUDIT.NOTE')}</div>
    <div>{$translate('PAGES.AUDIT.UNDERSTAND')}</div>
    <div>{$translate('PAGES.AUDIT.HOW_TO')}</div>
    <div>{$translate('PAGES.AUDIT.SAMPLE_FINDINGS')}</div>
    <div>{$translate('PAGES.AUDIT.BTN_EXPAND_PAGES')}</div>
    <div>{$translate('PAGES.AUDIT.BTN_COLLAPSE_PAGES')}</div>
  </div>

  <Auditor />
</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  import Auditor from '../../Auditor.svelte';
  import Page from '../../Page.svelte';
</script>
