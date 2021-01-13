<Page title="{$translate('PAGES.EXPLORE.TITLE')}">
  <p>
    {@html $translate('PAGES.EXPLORE.INTRO')}
  </p>

  <form action="" novalidate>
    <WebTechnologiesInput
      bind:value="{$exploreStore['TECHNOLOGIES_RELIED_UPON']}"
    />

    <fieldset>
      <legend>{$translate('PAGES.EXPLORE.HD_NOTE_TAKING')}</legend>
      <p>{$translate('PAGES.EXPLORE.INF_NOTE_TAKING')}</p>

      <Textarea
        id="essential_functionality"
        label="{$translate('PAGES.EXPLORE.LABEL_ESSENT_FUNC')}"
        helptext="{$translate('PAGES.EXPLORE.INF_ESSENT_FUNC')}"
        bind:value="{$exploreStore['ESSENTIAL_FUNCTIONALITY']}"
      />

      <Textarea
        id="page_types"
        label="{$translate('PAGES.EXPLORE.LABEL_VARIETY_PAGE_TYPES')}"
        helptext="{$translate('PAGES.EXPLORE.INF_VARIETY_PAGE_TYPES')}"
        bind:value="{$exploreStore['PAGE_TYPES']}"
      />
    </fieldset>
  </form>
</Page>

<script>
  import { getContext } from 'svelte';

  import Page from '../../Page.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';

  import WebTechnologiesInput from '../../formcomponents/WebTechnologiesInput.svelte';

  const { exploreStore, translate } = getContext('app');
</script>
