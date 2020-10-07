<Page title="{$translate('PAGES.EXPLORE.TITLE')}">
  <p>
    {@html $translate('PAGES.EXPLORE.INTRO')}
  </p>

  <form action="" novalidate>
    <CheckboxGroup
      id="technologies_relied_upon"
      label="{$translate('PAGES.EXPLORE.HD_RELIEDUP_TECH')}"
      helptext="{$translate('PAGES.EXPLORE.INF_RELIEDUP_TECH')}"
      options="{[{ title: 'HTML5' }, { title: 'XHTML 1.0' }, { title: 'HTML 4.01' }, { title: 'CSS' }, { title: 'WAI-ARIA' }, { title: 'ECMAScript 3' }, { title: 'ECMAScript 5' }, { title: 'DOM' }, { title: 'Flash' }, { title: 'Silverlight' }, { title: 'OOXML' }, { title: 'ODF 1.2' }, { title: 'SVG' }]}"
      editable="{true}"
      on:change="{handleTechnologiesChange}"
    />

    <div class="AddInput">
      <Input
        id="technologies_relied_upon--add"
        label="{$translate('PAGES.EXPLORE.LABEL_OTHER')} {$translate('PAGES.EXPLORE.LABEL_TECH')}"
      />
      <button type="button" class="button-secondary">Add {$translate('PAGES.EXPLORE.LABEL_OTHER')}
        {$translate('PAGES.EXPLORE.LABEL_TECH')}</button>
    </div>

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
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import CheckboxGroup, {
    getValue as CheckboxGroupValue
  } from '../../formcomponents/CheckboxGroup.svelte';
  import Input from '../../formcomponents/Input.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';

  function handleTechnologiesChange(event) {
    console.log('TECHVALUE', CheckboxGroupValue());
  }
</script>
