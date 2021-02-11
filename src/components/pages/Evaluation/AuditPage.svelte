<Page title="{TRANSLATED.PAGE_TITLE}">
  <p>{@html TRANSLATED.INTRODUCTION}</p>
  <AuditorImport />
  <Auditor />
</Page>

<script>
  import { getContext } from 'svelte';

  import Auditor from '@app/components/ui/Auditor/Auditor.svelte';
  import AuditorImport from '@app/components/ui/Auditor/AuditorImport.svelte';
  import Page from '@app/components/ui/Page.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.AUDIT.TITLE'),
    INTRODUCTION: $translate('PAGES.AUDIT.INTRO')
  };

</script>
