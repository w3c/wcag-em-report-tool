<Page title="{$translate('PAGES.AUDIT.TITLE')}">
  <p>{@html $translate('PAGES.AUDIT.INTRO')}</p>

  <Auditor />
</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  import Auditor from '../../Auditor/Auditor.svelte';
  import Page from '../../Page.svelte';
</script>
