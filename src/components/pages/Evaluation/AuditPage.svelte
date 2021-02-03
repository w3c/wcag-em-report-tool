<Page title="{TRANSLATED.PAGE_TITLE}">
  <p>{@html TRANSLATED.INTRODUCTION}</p>

  <Auditor />
</Page>

<script>
  import { getContext } from 'svelte';

  import Auditor from 'components/Auditor/Auditor.svelte';
  import Page from 'components/Page.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.AUDIT.TITLE'),
    INTRODUCTION: $translate('PAGES.AUDIT.INTRO')
  };

</script>
