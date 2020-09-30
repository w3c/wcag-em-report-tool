<Page title="{$translate('PAGES.EXPLORE.TITLE')}">

  <p>{$translate('PAGES.EXPLORE.INTRO')}</p>

  <form action="" novalidate>

    <CheckboxGroup
      id="technologies_relied_upon"
      label="{$translate('PAGES.EXPLORE.HD_RELIEDUP_TECH')}"
      helptext="{$translate('PAGES.EXPLORE.INF_RELIEDUP_TECH')}"
      options={[
        { title: 'HTML5'},
        { title: 'XHTML 1.0' },
        { title: 'HTML 4.01' },
        { title: 'CSS' },
        { title: 'WAI-ARIA' },
        { title: 'ECMAScript 3' },
        { title: 'ECMAScript 5' },
        { title: 'DOM' },
        { title: 'Flash' },
        { title: 'Silverlight' },
        { title: 'OOXML' },
        { title: 'ODF 1.2' },
        { title: 'SVG' }
      ]}
    />

    <div>
      {$translate('PAGES.EXPLORE.LABEL_OTHER')}<br/>
      {$translate('PAGES.EXPLORE.LABEL_TECH')}<br/>
      {$translate('PAGES.EXPLORE.PLH_TECH')}<br/>
      {$translate('PAGES.EXPLORE.LABEL_TECH_SPEC')}<br/>
      {$translate('PAGES.EXPLORE.PLH_TECH_SPEC')}<br/>
    </div>

    <fieldset>
      <legend>{$translate('PAGES.EXPLORE.HD_NOTE_TAKING')}</legend>
      <p>{$translate('PAGES.EXPLORE.INF_NOTE_TAKING')}</p>

      <Textarea
        id="essential_functionality"
        label="{$translate('PAGES.EXPLORE.LABEL_ESSENT_FUNC')}"
        helptext="{$translate('PAGES.EXPLORE.INF_ESSENT_FUNC')}"
      />

      <Textarea
        id="page_types"
        label="{$translate('PAGES.EXPLORE.LABEL_VARIETY_PAGE_TYPES')}"
        helptext="{$translate('PAGES.EXPLORE.INF_VARIETY_PAGE_TYPES')}"
      />
    </fieldset>
  </form>

</Page>

<script>
  import {t as translate} from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import CheckboxGroup from '../../formcomponents/CheckboxGroup.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
