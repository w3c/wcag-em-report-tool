<Page title="{$translate('PAGES.AUDIT.TITLE')}">
  <p>{$translate('PAGES.AUDIT.INTRO')}</p>

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

<Panel title="Auditor menu">
  <p>Some auditing tools...</p>
  <p>Filter by:</p>
  <ul>
    <li>WCAG version</li>
    <li>Conformance level</li>
  </ul>
  <button type="button" class="button-secondary">Import findings</button>
</Panel>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Panel from '../../Panel.svelte';
  import Auditor from '../../Auditor.svelte';
</script>
