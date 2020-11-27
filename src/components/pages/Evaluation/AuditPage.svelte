<Page title="{$translate('PAGES.AUDIT.TITLE')}">
  <p>{@html $translate('PAGES.AUDIT.INTRO')}</p>

  <Auditor />
</Page>

<script>
  import { getContext } from 'svelte';

  import Auditor from '../../Auditor/Auditor.svelte';
  import Page from '../../Page.svelte';

  const { translate } = getContext('app');
</script>
