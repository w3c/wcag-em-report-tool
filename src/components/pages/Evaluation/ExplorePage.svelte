<Page title="{$translate('EXPLORE.TITLE')}">

  <p>{$translate('EXPLORE.INTRO')}</p>

  <form action="" novalidate>

    <CheckboxGroup
      id="technologies_relied_upon"
      label="{$translate('EXPLORE.HD_RELIEDUP_TECH')}"
      helptext="{$translate('EXPLORE.INF_RELIEDUP_TECH')}"
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

    {$translate('EXPLORE.LABEL_OTHER')}
    {$translate('EXPLORE.LABEL_TECH')}
    {$translate('EXPLORE.PLH_TECH')}
    {$translate('EXPLORE.LABEL_TECH_SPEC')}
    {$translate('EXPLORE.PLH_TECH_SPEC')}

    <fieldset>
      <legend>{$translate('EXPLORE.HD_NOTE_TAKING')}</legend>
      <p>{$translate('EXPLORE.INF_NOTE_TAKING')}</p>

      <Textarea
        id="essential_functionality"
        label="{$translate('EXPLORE.LABEL_ESSENT_FUNC')}"
        helptext="{$translate('EXPLORE.INF_ESSENT_FUNC')}"
      />

      <Textarea
        id="page_types"
        label="{$translate('EXPLORE.LABEL_VARIETY_PAGE_TYPES')}"
        helptext="{$translate('EXPLORE.INF_VARIETY_PAGE_TYPES')}"
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
