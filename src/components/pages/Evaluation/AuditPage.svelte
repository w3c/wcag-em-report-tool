<Page title="{$translate('AUDIT.TITLE')}">
  <p>{$translate('AUDIT.INTRO')}</p>

  <div>
    'AUDIT.BTN_SHOW_TEXT' "AUDIT.NOTE" "AUDIT.UNDERSTAND" "AUDIT.HOW_TO"
    'AUDIT.SAMPLE_FINDINGS' 'AUDIT.BTN_EXPAND_PAGES' 'AUDIT.BTN_COLLAPSE_PAGES'
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
