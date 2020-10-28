<Page title="{$translate('PAGES.EXPLORE.TITLE')}">
  <p>
    {@html $translate('PAGES.EXPLORE.INTRO')}
  </p>

  <form action="" novalidate>
    <MultipleChoice
      id="technologies_relied_upon"
      label="{$translate('PAGES.EXPLORE.HD_RELIEDUP_TECH')}"
      helptext="{$translate('PAGES.EXPLORE.INF_RELIEDUP_TECH')}"
      options="{[{ title: 'HTML5' }, { title: 'XHTML 1.0' }, { title: 'HTML 4.01' }, { title: 'CSS' }, { title: 'WAI-ARIA' }, { title: 'ECMAScript 3' }, { title: 'ECMAScript 5' }, { title: 'DOM' }, { title: 'Flash' }, { title: 'Silverlight' }, { title: 'OOXML' }, { title: 'ODF 1.2' }, { title: 'SVG' }]}"
      editable="{true}"
      bind:value="{$exploreStore['TECHNOLOGIES_RELIED_UPON']}"
    />

    <div>
      {$translate('PAGES.EXPLORE.PLH_TECH')}<br />
      {$translate('PAGES.EXPLORE.LABEL_TECH_SPEC')}<br />
    </div>

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
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import MultipleChoice from '../../formcomponents/MultipleChoice.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';

  const { exploreStore } = getContext('app');
</script>
